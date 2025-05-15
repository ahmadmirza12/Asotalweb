"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import id from "@/public/assets/id.png";
import circle from "@/public/assets/circle.png";
export default function OfficersAddressesPage() {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants consistent with previous pages
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

  const renderAddressSection = (title) => {
    return (
      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        <h3 className="font-medium text-base">{title}</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Residential Address</h4>
            <p className="text-sm text-gray-600">
              NO 106, Jayasiripura, Anuradhapura, 50000, SRI LAM.
            </p>
            <div className="border-t border-gray-200 my-4"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10  rounded-md flex items-center justify-center">
                <Image src={id} alt="Address Icon" width={20} height={20} />
              </div>
              <p className="text-sm">
                Proof of address (Bank statement or utility bill no more than 3
                months old)
              </p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              PENDING
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          className={`${isOpen ? "border-b border-gray-200" : ""} p-4 sm:p-6`}
        >
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
                              STEP 9
                            </div>
                            <h2 className="text-base sm:text-xl font-semibold">
                              Office Address
                            </h2>
                          </div>
                        </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Officers Addresses Form"
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
                className="p-4 sm:p-6 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {/* Director 1 */}
                  <motion.div variants={itemVariants}>
                    {renderAddressSection("Director 1")}
                  </motion.div>

                  {/* Director 2 */}
                  <motion.div variants={itemVariants}>
                    {renderAddressSection("Director 2")}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {/* Shareholder 1 */}
                  <motion.div variants={itemVariants}>
                    {renderAddressSection("Shareholder 1")}
                  </motion.div>

                  {/* Shareholder 2 */}
                  <motion.div variants={itemVariants}>
                    {renderAddressSection("Shareholder 2")}
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
