"use client";

import { useState } from "react";
import { ChevronUp, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";

export default function RegistrationStatus() {
  const [isCardOpen, setIsCardOpen] = useState(false);

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
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-3 sm:p-4 md:p-6 overflow-hidden"
      >
        <div className={`${isCardOpen ? "border-b border-gray-200" : ""} pb-3 sm:pb-4`}>
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
                  STEP 12
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Your Company Registration Status
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsCardOpen(!isCardOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Registration Status"
            >
              <motion.div
                animate={{ rotate: isCardOpen ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isCardOpen && (
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
                  className="relative"
                  variants={{ open: { transition: { staggerChildren: 0.1 } }, closed: {} }}
                  initial="closed"
                  animate="open"
                >
                  {/* Vertical line connecting steps */}
                  <div className="absolute left-4 sm:left-5 top-4 h-[calc(100%-32px)] w-0.5 bg-gray-200"></div>

                  {/* Step 1: Information Review - Completed */}
                  <motion.div
                    className="flex mb-6 sm:mb-8 relative z-10"
                    variants={itemVariants}
                  >
                    <div className="mr-4 sm:mr-6 flex-shrink-0">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-lg text-gray-900">
                        Information Review
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Manual review by our team before submission to the UK Companies House
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 2: Registration Submitted - Current */}
                  <motion.div
                    className="flex mb-6 sm:mb-8 relative z-10"
                    variants={itemVariants}
                  >
                    <div className="mr-4 sm:mr-6 flex-shrink-0">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-lg text-gray-900">
                        Registration Submitted to Companies House
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Your registration is now with Companies House. We will inform you once they process your company.
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 3: Registration Completed - Pending */}
                  <motion.div
                    className="flex relative z-10"
                    variants={itemVariants}
                  >
                    <div className="mr-4 sm:mr-6 flex-shrink-0">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-lg text-gray-900">
                        Registration Completed
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Please click the link below to access your company on the UK Companies House website.
                      </p>
                      <Link
                        href="https://find-and-update.company-information.service.gov.uk/company/15420961"
                        className="text-blue-600 hover:underline mt-1 sm:mt-2 inline-block text-xs sm:text-sm transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Company Details
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}