'use client';

import { motion } from 'framer-motion';

// Standard page banner: animated eyebrow + title + optional description.
export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="container-page pb-8 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        )}
      </motion.div>
      {children}
    </header>
  );
}
