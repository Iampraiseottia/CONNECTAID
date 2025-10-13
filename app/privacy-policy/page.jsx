"use client";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

import { ShieldAlert } from "lucide-react";

const PrivacyPolicy = () => {
  const metadata = {
    title: "Privacy Policy - ConnectAID ",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar */}
      <Navbar />

      {/* Breadcrumb  */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="w-full"
      >
        <Breadcrumb
          homeTitle="HOME"
          homeSlug="/"
          title="PRIVACY "
          description="PRIVACY POLICY"
          breadcrumAlt="Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Privacy Policy */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className="sm:py-16 py-8"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            {/* Single Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 dark:text-gray-800">
                Your Privacy Matters
              </h2>
              {/* List Items */}
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    ConnectAID is committed to protecting your personal
                    information
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    We only collect information necessary to connect donors with
                    those in need
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Your data is encrypted and stored securely
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    You control what information is shared with other users
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    We do not sell or share your personal data with third
                    parties for marketing purposes
                  </p>
                </li>
              </ul>
            </div>

            {/* Single Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 dark:text-gray-800">
                Information We Collect
              </h2>
              <p className="text-gray-700 mb-6">
                At ConnectAID, we collect certain information to help facilitate
                connections between donors and those seeking assistance. We
                strive to collect only what is necessary to provide our services
                effectively while respecting your privacy. Our platform is built
                on trust, and we take our responsibility to protect your
                information seriously.
              </p>

              {/* List Items */}
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Account information (name, email, phone number)
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Profile information that you choose to provide
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Transaction and donation records
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Communication between users on our platform
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 text-green-600 mr-3">
                    <ShieldAlert size={20} />
                  </div>
                  <p className="text-gray-700">
                    Usage data to improve our service and user experience
                  </p>
                </li>
              </ul>
            </div>

            {/* Single Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 dark:text-gray-800">
                How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                ConnectAID uses your information primarily to facilitate
                connections between donors and seekers. We use your data to
                match those in need with those who can help, process donations,
                ensure platform safety, and improve our services. All data
                processing is conducted with the highest standards of security
                and ethical consideration.
              </p>
              <p className="text-gray-700">
                We may use anonymized, aggregated data to analyze platform usage
                patterns and improve our services. We will never use your
                personal information for purposes beyond what is necessary to
                provide our core services without your explicit consent. Our
                goal is to create meaningful connections while respecting your
                privacy at every step.
              </p>
            </div>

            {/* Single Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 dark:text-gray-800">
                Acknowledgement
              </h2>
              <p className="text-gray-700 font-medium">
                BY USING CONNECTAID OR OTHER SERVICES PROVIDED BY US, YOU
                ACKNOWLEDGE THAT YOU HAVE READ THIS PRIVACY POLICY AND AGREE TO
                BE BOUND BY IT. WE MAY UPDATE THIS POLICY FROM TIME TO TIME, AND
                YOUR CONTINUED USE OF OUR SERVICES CONSTITUTES ACCEPTANCE OF ANY
                CHANGES.
              </p>
            </div>

            {/* Single Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-green-600 dark:text-gray-800">
                Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions or concerns about our privacy policy
                or how we handle your data, please contact us at:{" "}
                <a
                  href="mailto:connectaid@gmail.com"
                  className="text-green-600 hover:underline"
                >
                  connectaid@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Picture Gallery */}
      <Gallery />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
