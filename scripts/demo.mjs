// Records a scripted walkthrough of ReelNova and converts it to docs/demo.gif.
//
//   node scripts/demo.mjs
//   BASE_URL=http://localhost:3000 node scripts/demo.mjs
//
// Requires: npm i -D playwright && npx playwright install chromium
// Requires: ffmpeg on PATH (preinstalled on GitHub Ubuntu runners; otherwise
//           `brew install ffmpeg` / `sudo apt-get install ffmpeg`).

import { chromium } from 'playwright';
import { mkdir, rm, readdir, rename } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const BASE_URL = (
  process.env.BASE_URL || 'https://reelnova-coral.vercel.app'
).replace(/\/$/, '');

const DOCS = path.resolve('docs');
const VIDEO_DIR = path.resolve('docs/.video');
const SIZE = { width: 1280, height: 720 };

// GIF tuning — bump width/fps for smoother output, lower them for a smaller file.
const GIF_WIDTH = 900;
const GIF_FPS = 14;

// Smooth, paced scroll so the recording feels human, not jumpy.
async function smoothScroll(page, distance, duration = 1600) {
  await page.evaluate(
    ({ distance, duration }) =>
      new Promise((resolve) => {
        const start = window.scrollY;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 0.5 - Math.cos(p * Math.PI) / 2; // easeInOut
          window.scrollTo(0, start + distance * eased);
          p < 1 ? requestAnimationFrame(tick) : resolve();
        };
        requestAnimationFrame(tick);
      }),
    { distance, duration }
  );
}

async function settle(page) {
  await page
    .waitForFunction(
      () => {
        const imgs = Array.from(document.querySelectorAll('main img'));
        return imgs.length > 0 && imgs.some((i) => i.complete && i.naturalWidth > 0);
      },
      { timeout: 20000 }
    )
    .catch(() => {});
  await page.waitForTimeout(1200);
}

async function record() {
  await rm(VIDEO_DIR, { recursive: true, force: true });
  await mkdir(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: SIZE,
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    recordVideo: { dir: VIDEO_DIR, size: SIZE },
  });
  const page = await context.newPage();

  // 1. Home — let the hero land, then drift through the rails.
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 45000 });
  await settle(page);
  await page.waitForTimeout(1200);
  await smoothScroll(page, 900, 2200);
  await page.waitForTimeout(800);
  await smoothScroll(page, 900, 2200);
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1200);

  // 2. Search — open the command palette and type.
  const searchBtn = page.locator('[aria-label="Search"]').first();
  if (await searchBtn.count()) {
    await searchBtn.click();
    await page.waitForTimeout(700);
    const input = page.locator('input[type="search"]').first();
    await input.click();
    await input.type('interstellar', { delay: 110 });
    await page.waitForTimeout(2200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(700);
  }

  // 3. A movie detail page — backdrop, then scroll to cast.
  await page.goto(`${BASE_URL}/movie/157336`, {
    waitUntil: 'networkidle',
    timeout: 45000,
  }); // Interstellar
  await settle(page);
  await page.waitForTimeout(1300);
  await smoothScroll(page, 1100, 2400);
  await page.waitForTimeout(1400);

  // 4. Genres grid.
  await page.goto(`${BASE_URL}/genres`, {
    waitUntil: 'networkidle',
    timeout: 45000,
  });
  await settle(page);
  await page.waitForTimeout(1600);

  await context.close(); // flushes the .webm
  await browser.close();

  // Playwright names videos with a random hash — grab the newest .webm.
  const files = (await readdir(VIDEO_DIR)).filter((f) => f.endsWith('.webm'));
  if (!files.length) throw new Error('No video was recorded.');
  const webm = path.join(DOCS, 'demo.webm');
  await rename(path.join(VIDEO_DIR, files[0]), webm);
  await rm(VIDEO_DIR, { recursive: true, force: true });
  return webm;
}

function toGif(webm) {
  const palette = path.join(DOCS, 'palette.png');
  const gif = path.join(DOCS, 'demo.gif');
  const vf = `fps=${GIF_FPS},scale=${GIF_WIDTH}:-1:flags=lanczos`;

  const ff = (args) => spawnSync('ffmpeg', args, { stdio: 'inherit' });

  // Two-pass palette for clean, dithered colors.
  let r = ff(['-y', '-i', webm, '-vf', `${vf},palettegen=stats_mode=diff`, palette]);
  if (r.status !== 0) throw new Error('ffmpeg palettegen failed (is ffmpeg installed?)');
  r = ff([
    '-y', '-i', webm, '-i', palette,
    '-lavfi', `${vf}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3`,
    gif,
  ]);
  if (r.status !== 0) throw new Error('ffmpeg paletteuse failed');
  spawnSync('rm', ['-f', palette]);
  return gif;
}

const run = async () => {
  await mkdir(DOCS, { recursive: true });
  console.log('Recording walkthrough…');
  const webm = await record();
  console.log('Converting to GIF…');
  const gif = toGif(webm);
  console.log(`\n✓ Demo saved: ${gif}  (source: ${webm})`);
};

run().catch((err) => {
  console.error('Demo generation failed:', err);
  process.exit(1);
});
