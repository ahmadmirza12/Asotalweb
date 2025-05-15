"use client";

import { useState } from "react";
import { ChevronUp, Minus, Plus } from "lucide-react";
import Image from "next/image";
import circle from "@/public/assets/circle.png";
import { motion, AnimatePresence } from "framer-motion";

export default function SetOfficersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [directorCount, setDirectorCount] = useState(1);
  const [shareholderCount, setShareholderCount] = useState(1);

  const incrementCount = (setter, value) => {
    setter(value + 1);
  };

  const decrementCount = (setter, value) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  const handleContinue = () => {
    // Store counts in localStorage
    localStorage.setItem("directorCount", directorCount);
    localStorage.setItem("shareholderCount", shareholderCount);
  };

  // Animation variants consistent with SelectSICCodePage
  const cardVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3 },
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 },
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg p-3 sm:p-4 md:p-6 overflow-hidden"
      >
        <div className={`${isOpen ? "border-b border-gray-200" : ""} pb-3 sm:pb-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src={circle}
                alt="Circle icon"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6"
                priority
              />
              <div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  STEP 7
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Set Number of Officers of Your Company
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Officers Form"
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              variants={cardVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              <motion.div
                className="pt-4 sm:pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                    closed: {},
                  }}
                >
                  <OfficerCard
                    title="Set Number of Directors"
                    count={directorCount}
                    increment={() => incrementCount(setDirectorCount, directorCount)}
                    decrement={() => decrementCount(setDirectorCount, directorCount)}
                    variants={itemVariants}
                  />
                  <OfficerCard
                    title="Set Number of Shareholders"
                    count={shareholderCount}
                    increment={() => incrementCount(setShareholderCount, shareholderCount)}
                    decrement={() => decrementCount(setShareholderCount, shareholderCount)}
                    variants={itemVariants}
                  />
                </motion.div>

                <motion.div
                  className="mt-6 sm:mt-8 flex justify-end"
                  variants={itemVariants}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleContinue}
                    className="w-full sm:w-auto rounded-md bg-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function OfficerCard({ title, count, increment, decrement, variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-md bg-gray-50 p-3 sm:p-4 transition-colors duration-200"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="mb-1 text-sm sm:text-base font-medium text-gray-700">
            {title}
          </div>
          <a
            href="#"
            className="mb-2 sm:mb-4 block text-xs sm:text-sm text-red-600 hover:underline"
          >
            Learn More
          </a>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={decrement}
            className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            aria-label="Decrease count"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Minus className="h-3 sm:h-4 w-3 sm:w-4" />
          </motion.button>
          <span className="w-8 text-center text-base sm:text-lg font-medium">
            {count}
          </span>
          <motion.button
            onClick={increment}
            className="flex h-7 sm:h-8 w-7 sm:w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-red-600 hover:bg-gray-50 transition-colors duration-200"
            aria-label="Increase count"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="h-3 sm:h-4 w-3 sm:w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}