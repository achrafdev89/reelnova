// Automated screenshots for ReelNova.
//
//   node scripts/capture.mjs
//   BASE_URL=http://localhost:3000 node scripts/capture.mjs
//
// Captures key pages of the live (or local) site into docs/screenshots/.
// Requires: npm i -D playwright  &&  npx playwright install chromium

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = (
  process.env.BASE_URL || 'https://reelnova-coral.vercel.app'
).replace(/\/$/, '');

const OUT = path.resolve('docs/screenshots');
const VIEWPORT = { width: 1440, height: 900 };

// A stable, always-present title so the detail shot never 404s.
const DETAIL_PATH = '/movie/27205'; // Inception

const SHOTS = [
  { name: '01-home', pathname: '/', fullPage: false },
  { name: '02-home-rails', pathname: '/', fullPage: true },
  { name: '03-movie-detail', pathname: DETAIL_PATH, fullPage: false },
  { name: '04-search', pathname: '/search?q=dune', fullPage: false },
  { name: '05-genres', pathname: '/genres', fullPage: true },
  { name: '06-tv', pathname: '/tv', fullPage: true },
];

// Scroll top-to-bottom to trigger lazy images + on-scroll reveal animations.
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 120);
    });
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}

async function settle(page) {
  // Wait for first poster/backdrop image to actually decode.
  await page
    .waitForFunction(
      () => {
        const imgs = Array.from(document.querySelectorAll('main img'));
        return imgs.length > 0 && imgs.some((i) => i.complete && i.naturalWidth > 0);
      },
      { timeout: 20000 }
    )
    .catch(() => {});
  // Let Framer Motion entrance animations finish.
  await page.waitForTimeout(1500);
}

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // crisp, retina-quality output
    colorScheme: 'dark',
  });
  const page = await context.newPage();

  for (const shot of SHOTS) {
    const url = `${BASE_URL}${shot.pathname}`;
    process.stdout.write(`→ ${shot.name}  ${url}\n`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await settle(page);
    if (shot.fullPage) await autoScroll(page);
    await page.screenshot({
      path: path.join(OUT, `${shot.name}.png`),
      fullPage: shot.fullPage,
    });
  }

  await context.close();
  await browser.close();
  console.log(`\n✓ Screenshots saved to ${OUT}`);
};

run().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
