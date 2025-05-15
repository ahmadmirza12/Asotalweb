"use client";

import { useState } from "react";
import { ChevronUp, Check } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";

export default function MobileVerificationPage() {
  // State management
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Malaysia",
    code: "+60",
    iso: "MY",
  });

  const countries = [
    { name: "Malaysia", code: "+60", iso: "MY" },
    { name: "United States", code: "+1", iso: "US" },
    { name: "United Kingdom", code: "+44", iso: "GB" },
    { name: "India", code: "+91", iso: "IN" },
    { name: "Australia", code: "+61", iso: "AU" },
  ];

  // Improved animation variants
  const cardVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 },
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg  p-3 sm:p-4 md:p-6 overflow-hidden"
      >
        <div
          className={`${
            isCollapsed ? "" : "border-b border-gray-200"
          } pb-3 sm:pb-4`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2 sm:flex-nowrap">
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
                  Verify Your Mobile Number
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto mt-1 sm:mt-0">
              <motion.span
                className="text-emerald-500 font-poppins border px-2 py-0.5 sm:px-3 sm:py-1 border-emerald-500 rounded-full text-xs sm:text-sm flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4" /> Completed
              </motion.span>
              <motion.button
                className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
                onClick={() => setIsCollapsed(!isCollapsed)}
                whileTap={{ scale: 0.95 }}
                aria-label={
                  isCollapsed
                    ? "Expand verification details"
                    : "Collapse verification details"
                }
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronUp className="w-5 h-5 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="accordion-content"
              variants={cardVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              <div className="mt-4 pt-2">
                <motion.p
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="text-gray-600 text-xs sm:text-sm"
                >
                  You have not entered your mobile number. Please enter your
                  mobile number for SMS verification.
                </motion.p>

                <motion.div
                  className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                      Country / Region
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCountry.name}
                        onChange={(e) => {
                          const country = countries.find(
                            (c) => c.name === e.target.value
                          );
                          if (country) setSelectedCountry(country);
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 py-2.5 sm:py-3 pl-8 pr-8 text-xs sm:text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-colors duration-200"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                        <span
                          className={`fi fi-${selectedCountry.iso.toLowerCase()} rounded-sm`}
                          style={{ width: "20px", height: "15px" }}
                        />
                      </div>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronUp className="w-4 h-4 text-gray-500 transform rotate-180" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                      Mobile number
                    </label>
                    <div className="flex">
                      <div className="w-16 sm:w-20 border border-gray-300 rounded-l-md flex items-center justify-center bg-gray-50 text-xs sm:text-sm font-medium">
                        {selectedCountry.code}
                      </div>
                      <input
                        type="tel"
                        placeholder="Mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="flex-1 border border-l-0 border-gray-300 rounded-r-md p-2 sm:p-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 sm:p-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <motion.button
                    className="bg-black text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-800 w-full sm:w-auto transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Verification SMS
                  </motion.button>
                  <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <motion.button
                      className="bg-red-600 text-white px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium hover:bg-red-700 w-full sm:w-auto transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Verify Code
                    </motion.button>
                    <motion.button
                      className="border border-red-600 text-black px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium hover:bg-gray-50 w-full sm:w-auto transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send new code
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
