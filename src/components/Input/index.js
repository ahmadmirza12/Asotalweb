import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Input = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block font-semibold text-[16px] font-poppins text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center bg-gray-100 rounded-md px-3 py-[14px] md:py-4 w-full">
        {Icon && (
          <span className="text-gray-500">
            <Icon size={18} />
          </span>
        )}
        <input
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent outline-none border-none ml-2 font-poppins text-sm md:text-base text-gray-800 placeholder:font-poppins placeholder:text-sm md:placeholder:text-base placeholder:text-gray-400"
        />
        {type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500"
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};