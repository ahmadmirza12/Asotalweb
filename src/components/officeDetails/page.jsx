"use client";

import { useState, useEffect } from "react";
import { ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import circle from "@/public/assets/circle.png";
import Image from "next/image";

export default function OfficerDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [directorCount, setDirectorCount] = useState(1);
  const [shareholderCount, setShareholderCount] = useState(1);
  const [selectedOfficerType, setSelectedOfficerType] = useState({});
  const [positions, setPositions] = useState({});

  // Initialize state based on localStorage
  useEffect(() => {
    const storedDirectorCount =
      parseInt(localStorage.getItem("directorCount")) || 1;
    const storedShareholderCount =
      parseInt(localStorage.getItem("shareholderCount")) || 1;
    setDirectorCount(storedDirectorCount);
    setShareholderCount(storedShareholderCount);

    // Initialize officer types and positions
    const initialOfficerTypes = {};
    const initialPositions = {};

    for (let i = 1; i <= storedDirectorCount; i++) {
      const officerId = `director${i}`;
      initialOfficerTypes[officerId] = "person";
      initialPositions[officerId] = { member: true, psc: true, agreed: true };
    }

    for (let i = 1; i <= storedShareholderCount; i++) {
      const officerId = `shareholder${i}`;
      initialOfficerTypes[officerId] = "person";
      initialPositions[officerId] = { member: true, psc: true, agreed: true };
    }

    setSelectedOfficerType(initialOfficerTypes);
    setPositions(initialPositions);
  }, []);

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

  const handleOfficerTypeChange = (officer, type) => {
    setSelectedOfficerType((prev) => ({
      ...prev,
      [officer]: type,
    }));
  };

  const handleCheckboxChange = (officer, position) => {
    setPositions((prev) => ({
      ...prev,
      [officer]: {
        ...prev[officer],
        [position]: !prev[officer][position],
      },
    }));
  };

  // Generate days, months, and years for dropdowns
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  // Officer type options
  const officerTypes = [
    {
      id: "person",
      label: "Person",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-4 sm:h-4"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      id: "corporate",
      label: "Corporate",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-4 sm:h-4"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      ),
    },
    {
      id: "legal",
      label: "Other Legal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sm:w-4 sm:h-4"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" x2="6" y1="1" y2="4" />
          <line x1="10" x2="10" y1="1" y2="4" />
          <line x1="14" x2="14" y1="1" y2="4" />
        </svg>
      ),
    },
  ];

  // Position options
  const positionOptions = [
    { id: "member", label: "Member" },
    { id: "psc", label: "Person Of Significant Control" },
    {
      id: "agreed",
      label:
        "The members confirm that the named officer has agreed to be appointed",
    },
  ];

  // Authentication questions
  const authQuestions = [
    "Mother's Maiden Name",
    "City of Birth",
    "First Pet's Name",
  ];

  const renderOfficerSection = (officerType, officerNumber) => {
    const officerId = `${officerType.toLowerCase()}${officerNumber}`;

    return (
      <div className="border border-gray-200 rounded-md p-2 sm:p-4 space-y-4 sm:space-y-6">
        <div>
          <h3 className="font-medium text-sm sm:text-base mb-2">
            {officerType} {officerNumber}
          </h3>
          <div>
            <p className="text-xs sm:text-sm mb-1">Add An Officer</p>
            <p className="text-xs text-gray-500 mb-2 sm:mb-3">
              Click on the buttons below to add an officer to your company
            </p>
            <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
              {officerTypes.map((type) => (
                <button
                  key={type.id}
                  className={`flex-1 py-1 sm:py-2 px-2 sm:px-4 border rounded-md text-xs sm:text-sm flex items-center justify-center gap-1 ${
                    selectedOfficerType[officerId] === type.id
                      ? type.id === "legal"
                        ? "bg-red-600 text-white border-red-600"
                        : "border-blue-500 text-blue-500"
                      : type.id === "legal"
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-300 text-gray-700"
                  }`}
                  onClick={() => handleOfficerTypeChange(officerId, type.id)}
                >
                  {type.icon}
                  <span className="hidden xs:inline">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0 relative w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 sm:w-4 sm:h-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
              <Check className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />
            </div>
          </div>
          <div>
            <p className="text-xs sm:text-sm">Upload your ID/Passport</p>
            <span className="text-xs text-green-500 border border-green-500 rounded-full px-1 sm:px-2 py-0.5">
              COMPLETED
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm mb-2 sm:mb-3">Choose Position</p>
          <div className="space-y-1 sm:space-y-2">
            {positionOptions.map((position) => (
              <div
                key={position.id}
                className="flex items-center gap-1 sm:gap-2"
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 border rounded flex items-center justify-center cursor-pointer ${
                    positions[officerId]?.[position.id]
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleCheckboxChange(officerId, position.id)}
                >
                  {positions[officerId]?.[position.id] && (
                    <Check className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />
                  )}
                </div>
                <span className="text-xs sm:text-sm">{position.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">
            Personal Details
          </p>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs mb-1">Title</label>
              <input
                type="text"
                defaultValue="Mr"
                className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-xs mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue="Manoj"
                  className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue="Halugona"
                  className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Date Of Birth</label>
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                <select className="border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm">
                  {days.map((day) => (
                    <option key={day} value={day} selected={day === "02"}>
                      {day}
                    </option>
                  ))}
                </select>
                <select className="border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm">
                  {months.map((month) => (
                    <option key={month} value={month} selected={month === "09"}>
                      {month}
                    </option>
                  ))}
                </select>
                <select className="border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm">
                  {years.map((year) => (
                    <option key={year} value={year} selected={year === "1986"}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">
                Nationality (List Of Accepted Nationalities)
              </label>
              <select className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm">
                {[
                  "British",
                  "Irish",
                  "American",
                  "Canadian",
                  "Australian",
                  "Indian",
                  "Sri Lankan",
                ].map((nationality) => (
                  <option
                    key={nationality}
                    value={nationality}
                    selected={nationality === "Sri Lankan"}
                  >
                    {nationality}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1">Occupation</label>
              <input
                type="text"
                defaultValue="BUSINESS"
                className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">
            Authentication Questions
          </p>
          <div className="space-y-2 sm:space-y-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="grid grid-cols-3 gap-1 sm:gap-2">
                <div className="col-span-2">
                  <label className="block text-xs mb-1">
                    Select First 3 letters
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm">
                    {authQuestions.map((question, index) => (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1">Answer</label>
                  <input
                    type="text"
                    defaultValue="IND"
                    className="w-full border border-gray-300 rounded-md p-1.5 sm:p-2 text-xs sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Dynamically generate officer sections based on counts
  const officerSections = [
    {
      type: "Director",
      numbers: Array.from({ length: directorCount }, (_, i) => i + 1),
    },
    {
      type: "Shareholder",
      numbers: Array.from({ length: shareholderCount }, (_, i) => i + 1),
    },
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
            isOpen ? "border-b border-gray-200" : ""
          } p-3 sm:p-4 md:p-6`}
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
                  STEP 8
                </div>
                <h2 className="text-base sm:text-xl font-semibold">
                  Details & Documents of Officers
                </h2>
              </div>
            </div>
            <motion.button
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle Officer Details Form"
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
                className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div variants={itemVariants}>
                  <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">
                    LLP Members
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    A Limited Liability Partnership must have at least two
                    Designated Members to form the Partnership. They will be
                    responsible for the day-to-day running of the LLP.
                  </p>

                  {officerSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.type}
                      variants={itemVariants}
                      className={sectionIndex > 0 ? "pt-2 sm:pt-4" : ""}
                    >
                      <div className="flex flex-col lg:flex-row lg:gap-6">
                        {section.numbers.map((number) => (
                          <motion.div
                            key={`${section.type}${number}`}
                            variants={itemVariants}
                            className="flex-1"
                          >
                            {renderOfficerSection(section.type, number)}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
