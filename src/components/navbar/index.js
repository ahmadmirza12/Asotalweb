"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import PATHS from "@/utils/paths"
import Image from "next/image"
import logo from "@/public/assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")

  const navLinks = [
    { name: "Home", href: PATHS.DASHBOARD },
    { name: "Favorite", href: "/favorite" },
    { name: "Cart", href: "/cart" },
    { name: "Orders", href: "/orders" },
    { name: "Profile", href: "/profile" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const sidebarVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  }

  const handleLinkClick = (name) => {
    setActiveLink(name)
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="font-poppins w-full fixed top-0 z-50 bg-black shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo */}
            <motion.div
              variants={itemVariants}
              className="flex-shrink-0"
            >
              <Link href={PATHS.DASHBOARD}>
                <Image 
                  src={logo} 
                  alt="Logo" 
                  width={100} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </Link>
            </motion.div>

            {/* Center: Navigation for Desktop */}
            <motion.nav
              variants={itemVariants}
              className="hidden lg:flex flex-1 justify-center space-x-4 xl:space-x-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.name)}
                    className={`font-poppins text-sm px-3 py-2 rounded-md ${
                      activeLink === link.name
                        ? "text-red-600 bg-gray-900/20"
                        : "text-white hover:text-red-600 hover:bg-gray-900/20"
                    } transition-all duration-200`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Right Side: Mobile/Tablet Menu Button */}
            <motion.div variants={itemVariants} className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-600 focus:outline-none transition-colors duration-200"
                aria-expanded={isOpen}
              >
                <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar for Mobile and Tablet */}
      <motion.div
        className="lg:hidden fixed top-0 right-0 h-full w-64 bg-black/95 z-50 pt-16"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        initial="closed"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-red-600"
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-start px-6 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => handleLinkClick(link.name)}
              className={`w-full px-4 py-2 rounded-lg text-base font-poppins ${
                activeLink === link.name
                  ? "text-red-600 bg-gray-900/20"
                  : "text-white hover:text-red-600 hover:bg-gray-900/20"
              } transition-all duration-200`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Overlay for sidebar when open */}
      {isOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar