"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function DynamicBackground({
  imageSrc,
}: {
  imageSrc: string;
}) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-[55%] max-w-3xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          {/* Fade hacia el fondo de la página en vez de oscurecer */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-bg/10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
