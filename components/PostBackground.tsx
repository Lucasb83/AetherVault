"use client";

import { motion } from "framer-motion";

export default function PostBackground({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-[45%] max-w-2xl"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-bg/15" />
      </motion.div>
    </div>
  );
}
