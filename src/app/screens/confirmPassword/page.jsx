"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Lock } from "lucide-react";
import PATHS from "@/utils/paths";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(PATHS.HOME);
    }, 1500);
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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-md w-full md:max-w-lg space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl font-medium font-poppins">Reset Password</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            Create a new secure password for your account
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 sm:space-y-8"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Input
              icon={Lock}
              type="password"
              placeholder="New Password"
              name="password"
              label="New Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-12 sm:h-14 text-base sm:text-lg"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="h-12 sm:h-14 text-base sm:text-lg"
            />
          </motion.div>

          {error && (
            <motion.div
              className="text-red-600 text-sm font-poppins text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div
            variants={pulseVariants}
            animate="pulse"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.password || !formData.confirmPassword}
                className="w-full"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>

        {/* Footer */}
        <motion.div className="text-center mt-4" variants={itemVariants}>
          <p className="text-sm sm:text-base text-gray-600 font-poppins">
            Remember your password?{" "}
            <Link
              href={PATHS.HOME}
              className="text-gray-700 font-semibold hover:text-gray-900 font-poppins"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}