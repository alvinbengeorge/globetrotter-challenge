"use client"
import React from "react";
import { motion } from "framer-motion";

import {
    TextRevealCard,
  } from "@/components/ui/text-reveal-card";
   
  export function TextRevealCardPreview() {
    return (
      
        <TextRevealCard
          text="Globetrotter Challenge"
          revealText="The Ultimate Travel Guessing Game!"
          className="text-center bg-white/10 backdrop-blur-2xl border-0"
        >
        </TextRevealCard>
    );
  }

const IntroCard: React.FC = () => {
    return (
        <div className="h-screen grid place-items-center  bg-gradient-to-br from-blue-500 to-purple-600">
            <motion.div
                className="grid grid-cols-1 place-items-center gap-2 text-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <TextRevealCardPreview />
                <motion.a
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="/menu"
                >
                    Get Started
                </motion.a>
            </motion.div>
        </div>
    );
};

export default IntroCard;
