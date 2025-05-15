"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import circle from "@/public/assets/circle.png";
export default function NatureOfControlPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [controlOptions, setControlOptions] = useState({
    director1: {
      votingRights: "N/A",
      rightToShareAssets1: "N/A",
      rightToShareAssets2: "N/A",
      appointMembers: "NO",
      otherInfluences: "NO",
      firmInfluence: "NO",
      trustInfluence: "NO",
    },
    director2: {
      votingRights: "N/A",
      rightToShareAssets1: "N/A",
      rightToShareAssets2: "N/A",
      appointMembers: "NO",
      otherInfluences: "NO",
      firmInfluence: "NO",
      trustInfluence: "NO",
    },
  })

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

  const handleOptionChange = (director, field, value) => {
    setControlOptions((prev) => ({
      ...prev,
      [director]: {
        ...prev[director],
        [field]: value,
      },
    }))
  }

  const renderControlSection = (director, directorNum) => {
    const directorKey = `director${directorNum}`
    const options = controlOptions[directorKey]

    return (
      <div className="border border-gray-200 rounded-md p-4 space-y-6">
        <h3 className="font-medium text-base mb-2">
          {director} {directorNum}
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sm mb-4">Nature of Control</h4>
            <div className="border-t border-gray-200 my-4"></div>

            <p className="font-medium text-sm mb-4">Does this officer have a controlling interest in this company?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Voting Rights</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm"
                    value={options.votingRights}
                    onChange={(e) => handleOptionChange(directorKey, "votingRights", e.target.value)}
                  >
                    <option value="N/A">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Right to share suplus assets</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm"
                    value={options.rightToShareAssets1}
                    onChange={(e) => handleOptionChange(directorKey, "rightToShareAssets1", e.target.value)}
                  >
                    <option value="N/A">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Right to share suplus assets</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm"
                    value={options.rightToShareAssets2}
                    onChange={(e) => handleOptionChange(directorKey, "rightToShareAssets2", e.target.value)}
                  >
                    <option value="N/A">N/A</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Appoint and remove members</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm"
                    value={options.appointMembers}
                    onChange={(e) => handleOptionChange(directorKey, "appointMembers", e.target.value)}
                  >
                    <option value="NO">NO</option>
                    <option value="YES">YES</option>
                    <option value="N/A">N/A</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Other Significant influencess or control</label>
              <div className="relative">
                <select
                  className="w-full appearance-none border border-gray-300 rounded-md p-2 pr-8 text-sm"
                  value={options.otherInfluences}
                  onChange={(e) => handleOptionChange(directorKey, "otherInfluences", e.target.value)}
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                  <option value="N/A">N/A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <div className="mb-6">
              <p className="font-medium text-sm mb-4">
                Does this officer have a controlling influence over a Firm(s) and/or the Mem has a controlling influence
                in this company?
              </p>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      options.firmInfluence === "NO" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    {options.firmInfluence === "NO" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`firm-influence-${directorKey}`}
                    value="NO"
                    checked={options.firmInfluence === "NO"}
                    onChange={() => handleOptionChange(directorKey, "firmInfluence", "NO")}
                  />
                  <span>NO</span>
                </label>
                <label className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      options.firmInfluence === "YES" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    {options.firmInfluence === "YES" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`firm-influence-${directorKey}`}
                    value="YES"
                    checked={options.firmInfluence === "YES"}
                    onChange={() => handleOptionChange(directorKey, "firmInfluence", "YES")}
                  />
                  <span>Yes</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <div>
              <p className="font-medium text-sm mb-4">
                Does this officer have a controlling influence over a Trust(s) and/or the Trust has a controlling
                influence in this company?
              </p>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      options.trustInfluence === "NO" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    {options.trustInfluence === "NO" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`trust-influence-${directorKey}`}
                    value="NO"
                    checked={options.trustInfluence === "NO"}
                    onChange={() => handleOptionChange(directorKey, "trustInfluence", "NO")}
                  />
                  <span>NO</span>
                </label>
                <label className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      options.trustInfluence === "YES" ? "border-green-500" : "border-gray-300"
                    }`}
                  >
                    {options.trustInfluence === "YES" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name={`trust-influence-${directorKey}`}
                    value="YES"
                    checked={options.trustInfluence === "YES"}
                    onChange={() => handleOptionChange(directorKey, "trustInfluence", "YES")}
                  />
                  <span>Yes</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
                            STEP 10
                          </div>
                          <h2 className="text-base sm:text-xl font-semibold">
                            Nature of Control
                          </h2>
                        </div>
                      </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Nature of Control Form"
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
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
                  {/* Director 1 */}
                  <motion.div variants={itemVariants}>{renderControlSection("Director", 1)}</motion.div>

                  {/* Director 2 */}
                  <motion.div variants={itemVariants}>{renderControlSection("Director", 2)}</motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
