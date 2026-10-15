import React from "react";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // "up" | "down" | "left" | "right" | "scale" | "fade"
  duration = 750,
  distance = 36,
  once = false, // Animasi masuk dan keluar berulang terus saat scroll
  amount = 0.15,
}) {
  const getVariants = () => {
    const transition = {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier curve
    };

    switch (direction) {
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.92, y: 24, transition },
          visible: { opacity: 1, scale: 1, y: 0, transition },
        };
      case "fade":
        return {
          hidden: { opacity: 0, transition },
          visible: { opacity: 1, transition },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: -distance, transition },
          visible: { opacity: 1, x: 0, transition },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: distance, transition },
          visible: { opacity: 1, x: 0, transition },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -distance, transition },
          visible: { opacity: 1, y: 0, transition },
        };
      case "up":
      default:
        return {
          hidden: { opacity: 0, y: distance, transition },
          visible: { opacity: 1, y: 0, transition },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}


