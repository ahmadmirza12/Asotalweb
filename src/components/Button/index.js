// components/Button.jsx
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  isLoading = false,
  disabled = false,
  loadingText = "Loading...",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full flex items-center justify-center py-3 px-6 md:px-8 rounded-full font-poppins transition-all duration-200 ${
        isLoading || disabled
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-gray-800 hover:bg-gray-950"
      } text-white ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2" size={18} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;