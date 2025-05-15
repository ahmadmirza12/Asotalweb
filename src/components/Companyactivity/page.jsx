"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Plus, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import circle from "@/public/assets/circle.png";

const CompanyActivities = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Public Administration and Defence; Compulsory Social Security"
  );
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedActivities = localStorage.getItem("companyData");
    if (savedActivities) {
      try {
        const parsedData = JSON.parse(savedActivities);
        if (parsedData.selectedCodes) setSelectedCodes(parsedData.selectedCodes);
        if (parsedData.selectedCategory) setSelectedCategory(parsedData.selectedCategory);
        
        // Log retrieved data
        console.log("Retrieved company activities from localStorage:", parsedData);
      } catch (error) {
        console.error("Error parsing company activities from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever selected values change
  useEffect(() => {
    const dataToSave = {
      selectedCategory,
      selectedCodes,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem("companyData", JSON.stringify(dataToSave));
    console.log("Saved company activities to localStorage:", dataToSave);
  }, [selectedCategory, selectedCodes]);

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

  const categories = [
    "Public Administration and Defence; Compulsory Social Security",
    "Agriculture, Forestry and Fishing",
    "Manufacturing",
    "Construction",
    "Wholesale and Retail Trade",
  ];

  const allSisCodes = {
    "Public Administration and Defence; Compulsory Social Security": [
      {
        code: "84110",
        description: "General Public administration activities",
      },
      {
        code: "84120",
        description:
          "Regulation of health care, education, cultural and other social services, not incl. social security",
      },
      {
        code: "84130",
        description:
          "Regulation of and contribution to more efficient operation of businesses",
      },
      { code: "84220", description: "Defence activities" },
      { code: "84230", description: "Justice and judicial activities" },
    ],
    "Agriculture, Forestry and Fishing": [
      { code: "01110", description: "Growing of cereals and other crops" },
      { code: "01210", description: "Growing of vegetables and melons" },
      { code: "01300", description: "Plant propagation" },
    ],
    Manufacturing: [
      { code: "10100", description: "Processing and preserving of meat" },
      { code: "10200", description: "Processing and preserving of fish" },
      {
        code: "10300",
        description: "Processing and preserving of fruits and vegetables",
      },
    ],
    Construction: [
      { code: "41100", description: "Development of building projects" },
      { code: "41200", description: "Construction of residential buildings" },
      { code: "42100", description: "Construction of roads and railways" },
    ],
    "Wholesale and Retail Trade": [
      { code: "46100", description: "Wholesale on a fee or contract basis" },
      { code: "46200", description: "Wholesale of agricultural raw materials" },
      {
        code: "46300",
        description: "Wholesale of food, beverages and tobacco",
      },
    ],
  };

  // Filter codes based on search term and selected category
  // useEffect(() => {
  //   if (selectedCategory && allSisCodes[selectedCategory]) {
  //     const filtered = allSisCodes[selectedCategory].filter(
  //       (item) =>
  //         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         item.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredCodes(filtered);
  //   }
  // }, [searchTerm, selectedCategory]);

  const handleAddCode = (code, description) => {
    if (!selectedCodes.some((item) => item.code === code)) {
      const newSelectedCodes = [...selectedCodes, { code, description }];
      setSelectedCodes(newSelectedCodes);
    }
  };

  const handleRemoveCode = (code) => {
    const newSelectedCodes = selectedCodes.filter((item) => item.code !== code);
    setSelectedCodes(newSelectedCodes);
  };

  const handleContinue = () => {
    // Already saving with the useEffect, but we could do additional handling here
    setIsCardOpen(false);
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
                  STEP 3
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Activities of Your Company (SIS Code)
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
          
          {/* Show selected codes summary when card is closed */}
          {/*  */}
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
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        SIS Code
                      </label>
                      <div className="relative">
                        <div className="border border-gray-300 rounded">
                          <div className="p-4 border-b border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              What Are Your business Activities
                            </p>
                            <div className="relative">
                              <select
                                className="w-full appearance-none bg-white py-2 pr-8 focus:outline-none text-sm"
                                value={selectedCategory}
                                onChange={(e) => {
                                  setSelectedCategory(e.target.value);
                                  setSearchTerm(""); // Reset search term when category changes
                                }}
                              >
                                {categories.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search by code or description"
                                className="w-full pl-2 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Search className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
                            {filteredCodes.length > 0 ? (
                              filteredCodes.map((item, index) => (
                                <div
                                  key={`${item.code}-${index}`}
                                  className="p-4 flex justify-between items-center hover:bg-gray-50"
                                >
                                  <div className="text-sm">
                                    {item.code} - {item.description}
                                  </div>
                                  <button
                                    className="text-green-500 hover:text-green-600 focus:outline-none"
                                    onClick={() =>
                                      handleAddCode(item.code, item.description)
                                    }
                                  >
                                    <Plus className="h-5 w-5" />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-sm text-gray-500">
                                No matching codes found
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div
                    variants={childVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        Selected SIS Codes
                      </label>
                      <div className="bg-gray-50 border border-gray-300 rounded min-h-[400px] p-4">
                        {selectedCodes.length > 0 ? (
                          selectedCodes.map((item, index) => (
                            <motion.div
                              key={`selected-${item.code}-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex justify-between items-center p-3 mb-2 bg-white border border-gray-200 rounded"
                            >
                              <div className="text-sm">
                                {item.code} - {item.description}
                              </div>
                              <button
                                className="text-red-400 hover:text-red-500 focus:outline-none"
                                onClick={() => handleRemoveCode(item.code)}
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </motion.div>
                          ))
                        ) : (
                          <div className="flex items-center justify-center h-full text-sm text-gray-500">
                            No codes selected yet
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Continue button */}
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CompanyActivities;