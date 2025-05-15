"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Mail, Lock } from "lucide-react";
import google from "@/public/assets/google.jpg";
import facebook from "@/public/assets/facebook.png";
import apple from "@/public/assets/apple.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(PATHS.DASHBOARD);
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

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
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
          <h1 className="text-2xl sm:text-3xl font-medium font-poppins">Log in</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            {"Don't have an account?"}
            <Link
              href={PATHS.SIGNUP}
              className="text-gray-600 hover:text-gray-700 font-poppins font-semibold"
            >
              Sign up
            </Link>
          </p>
        </motion.div>

        {/* Social Buttons */}
        <motion.div className="mt-4 space-y-3 sm:space-y-4" variants={itemVariants}>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm sm:text-base font-poppins text-gray-700 hover:bg-gray-50"
          >
            <Image src={google} width={24} height={24} alt="Google" />
            <span className="ml-6">Continue with Google</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm sm:text-base font-poppins text-gray-700 hover:bg-gray-50"
          >
            <Image src={facebook} width={24} height={24} alt="Facebook" />
            <span className="ml-6">Continue with Facebook</span>
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm sm:text-base font-poppins text-gray-700 hover:bg-gray-50"
          >
            <Image src={apple} width={24} height={24} alt="Apple" />
            <span className="ml-6">Continue with Apple</span>
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div className="relative mt-4" variants={itemVariants}>
          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="w-full border-t border-gray-300"
              variants={dividerVariants}
            ></motion.div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-poppins sm:text-base">
              Or continue with email
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 sm:space-y-8"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants} className="sm:h-14">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="sm:h-14">
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </motion.div>

          <motion.div className="flex justify-end" variants={itemVariants}>
            <Link
              href={PATHS.FORGOTPASSWORD}
              className="text-xs sm:text-base text-gray-600 pt-2 hover:text-gray-800 font-poppins"
            >
              Forgot your password?
            </Link>
          </motion.div>

          <motion.div className="flex items-center" variants={itemVariants}>
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block font-poppins text-sm sm:text-base text-gray-900"
            >
              Remember me
            </label>
          </motion.div>

          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="mt-6 sm:mt-8"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button type="submit">Log in</Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}