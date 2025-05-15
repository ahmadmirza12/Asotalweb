"use client"

import { useState } from "react"
import { ChevronUp, Tag, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import circle from "@/public/assets/circle.png";
export default function SetPaymentMethod() {
  const [paymentType, setPaymentType] = useState("same-day")
  const [paymentMode, setPaymentMode] = useState("bank-transfer")
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [referralCode, setReferralCode] = useState("AADAFSSCGG")

  // Improved animation variants with better mobile support
  const cardVariants = {
    open: {
      height: "auto",
      opacity: 1,
      scale: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3 },
        scale: { duration: 0.2 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      scale: 0.95,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
  }

  // Animation variants for child elements - consistent across screen sizes
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
  }

  const removeReferralCode = () => {
    setReferralCode("")
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className={`${isCardOpen ? "border-b border-gray-200" : ""} p-4 sm:p-6`}>
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
                            STEP 4
                          </div>
                          <h2 className="text-base sm:text-xl font-semibold">
                            Set Pament Method
                          </h2>
                        </div>
                      </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsCardOpen(!isCardOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ rotate: isCardOpen ? 0 : 180 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
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
              <div className="p-4 sm:p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Select Payment Type */}
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-base">Select Payment Type</h3>
                    <div className="border border-gray-200 rounded-md p-4">
                      {/* Same Day Incorporation */}
                      <div className="mb-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="pt-0.5">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                paymentType === "same-day" ? "border-green-500" : "border-gray-300"
                              }`}
                            >
                              {paymentType === "same-day" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                            </div>
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="paymentType"
                              value="same-day"
                              checked={paymentType === "same-day"}
                              onChange={() => setPaymentType("same-day")}
                              className="sr-only"
                            />
                            <div className="font-medium">Same Day Incorporation</div>
                            <div className="text-sm text-gray-600">500 GBP (Single Payment)</div>
                          </div>
                        </label>
                      </div>

                      {/* Normal Incorporation */}
                      <div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="pt-0.5">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                paymentType === "normal" ? "border-green-500" : "border-gray-300"
                              }`}
                            >
                              {paymentType === "normal" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                            </div>
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="paymentType"
                              value="normal"
                              checked={paymentType === "normal"}
                              onChange={() => setPaymentType("normal")}
                              className="sr-only"
                            />
                            <div className="font-medium">Normal Incorporation</div>
                            <div className="text-sm text-gray-600">500 GBP (Payment in 3 Installments)</div>
                            <ol className="mt-2 text-sm text-gray-700 list-decimal pl-5 space-y-1">
                              <li>100 GBP: After Name Confirmation</li>
                              <li>200 GBP: For British Address (Company & Director)</li>
                              <li>200 GBP: Final Payment to process Order</li>
                            </ol>
                          </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  {/* Select Payment Mode */}
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-base">Select Payment Mode</h3>
                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                      {/* Local Bank Transfer */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              paymentMode === "bank-transfer" ? "border-green-500" : "border-gray-300"
                            }`}
                          >
                            {paymentMode === "bank-transfer" && (
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <div>
                            <input
                              type="radio"
                              name="paymentMode"
                              value="bank-transfer"
                              checked={paymentMode === "bank-transfer"}
                              onChange={() => setPaymentMode("bank-transfer")}
                              className="sr-only"
                            />
                            <div className="font-medium">Local Bank Transfer</div>
                          </div>
                        </label>
                      </div>

                      {/* Credit Card */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              paymentMode === "credit-card" ? "border-green-500" : "border-gray-300"
                            }`}
                          >
                            {paymentMode === "credit-card" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMode"
                              value="credit-card"
                              checked={paymentMode === "credit-card"}
                              onChange={() => setPaymentMode("credit-card")}
                              className="sr-only"
                            />
                            <div className="font-medium">Credit Card</div>
                            <div className="flex gap-1 ml-2">
                              <div className="w-8 h-5 bg-blue-100 rounded flex items-center justify-center text-[8px] text-blue-800 font-bold">
                                VISA
                              </div>
                              <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center text-[8px] text-white font-bold">
                                AMEX
                              </div>
                              <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center text-[8px] text-white font-bold">
                                MC
                              </div>
                              <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center text-[8px] text-white font-bold">
                                JCB
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>

                  {/* Order Summary */}
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="space-y-4"
                  >
                    <h3 className="font-medium text-base">Order Summary</h3>
                    <div className="border border-gray-200 rounded-md p-4 space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sub total</span>
                        <span className="font-medium">$78.88</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-600">Calculated at next step</span>
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Expiration Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Referral Code:</label>
                        {referralCode ? (
                          <div className="flex items-center gap-2 bg-blue-50 rounded-md p-2 text-sm">
                            <Tag className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{referralCode}:</span>
                            <span className="text-gray-500">-$200</span>
                            <button onClick={removeReferralCode} className="ml-auto text-gray-400 hover:text-gray-600">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">All Your Discounts</span>
                          <span className="font-medium text-red-600">-$200.00</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="font-medium">Grand total:</span>
                          <span className="font-bold text-lg">$58.00</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
