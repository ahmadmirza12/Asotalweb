"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";
import Image from "next/image";

const Typeofcompany = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [companyType, setCompanyType] = useState(
    "Limited Liability Partnership"
  );
  const [jurisdiction, setJurisdiction] = useState("England & Wales");

  // Load saved data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("companyTypeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.companyType) setCompanyType(parsedData.companyType);
        if (parsedData.jurisdiction) setJurisdiction(parsedData.jurisdiction);
        
        // Log retrieved data
        console.log("Retrieved company type data:", parsedData);
      } catch (error) {
        console.error("Error parsing company type data from localStorage:", error);
      }
    }
  }, []);

  const handleContinue = () => {
    const result = {
      companyType: companyType,
      jurisdiction: jurisdiction,
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage///////////////////////////////////////////////////////////////////////////////////////////////////
    localStorage.setItem("companyData", JSON.stringify(result));
    
    // Log the saved data
    console.log("Company type data saved:", result);
    
    // Optionally close the card after saving
    setIsCardOpen(false);
  };

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
  };

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

  const companyTypes = [
    "Limited Liability Partnership",
    "Private Limited Company (LTD)",
    "Public Limited Company (PLC)",
    "Sole Proprietorship",
  ];

  const jurisdictions = [
    "England & Wales",
    "Scotland",
    "Northern Ireland",
    "United Kingdom",
    "United States",
  ];

  return (
    <div className="p-2 sm:p-4 md:p-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          className={`${
            isCardOpen ? "border-b border-gray-200" : ""
          } p-4 sm:p-6`}
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
                  STEP 2
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Type of Company & Jurisdiction
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsCardOpen(!isCardOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isCardOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <label className="block text-sm text-gray-700 mb-2">
                      Type Of Company
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-12 appearance-none border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                      >
                        {companyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <label className="block text-sm text-gray-700 mb-2">
                      Jurisdiction
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-12 appearance-none border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={jurisdiction}
                        onChange={(e) => setJurisdiction(e.target.value)}
                      >
                        {jurisdictions.map((j) => (
                          <option key={j} value={j}>
                            {j}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="flex justify-end mt-6"
                  variants={childVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <button 
                    onClick={handleContinue} 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors duration-200"
                  >
                    Continue
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Typeofcompany;