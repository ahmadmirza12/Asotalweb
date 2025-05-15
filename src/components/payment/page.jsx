"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";
import visa from "@/public/assets/visa.png";
import card from "@/public/assets/card.png";
import otherCard from "@/public/assets/othercard.png";
import apple from "@/public/assets/apple.svg";

export default function PaymentPage() {
  const [isOpen, setIsOpen] = useState(false);

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
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-3 sm:p-4 md:p-6 overflow-hidden"
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
                  STEP 5
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Payment 2/3 : GBP 100
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Payment Form"
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
                  className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-5"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                    closed: {},
                  }}
                >
                  {/* Card Number */}
                  <motion.div variants={itemVariants} className="lg:col-span-2">
                    <label
                      htmlFor="card-number"
                      className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Card Number
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="card-number"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        placeholder="1243 8900 1211 1234"
                        defaultValue="1243 8900 1211 1234"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 space-x-1">
                        <Image
                          src={visa}
                          alt="Visa"
                          width={24}
                          height={16}
                          className="w-6 h-4 sm:w-7 sm:h-5"
                        />
                        <Image
                          src={card}
                          alt="Mastercard"
                          width={24}
                          height={16}
                          className="w-6 h-4 sm:w-7 sm:h-5"
                        />
                        <Image
                          src={otherCard}
                          alt="Other card"
                          width={24}
                          height={16}
                          className="w-6 h-4 sm:w-7 sm:h-5"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Expiration Date */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="expiration-date"
                      className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expiration-date"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      placeholder="MM / YY"
                    />
                  </motion.div>

                  {/* Security Code */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="security-code"
                      className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Security Code
                    </label>
                    <input
                      type="text"
                      id="security-code"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      placeholder="CVV"
                    />
                  </motion.div>

                  {/* Country */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="country"
                      className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="relative group">
                      <select
                        id="country"
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 pr-8 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        defaultValue="USA"
                      >
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Postal Code */}
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="postal-code"
                      className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      placeholder="123456"
                      defaultValue="123456"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                  variants={itemVariants}
                >
                  <div className="flex flex-row items-center justify-center gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="mr-1 sm:mr-2">🏦</span>
                      <span className="hidden xs:inline">Card</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center rounded-md border border-gray-300 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="mr-1 sm:mr-2">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                          fill="#4285F4"
                        >
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </span>
                      <span className="hidden xs:inline">Pay</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center rounded-md border border-gray-300 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="mr-1 sm:mr-2">
                        <Image
                          src={apple}
                          width={16}
                          height={16}
                          alt="Apple Pay"
                          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                        />
                      </span>
                      <span className="hidden xs:inline">Pay</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center rounded-md border border-gray-300 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 transition-colors duration-200"
                    >
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full sm:w-auto rounded-md bg-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Pay GBP 100.00
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