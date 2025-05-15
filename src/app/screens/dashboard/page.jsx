"use client";
import SearchCompany from "@/components/CheckCompany/page";
import OfficerDetailsPage from "@/components/officeDetails/page";
import SetOfficersPage from "@/components/officeNumber/page";
import PaymentPage from "@/components/payment/page";
import PaymentMethodsPage from "@/components/paymentMethod/page";
import MobileVerificationPage from "@/components/phoneNumber/page";
import SelectSICCodePage from "@/components/sicCode/page";
import RegistrationStatus from "@/components/status/page";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typeofcompany from "@/components/Typeofcompany/page";
import CompanyActivities from "@/components/Companyactivity/page";
import CompanyAddressPage from "@/components/sicCode/page";
import OfficersAddressesPage from "@/components/Officeaddress/page";
import NatureOfControlPage from "@/components/NatureofControl/page";
import ReviewInformationPage from "@/components/Reviewinfo/page";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Dashbord = () => {
  return (
    <motion.div
      className="bg-gray-100 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <SearchCompany />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typeofcompany />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CompanyActivities />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PaymentMethodsPage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MobileVerificationPage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SelectSICCodePage />
      </motion.div>
      <motion.div variants={itemVariants}>
        <SetOfficersPage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OfficerDetailsPage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <OfficersAddressesPage />
      </motion.div>

      <motion.div variants={itemVariants}>
        <NatureOfControlPage />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ReviewInformationPage />
      </motion.div>

      {/* <motion.div variants={itemVariants}>
        <PaymentPage />
      </motion.div> */}

      <motion.div variants={itemVariants}>
        <RegistrationStatus />
      </motion.div>
    </motion.div>
  );
};

export default Dashbord;
