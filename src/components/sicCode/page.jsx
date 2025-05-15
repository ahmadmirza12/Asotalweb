"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";
import pic from "@/public/assets/pic.png";
export default function CompanyAddressPage() {
  const [isOpen, setIsOpen] = useState(false);

  // Improved animation variants
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
                  STEP 6
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Your Company Address
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Company Address Form"
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
                className="p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="grid grid-cols-1 gap-6 md:grid-cols-3"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 },
                    },
                    closed: {},
                  }}
                >
                  {/* Registered Address */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="font-medium text-base">
                      Registered address
                    </h3>
                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                      <p className="text-sm text-gray-600">
                        A Registered office is the official address of an
                        incorporated company. Generally it will form part of the
                        public record and is required. the registered address
                        must be in the country in which the company is
                        registered a scottish company, for example, may not have
                        its registered office in england or vice versa. The
                        address of the registered office must appear on all
                        business letters, emails, websites, etc.
                      </p>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">
                          Select our UK Address
                        </h4>
                        <p className="text-sm">
                          2692 Cherry Tree Drive Jacksonville, FL 32216
                        </p>
                        <p className="text-sm">+79 904-335-0527</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">
                          Select Your Own Address
                        </h4>
                        <p className="text-sm">
                          2692 Cherry Tree Drive Jacksonville, FL 32216
                        </p>
                        <p className="text-sm">+79 904-335-0527</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Forwarding Address */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="font-medium text-base">
                      Forwarding Address
                    </h3>
                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">
                          Select our UK Address
                        </h4>
                        <p className="text-sm">
                          2692 Cherry Tree Drive Jacksonville, FL 32216
                        </p>
                        <p className="text-sm">+79 904-335-0527</p>
                      </div>

                      <div className="flex justify-center mt-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200">
                          Continue
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Trading Address */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="font-medium text-base">Trading Address</h3>
                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">
                          Upgrades available to registered office
                        </h4>
                        <p className="text-sm">
                          A Registered office is the official address of an
                          incorporated company. Generally it will form part of
                          the public record and is required. the registered
                          address must be in the country in which the company is
                          registered a scottish company, for example, may not
                          have its registered office in england or vice versa.
                          The address of the registered office must appear on
                          all business letters, emails, websites, etc.
                        </p>
                      </div>

                      {/* Commercial Mail Scanned Service 1 */}
                      <div className="border border-gray-200 rounded-md p-3">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-blue-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={pic}
                              alt="Mail service"
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              Commercial Mail Scanned Service
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industrys standard dummy text ever since the
                              1500s.
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="font-bold">$75.00</span>
                              <div className="flex gap-2">
                                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs">
                                  Details
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Commercial Mail Scanned Service 2 */}
                      <div className="border border-gray-200 rounded-md p-3">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-blue-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={pic}
                              alt="Mail service"
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              Commercial Mail Scanned Service
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industryv. Lorem Ipsum has been the
                              industrys standard dummy text ever since the
                              1500s.
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="font-bold">$75.00</span>
                              <div className="flex gap-2">
                                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs">
                                  Details
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200">
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
