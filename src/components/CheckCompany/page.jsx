"use client";

import { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";

export default function SearchCompany() {
  const [companyName, setCompanyName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  // Load saved company data from localStorage on component mount
  useEffect(() => {
    const savedCompanyData = localStorage.getItem("companyData");
    if (savedCompanyData) {
      try {
        const parsedData = JSON.parse(savedCompanyData);
        setSearchResult(parsedData);
        setCompanyName(parsedData.name);
        
        // Log retrieved data to console
        console.log("Retrieved company data from localStorage:", parsedData);
      } catch (error) {
        console.error("Error parsing company data from localStorage:", error);
      }
    }
  }, []);

  const handleSearch = () => {
    if (!companyName.trim()) return;

    setSearching(true);

    // Simulate API call
    setTimeout(() => {
      const result = {
        available: true,
        name: companyName.toUpperCase(),
        timestamp: new Date().toISOString(),
      };
      
      // Set the search result in state
      setSearchResult(result);
      
      // Store in localStorage//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      localStorage.setItem("companyData", JSON.stringify(result));
      
      // Log to console
      console.log("Company data saved to localStorage:", result);
      
      setSearching(false);
    }, 1000);
  };

  // Animation variants consistent with SelectSICCodePage
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
        {/* Step indicator */}
        <motion.div
          className="flex items-center mb-4 sm:mb-6"
          variants={itemVariants}
        >
          <Image
            src={circle}
            alt="Step indicator"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
            priority
          />
          <div className="ml-2 sm:ml-3">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
              STEP 1
            </span>
            <h2 className="text-base sm:text-xl font-semibold">
              Check Company Name Availability
            </h2>
          </div>
        </motion.div>

        {/* Search box */}
        <motion.div
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
          variants={itemVariants}
        >
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:py-3 pr-10 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={searching}
            className="w-full sm:w-auto rounded-md bg-red-600 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? "Searching..." : "Continue"}
          </motion.button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 sm:mt-6"
            >
              <motion.div
                className="flex items-center"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <p className="ml-2 sm:ml-3 text-sm sm:text-lg font-medium text-gray-900">
                  Congratulations! Your company name is available!
                </p>
              </motion.div>
              <motion.p
                className="mt-1 text-green-600 text-sm sm:text-base"
                variants={itemVariants}
              >
                {searchResult.name}
              </motion.p>
              <motion.p
                className="mt-1 text-gray-500 text-xs sm:text-sm"
                variants={itemVariants}
              >
                Last checked: {new Date(searchResult).toLocaleString()}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}