// "use client";

// import React, { useState } from "react";
// import { Save, ArrowLeft, CheckCircle } from "lucide-react";

// const About_User = ({ setActiveComponent }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     phoneNumber: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     bio: "",
//     interests: [],
//   });

//   const [errors, setErrors] = useState({});
//   const [saved, setSaved] = useState(false);

//   const interestOptions = [
//     "Education",
//     "Healthcare",
//     "Food Security",
//     "Disaster Relief",
//     "Children & Youth",
//     "Environment",
//     "Animal Welfare",
//     "Housing",
//     "Community Development",
//     "Arts & Culture",
//     "Human Rights",
//     "Veterans",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: null,
//       }));
//     }
//   };

//   const handleInterestChange = (interest) => {
//     setFormData((prevData) => {
//       if (prevData.interests.includes(interest)) {
//         return {
//           ...prevData,
//           interests: prevData.interests.filter((item) => item !== interest),
//         };
//       } else {
//         return {
//           ...prevData,
//           interests: [...prevData.interests, interest],
//         };
//       }
//     });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.dateOfBirth)
//       newErrors.dateOfBirth = "Date of birth is required";
//     if (!formData.phoneNumber.trim())
//       newErrors.phoneNumber = "Phone number is required";
//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.state.trim()) newErrors.state = "State/Province is required";
//     if (!formData.zipCode.trim())
//       newErrors.zipCode = "ZIP/Postal code is required";
//     if (!formData.country.trim()) newErrors.country = "Country is required";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Simulate saving data
//     setSaved(true);
//     setTimeout(() => {
//       setSaved(false);
//       // Navigate to next step
//       setActiveComponent("identity");
//     }, 2000);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-6">
//           <button
//             onClick={() => setActiveComponent("dashboardMain")}
//             className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="text-2xl font-bold text-slate-800">About You</h1>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//           <p className="text-gray-600 mb-6">
//             Please provide your personal information to help us better
//             understand who you are. This information will help us match you with
//             campaigns that align with your interests.
//           </p>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* First Name */}
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   First Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.firstName ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.firstName && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Last Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.lastName ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.lastName && (
//                   <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
//                 )}
//               </div>

//               {/* Date of Birth */}
//               <div>
//                 <label
//                   htmlFor="dateOfBirth"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Date of Birth *
//                 </label>
//                 <input
//                   type="date"
//                   id="dateOfBirth"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.dateOfBirth ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.dateOfBirth && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.dateOfBirth}
//                   </p>
//                 )}
//               </div>

//               {/* Gender */}
//               <div>
//                 <label
//                   htmlFor="gender"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Gender
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="non-binary">Non-binary</option>
//                   <option value="other">Other</option>
//                   <option value="prefer-not-to-say">Prefer not to say</option>
//                 </select>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label
//                   htmlFor="phoneNumber"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.phoneNumber ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.phoneNumber}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Address Section */}
//             <h2 className="text-lg font-medium text-slate-800 mb-4">
//               Address Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               {/* Street Address */}
//               <div className="md:col-span-2">
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Street Address *
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.address ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.address && (
//                   <p className="mt-1 text-sm text-red-500">{errors.address}</p>
//                 )}
//               </div>

//               {/* City */}
//               <div>
//                 <label
//                   htmlFor="city"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.city ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.city && (
//                   <p className="mt-1 text-sm text-red-500">{errors.city}</p>
//                 )}
//               </div>

//               {/* State/Province */}
//               <div>
//                 <label
//                   htmlFor="state"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   State/Province *
//                 </label>
//                 <input
//                   type="text"
//                   id="state"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.state ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.state && (
//                   <p className="mt-1 text-sm text-red-500">{errors.state}</p>
//                 )}
//               </div>

//               {/* ZIP/Postal Code */}
//               <div>
//                 <label
//                   htmlFor="zipCode"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   ZIP/Postal Code *
//                 </label>
//                 <input
//                   type="text"
//                   id="zipCode"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.zipCode ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.zipCode && (
//                   <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
//                 )}
//               </div>

//               {/* Country */}
//               <div>
//                 <label
//                   htmlFor="country"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Country *
//                 </label>
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className={`w-full border ${
//                     errors.country ? "border-red-500" : "border-gray-300"
//                   } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                 />
//                 {errors.country && (
//                   <p className="mt-1 text-sm text-red-500">{errors.country}</p>
//                 )}
//               </div>
//             </div>

//             {/* Bio */}
//             <div className="mb-6">
//               <label
//                 htmlFor="bio"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 About Yourself
//               </label>
//               <textarea
//                 id="bio"
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Tell us a bit about yourself and why you're interested in donating..."
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               ></textarea>
//             </div>

//             {/* Interests */}
//             <div className="mb-8">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Areas of Interest
//               </label>
//               <p className="text-sm text-gray-500 mb-3">
//                 Select causes you're interested in supporting:
//               </p>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {interestOptions.map((interest) => (
//                   <div key={interest} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`interest-${interest}`}
//                       checked={formData.interests.includes(interest)}
//                       onChange={() => handleInterestChange(interest)}
//                       className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor={`interest-${interest}`}
//                       className="ml-2 text-sm text-gray-700"
//                     >
//                       {interest}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
//                 disabled={saved}
//               >
//                 {saved ? (
//                   <>
//                     <CheckCircle size={18} className="mr-2" />
//                     Saved
//                   </>
//                 ) : (
//                   <>
//                     <Save size={18} className="mr-2" />
//                     Save & Continue
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About_User;



import React from 'react'

const About_User = () => {
  return (
    <div>About_User</div>
  )
}

export default About_User