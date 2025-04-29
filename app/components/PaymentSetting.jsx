// "use client";
// import React, { useState } from "react";
// import {
//   CreditCard,
//   Trash2,
//   Plus,
//   Edit,
//   Check,
//   Shield,
//   AlertCircle,
// } from "lucide-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCcVisa,
//   faCcMastercard,
//   faCcAmex,
//   faCcPaypal,
// } from "@fortawesome/free-brands-svg-icons";

// const PaymentSetting = ({ setActiveComponent }) => {
//   const [paymentMethods, setPaymentMethods] = useState([
//     {
//       id: 1,
//       type: "credit",
//       brand: "visa",
//       name: "John Doe",
//       number: "**** **** **** 4123",
//       expiry: "09/26",
//       isDefault: true,
//     },
//     {
//       id: 2,
//       type: "credit",
//       brand: "mastercard",
//       name: "John Doe",
//       number: "**** **** **** 8765",
//       expiry: "12/25",
//       isDefault: false,
//     },
//     {
//       id: 3,
//       type: "paypal",
//       email: "john.doe@example.com",
//       isDefault: false,
//     },
//   ]);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     cardNumber: "",
//     cardName: "",
//     expiry: "",
//     cvv: "",
//     setDefault: false,
//   });
//   const [activeTab, setActiveTab] = useState("payment-methods");
//   const [processing, setProcessing] = useState(false);
//   const [notification, setNotification] = useState(null);

//   // ... (rest of the component's code)

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-slate-800 mb-2">
//           Payment Settings
//         </h1>
//         <p className="text-slate-600">
//           Manage your payment methods and donation preferences
//         </p>
//       </div>

//       {/* Notification */}
//       {notification && (
//         <div
//           className={`mb-6 p-4 rounded-lg flex items-center ${
//             notification.type === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {notification.type === "success" ? (
//             <Check className="h-5 w-5 mr-2" />
//           ) : (
//             <AlertCircle className="h-5 w-5 mr-2" />
//           )}
//           {notification.message}
//         </div>
//       )}

//       {/* Tabs */}
//       <div className="flex border-b mb-6">
//         <button
//           onClick={() => setActiveTab("payment-methods")}
//           className={`py-3 px-4 font-medium ${
//             activeTab === "payment-methods"
//               ? "text-teal-500 border-b-2 border-teal-500"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Payment Methods
//         </button>
//         <button
//           onClick={() => setActiveTab("donation-preferences")}
//           className={`py-3 px-4 font-medium ${
//             activeTab === "donation-preferences"
//               ? "text-teal-500 border-b-2 border-teal-500"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Donation Preferences
//         </button>
//         <button
//           onClick={() => setActiveTab("billing-history")}
//           className={`py-3 px-4 font-medium ${
//             activeTab === "billing-history"
//               ? "text-teal-500 border-b-2 border-teal-500"
//               : "text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           Billing History
//         </button>
//       </div>

//       {/* Payment Methods Tab */}
//       {activeTab === "payment-methods" && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-slate-800">
//               Your Payment Methods
//             </h2>
//             <button
//               onClick={() => setShowAddForm(!showAddForm)}
//               className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
//                 showAddForm
//                   ? "bg-gray-200 text-gray-700"
//                   : "bg-teal-500 text-white hover:bg-teal-600"
//               }`}
//             >
//               {showAddForm ? (
//                 <>
//                   <Trash2 size={18} className="mr-2" />
//                   Cancel
//                 </>
//               ) : (
//                 <>
//                   <Plus size={18} className="mr-2" />
//                   Add New
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Add Payment Method Form */}
//           {showAddForm && (
//             <div className="mb-8 p-4 border border-gray-200 rounded-lg">
//               <h3 className="text-lg font-medium text-slate-800 mb-4">
//                 Add New Payment Method
//               </h3>
//               <form onSubmit={handleSubmit}>{/* ... (form fields) */}</form>
//             </div>
//           )}

//           {/* Saved Payment Methods List */}
//           {paymentMethods.length > 0 ? (
//             <div className="space-y-4">
//               {paymentMethods.map((method) => (
//                 <div
//                   key={method.id}
//                   className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg"
//                 >
//                   <div className="flex items-center mb-4 md:mb-0">
//                     <div className="mr-4">{getCardIcon(method.brand)}</div>
//                     <div>{/* ... (payment method details) */}</div>
//                   </div>
//                   <div className="flex gap-2">
//                     {/* ... (set default and remove buttons) */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
//               <p className="text-gray-600 mb-4">
//                 You don't have any payment methods saved yet.
//               </p>
//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
//               >
//                 Add Payment Method
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Donation Preferences Tab */}
//       {activeTab === "donation-preferences" && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-6">
//             Donation Preferences
//           </h2>

//           {/* ... (donation preferences form) */}
//         </div>
//       )}

//       {/* Billing History Tab */}
//       {activeTab === "billing-history" && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-6">
//             Donation History
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Date
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Campaign
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Amount
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Payment Method
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Receipt
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     Apr 15, 2025
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     Clean Water Initiative
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     $250.00
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     Visa •••
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <a
//                       href="#"
//                       className="text-teal-500 hover:text-teal-600 transition-colors"
//                     >
//                       View
//                     </a>
//                   </td>
//                 </tr>
//                 {/* ... (more donation history rows) */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentSetting;



import React from 'react'

const PaymentSetting = () => {
  return (
    <div>PaymentSetting</div>
  )
}

export default PaymentSetting