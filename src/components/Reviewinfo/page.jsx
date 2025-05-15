"use client"

import { useState } from "react"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import circle from "@/public/assets/circle.png";
export default function ReviewInformationPage() {
  const [isOpen, setIsOpen] = useState(false)

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
  }

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
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className={`${isOpen ? "border-b border-gray-200" : ""} p-4 sm:p-6`}>
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
                                      STEP 11
                                    </div>
                                    <h2 className="text-base sm:text-xl font-semibold">
                                   Review your Information
                                    </h2>
                                  </div>
                                </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Review Information Form"
            >
              <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
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
                <motion.div variants={itemVariants}>
                  <h3 className="text-base font-medium mb-4">Company Formation</h3>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Particulars Section */}
                      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Particulars</h4>
                          <button className="text-red-600 text-sm font-medium">Edit</button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">Company Name</p>
                            <p className="text-sm font-medium">BROLEDCO ASSET MANAGEMENT SERVICES LLP</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Company Type</p>
                            <p className="text-sm font-medium">Limited Liability Partnership</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Jurisdiction</p>
                            <p className="text-sm font-medium">England and Wales</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Sic Codes</p>
                            <p className="text-sm font-medium">
                              Growing of cereals (except rice), leguminous crops and oil seeds Foreign affairs
                            </p>
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium">Addresses</h4>
                              <button className="text-red-600 text-sm font-medium">Edit</button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="text-sm font-medium">malithan1989@gmail.com</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Addresses</p>
                                <p className="text-sm font-medium">
                                  LLP Registered office Service including service addresses for all officers
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Forwarding Address</p>
                                <p className="text-sm font-medium">
                                  NO 106, Jayasiripura, Anuradhapura, 50000, SRI LANKA
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Appointments Section */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Appointments</h4>
                          <button className="text-red-600 text-sm font-medium">Edit</button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="text-sm font-medium">SURANGEE PRASAD KARAWGODAGE DON</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Roles</p>
                            <p className="text-sm font-medium">
                              Member, Designated Member, Person of Significant Control
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">DOB</p>
                            <p className="text-sm font-medium">25/07/1981</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Occupation</p>
                            <p className="text-sm font-medium">Business</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nationality</p>
                            <p className="text-sm font-medium">Sri Lankan</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Residential Address</p>
                            <p className="text-sm font-medium">
                              104/21, Jayasooriya rd, Nedurupitiya, Kandana, 11320, SRI LANKA
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Service Address</p>
                            <p className="text-sm font-medium">
                              Partners Services Address including with Registered Office Service
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Forwarding Address</p>
                            <p className="text-sm font-medium">
                              27, Old Gloucester Street, LONDON, WC 1N 3AX, UNITED KINGDOM
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nature Of Control</p>
                            <p className="text-sm font-medium">
                              In dividable Voting Rights: More than 25% but not more than 50%
                            </p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="text-sm font-medium">Malitha Dirukshan Abeykoon Herath Mudiyanselage</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Roles</p>
                            <p className="text-sm font-medium">
                              Member, Designated Member, Person of Significant Control
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">DOB</p>
                            <p className="text-sm font-medium">02/09/1989</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Occupation</p>
                            <p className="text-sm font-medium">Business</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nationality</p>
                            <p className="text-sm font-medium">Sri Lankan</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Residential Address</p>
                            <p className="text-sm font-medium">NO 106, Jayasiripura, Anuradhapura, 50000, SRI LANKA</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Service Address</p>
                            <p className="text-sm font-medium">
                              Partners Services Address including with Registered Office Service
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Forwarding Address</p>
                            <p className="text-sm font-medium">
                              27, Old Gloucester Street, LONDON, WC 1N 3AX, UNITED KINGDOM
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Nature Of Control</p>
                            <p className="text-sm font-medium">
                              In dividable Voting Rights: More than 25% but not more than 50%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="mt-6 flex justify-end" variants={itemVariants}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
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
  )
}
