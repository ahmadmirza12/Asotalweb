"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Focus first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input if current field is filled
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content contains only numbers
    if (/^\d+$/.test(pastedData)) {
      const pastedOtp = pastedData.split("").slice(0, 6);
      const newOtp = [...otp];

      pastedOtp.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });

      setOtp(newOtp);

      // Focus on the next empty field or the last field
      const lastFilledIndex = Math.min(pastedOtp.length - 1, 5);
      if (inputRefs.current[lastFilledIndex + 1]) {
        inputRefs.current[lastFilledIndex + 1].focus();
      } else {
        inputRefs.current[lastFilledIndex].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("OTP Submitted:", otpValue);

    // Navigate to next page or handle verification
    if (otpValue.length === 6) {
      router.push(PATHS.HOME || "/");
    }
  };

  const resendOTP = () => {
    console.log("Resending OTP");
    // Implement resend OTP logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: 2, ease: "easeInOut" },
    },
  };

  const otpInputVariants = {
    idle: { scale: 1, borderColor: "#D1D5DB" },
    focus: { scale: 1.05, borderColor: "#4F46E5" },
    filled: { scale: 1, backgroundColor: "#F3F4F6" },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-md w-full space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl font-medium font-poppins">Verification Code</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            We have sent a verification code to your email
          </p>
        </motion.div>

        {/* OTP Input Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 sm:space-y-6"
          variants={itemVariants}
        >
          <div className="flex justify-center gap-2 sm:gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <motion.input
                key={index}
                type="text"
                inputmode="numeric"
                ref={(element) => (inputRefs.current[index] = element)}
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                maxLength={1}
                className="w-10 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-lg border border-gray-300 focus:border-indigo-600 focus:outline-none transition-all"
                required
                variants={otpInputVariants}
                initial="idle"
                animate={otp[index] ? "filled" : "idle"}
                whileFocus="focus"
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </div>

          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="mt-6"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                type="submit"
                disabled={otp.join("").length !== 6}
              >
                Verify
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>

        {/* Resend OTP */}
        <motion.div className="text-center mt-4" variants={itemVariants}>
          <p className="text-sm sm:text-base text-gray-600 font-poppins">
            {"Didn't receive the code? "}
            <motion.button
              onClick={resendOTP}
              className="text-gray-700 font-semibold hover:text-gray-900 font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resend OTP
            </motion.button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}