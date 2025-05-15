import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 relative">
      {/* Dropdown header */}
      <div
        className="flex items-center justify-between bg-gray-100 rounded-md p-3 cursor-pointer border border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 font-poppins">
          {value || placeholder}
        </span>
        <span>
          <ChevronDown
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            size={18}
          />
        </span>
      </div>

      {/* Dropdown content with improved visibility and shadow */}
      {isOpen && (
        <div className="absolute w-full z-10 mt-1 rounded-md shadow-lg">
          <div className="bg-white font-poppins rounded-md p-1 border border-gray-200">
            <div className="space-y-1">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 transition-colors ${
                    value === option ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;