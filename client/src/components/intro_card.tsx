"use client"
import React from "react";
import { motion } from "framer-motion";

const IntroCard: React.FC = () => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                Welcome to Globetrotter!
            </motion.h1>
            <motion.p
                className="text-lg mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                Explore the world with us. Your adventure starts here.
            </motion.p>
            <motion.a
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="/game"
            >
                Get Started
            </motion.a>
        </motion.div>
    );
};

export default IntroCard;
