"use client";

import { React } from "react";

import globalStyle from "../globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery";
import Breadcrumb from "../components/Breadcrumb";

import { motion } from "motion/react";

import Metadata from "../components/Metadata";

const TermsConditions = () => {
  const metadata = {
    title: "Terms & Conditions - ConnectAID Web Application",
    description:
      "ConnectAID is a charity application where seekers(those in need) of help can find and meet donors (those willing to help) in which they can gain valuable assistance.",
  };

  return (
    <main className="bg-[#f9f9f9]">
      <Metadata title={metadata.title} description={metadata.description} />

      {/* Navigation Bar | Header  */}
      <Navbar />

      {/* Breadcrumb for ABout Page */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0.1 }}
        className="w-full"
      >
        <Breadcrumb
          homeTitle="HOME"
          homeSlug="/"
          title="TERMS"
          description="TERMS & CONDITIONS"
          breadcrumAlt=" Hero Background Image"
          breadcrumbImage="/gallery/breadcrumb-1.png"
        />
      </motion.div>

      {/* Terms and Conditions Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to ConnectAID. These Terms and Conditions govern your
                  use of the ConnectAID web application and services provided
                  through our platform. ConnectAID is a charitable platform
                  designed to connect individuals seeking assistance ("Seekers")
                  with those willing to provide help ("Donors"). By accessing or
                  using our service, you agree to be bound by these Terms and
                  Conditions. If you disagree with any part of these terms, you
                  may not access the service.
                </p>
                <p className="text-gray-700 mb-4">
                  ConnectAID provides a platform for facilitating charitable
                  connections and does not itself provide direct aid or monetary
                  support. We act as an intermediary to help Seekers find
                  appropriate Donors and vice versa. The platform includes
                  features such as needs posting, donor matching, direct
                  messaging, and donation tracking to facilitate these
                  connections.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Communications</h2>
                <p className="text-gray-700 mb-4">
                  By creating an account with ConnectAID, you agree to receive
                  communications from us. These may include service
                  announcements, administrative messages, and optional
                  newsletters related to charitable activities and opportunities
                  that may be of interest to you.
                </p>
                <p className="text-gray-700">
                  You can opt out of non-essential communications at any time
                  through your account settings. However, you cannot opt out of
                  communications that are essential to providing our services,
                  such as verification emails, donation receipts, security
                  alerts, or updates to these Terms and Conditions.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Donations</h2>
                <p className="text-gray-700 mb-4">
                  When making a donation through ConnectAID, you may be asked to
                  supply certain information relevant to your donation including
                  but not limited to your credit or debit card number, the
                  expiration date of your card, your billing address, and other
                  personal information. You represent and warrant that: (i) you
                  have the legal right to use any payment method(s) in
                  connection with any donation; and that (ii) the information
                  you supply to us is true, correct, and complete.
                </p>
                <p className="text-gray-700 mb-4">
                  We employ secure third-party payment processors for the
                  purpose of facilitating donations. By submitting your payment
                  information, you grant us the right to provide the information
                  to these third parties subject to our Privacy Policy.
                  ConnectAID does not store or have direct access to your
                  complete payment information.
                </p>
                <p className="text-gray-700 mb-4">
                  We reserve the right to refuse or cancel your donation at any
                  time for reasons including but not limited to: suspected
                  fraud, technical issues, or violation of these Terms and
                  Conditions. ConnectAID is not responsible for errors or delays
                  in processing caused by payment processors, banking
                  institutions, or technical issues.
                </p>
                <p className="text-gray-700">
                  ConnectAID takes a small administrative fee (not exceeding 5%)
                  from donations made through our platform to maintain and
                  improve our services. This fee is clearly disclosed at the
                  time of donation, and the remainder of your donation is
                  directed to the intended recipient.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Campaigns and Promotions
                </h2>
                <p className="text-gray-700 mb-4">
                  Any charitable campaigns, fundraising events, or other
                  promotions (collectively, "Campaigns") made available through
                  ConnectAID may be governed by specific rules that are separate
                  from these Terms and Conditions. If you participate in any
                  Campaigns, please review the applicable rules as well as our
                  Privacy Policy.
                </p>
                <p className="text-gray-700">
                  ConnectAID may feature certain Campaigns prominently on our
                  platform. Such featuring does not constitute an endorsement of
                  the Campaign or guarantee of its legitimacy. We encourage
                  users to conduct their own due diligence before participating
                  in or donating to any Campaign.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Subscriptions</h2>
                <p className="text-gray-700 mb-4">
                  ConnectAID offers subscription plans for Donors who wish to
                  make recurring contributions. Subscriptions are billed in
                  advance on a recurring basis according to the frequency you
                  select (monthly, quarterly, or annually). You will be notified
                  of upcoming charges at least 5 days before billing.
                </p>
                <p className="text-gray-700 mb-4">
                  At the end of each billing cycle, your subscription will
                  automatically renew under the same conditions unless you
                  cancel it or ConnectAID cancels it. You may cancel your
                  subscription renewal through your account settings or by
                  contacting our support team, with at least 5 business days'
                  notice before the next billing date.
                </p>
                <p className="text-gray-700 mb-4">
                  A valid payment method is required to process subscription
                  payments. By submitting your payment information, you
                  authorize ConnectAID to charge all subscription fees to your
                  chosen payment method. Should automatic billing fail,
                  ConnectAID reserves the right to downgrade your account to
                  non-subscription status.
                </p>
                <p className="text-gray-700">
                  Subscription fees are non-refundable except in cases where
                  ConnectAID terminates the service unexpectedly. In such cases,
                  we will provide prorated refunds for the unused portion of
                  your subscription period.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
                <p className="text-gray-700 mb-4">
                  Due to the charitable nature of ConnectAID, most donations are
                  non-refundable once they have been processed and distributed
                  to recipients. However, we may issue refunds in the following
                  circumstances:
                </p>
                <p className="text-gray-700 mb-4">
                  1. If a technical error resulted in an unintended donation
                  amount
                </p>
                <p className="text-gray-700 mb-4">
                  2. If ConnectAID determines that a recipient has
                  misrepresented their needs or misused donation funds
                </p>
                <p className="text-gray-700 mb-4">
                  3. If a donation was made as a result of fraudulent activity
                </p>
                <p className="text-gray-700">
                  Refund requests must be submitted within 30 days of the
                  original donation. To request a refund, please contact our
                  support team with your donation details and reason for the
                  refund request. Each request will be reviewed individually,
                  and decisions will be made at ConnectAID's discretion.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Content</h2>
                <p className="text-gray-700 mb-4">
                  ConnectAID allows you to post, share, and otherwise make
                  available certain information, text, images, videos, or other
                  material ("Content"). As a user, you are solely responsible
                  for the Content that you post on or through our service,
                  including its legality, reliability, and appropriateness.
                </p>
                <p className="text-gray-700 mb-4">
                  By posting Content, you represent and warrant that: (i) the
                  Content is yours or you have the right to use and share it,
                  and (ii) your Content does not violate the privacy rights,
                  publicity rights, copyrights, or any other rights of any
                  person or entity. ConnectAID reserves the right to remove any
                  Content that violates these Terms or that we determine to be
                  harmful, offensive, or otherwise inappropriate.
                </p>
                <p className="text-gray-700 mb-4">
                  You retain ownership rights to your Content. However, by
                  posting Content, you grant ConnectAID a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify,
                  publish, and distribute your Content in connection with
                  providing and promoting our services. This license allows us
                  to display your needs or donation offers to potential matches,
                  use anonymized success stories for promotional purposes, and
                  improve our matching algorithms.
                </p>
                <p className="text-gray-700 mb-4">
                  ConnectAID has the right but not the obligation to monitor and
                  edit all Content provided by users. We take no responsibility
                  and assume no liability for Content posted by you or any third
                  party.
                </p>
                <p className="text-gray-700">
                  In addition, Content found on ConnectAID that is not
                  user-generated is the property of ConnectAID or used with
                  permission. You may not distribute, modify, transmit, reuse,
                  download, repost, copy, or use said Content, whether in whole
                  or in part, for commercial purposes or for personal gain,
                  without express advance written permission from us.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">
                  You may use ConnectAID only for lawful and ethical charitable
                  purposes. You agree not to use our service:
                </p>
                <p className="text-gray-700 mb-2">
                  1. In any way that violates any applicable local, national, or
                  international law or regulation.
                </p>
                <p className="text-gray-700 mb-2">
                  2. To exploit, harm, or expose minors to inappropriate
                  content.
                </p>
                <p className="text-gray-700 mb-2">
                  3. To send unsolicited communications, promotions, or
                  advertisements.
                </p>
                <p className="text-gray-700 mb-2">
                  4. To impersonate ConnectAID, a ConnectAID employee, another
                  user, or any other person or entity.
                </p>
                <p className="text-gray-700 mb-2">
                  5. To misrepresent your needs or ability to provide donations.
                </p>
                <p className="text-gray-700 mb-2">
                  6. To engage in any conduct that restricts or inhibits
                  anyone's use or enjoyment of ConnectAID.
                </p>
                <p className="text-gray-700 mb-2">
                  7. To use ConnectAID in any manner that could disable,
                  overburden, damage, or impair our service.
                </p>
                <p className="text-gray-700 mb-2">
                  8. To use any automated system to access ConnectAID without
                  our prior written consent.
                </p>
                <p className="text-gray-700 mb-2">
                  9. To monitor or copy any material on ConnectAID for
                  unauthorized purposes.
                </p>
                <p className="text-gray-700 mb-2">
                  10. To introduce malware, viruses, or other harmful code to
                  our platform.
                </p>
                <p className="text-gray-700 mb-2">
                  11. To attempt to gain unauthorized access to ConnectAID
                  systems or user accounts.
                </p>
                <p className="text-gray-700 mb-2">
                  12. To attack our service via a denial-of-service attack or
                  distributed denial-of-service attack.
                </p>
                <p className="text-gray-700 mb-2">
                  13. To falsify information about yourself, your organization,
                  or your charitable activities.
                </p>
                <p className="text-gray-700 mb-2">
                  14. To use ConnectAID for money laundering, fraud, or other
                  illegal financial activities.
                </p>
                <p className="text-gray-700">
                  15. To solicit financial support for political campaigns,
                  religious conversion efforts, or commercial enterprises.
                </p>
              </div>

              {/* Single Terms Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Copyright Policy
                </h2>
                <p className="text-gray-700 mb-4">
                  ConnectAID respects the intellectual property rights of others
                  and expects our users to do the same. It is our policy to
                  respond promptly to claims of intellectual property misuse on
                  our platform.
                </p>
                <p className="text-gray-700 mb-4">
                  If you believe that your work has been copied in a way that
                  constitutes copyright infringement, please submit a
                  notification to our copyright agent with the following
                  information: (i) an electronic or physical signature of the
                  person authorized to act on behalf of the copyright owner;
                  (ii) a description of the copyrighted work that you claim has
                  been infringed; (iii) a description of where the material that
                  you claim is infringing is located on ConnectAID; (iv) your
                  contact information; (v) a statement that you have a good
                  faith belief that the disputed use is not authorized by the
                  copyright owner; and (vi) a statement that the information in
                  your notification is accurate and that you are the copyright
                  owner or authorized to act on the copyright owner's behalf.
                </p>
                <p className="text-gray-700">
                  Copyright infringement notifications should be sent to
                  legal@connectaid.org with the subject line "Copyright
                  Infringement Notice." You may be held accountable for damages,
                  including costs and attorneys' fees, for misrepresenting that
                  material on ConnectAID infringes your copyright.
                </p>
              </div>

              {/* Single Terms Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Acknowledgement</h2>
                <p className="text-gray-700 mb-4">
                  BY USING CONNECTAID OR OTHER SERVICES PROVIDED BY US, YOU
                  ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND CONDITIONS AND
                  AGREE TO BE BOUND BY THEM. YOU ALSO ACKNOWLEDGE THAT THESE
                  TERMS AND CONDITIONS, TOGETHER WITH OUR PRIVACY POLICY,
                  REPRESENT THE COMPLETE AND EXCLUSIVE STATEMENT OF THE
                  AGREEMENT BETWEEN US.
                </p>
                <p className="text-gray-700">
                  ConnectAID reserves the right to modify these Terms and
                  Conditions at any time. We will notify users of significant
                  changes through the service or via email. Your continued use
                  of ConnectAID after such modifications constitutes your
                  acceptance of the revised Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Picture Gallery  */}
      <Gallery />

      {/* Footer  */}
      <Footer />
    </main>
  );
};

export default TermsConditions;
