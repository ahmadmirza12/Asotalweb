"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { User, Mail, Lock } from "lucide-react";
import google from "@/public/assets/google.jpg";
import facebook from "@/public/assets/facebook.png";
import apple from "@/public/assets/apple.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import PATHS from "@/utils/paths";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(PATHS.OTP);
    console.log(formData);
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
          <h1 className="text-2xl sm:text-3xl font-medium font-poppins">Create an Account</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
            I have an account!{" "}
            <Link href={PATHS.HOME} className="text-gray-700 hover:text-gray-800 font-poppins font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Divider */}
       <motion.div className="mt-4 flex items-center" variants={itemVariants}>
  <motion.div
    className="flex-1 border-t border-gray-300"
    variants={dividerVariants}
  ></motion.div>
  <span className="px-4 text-gray-500 font-poppins sm:text-base">
    Or continue with email
  </span>
  <motion.div
    className="flex-1 border-t border-gray-300"
    variants={dividerVariants}
  ></motion.div>
</motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 sm:space-y-8"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants} className="sm:h-14">
            <Input
              icon={User}
              type="text"
              placeholder="Username"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </motion.div>

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
              className="h-12 sm:h-14 text-base sm:text-lg"
            />
          </motion.div>

          <motion.div className="text-sm text-gray-600 font-poppins" variants={itemVariants}>
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-gray-700 hover:text-gray-800 font-poppins font-semibold">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-700 hover:text-gray-800 font-poppins font-semibold">
              Privacy Policy
            </Link>
          </motion.div>

          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="mt-6 sm:mt-8"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button type="submit">Create Account</Button>
            </motion.div>
          </motion.div>

          {/* Social Buttons */}
          <motion.div className="flex justify-center space-x-4 mt-4" variants={itemVariants}>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-50"
            >
              <Image src={google} width={24} height={24} alt="Google" />
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-50"
            >
              <Image src={facebook} width={24} height={24} alt="Facebook" />
            </motion.button>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-50"
            >
              <Image src={apple} width={24} height={24} alt="Apple" />
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
}