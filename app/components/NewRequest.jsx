"use client";

import { useState, useRef } from "react";

import { Upload, CheckCircle } from "lucide-react";

const NewRequest = () => {
  const categories = [
    "Education",
    "Health",
    "Environment",
    "Community Service",
    "Arts & Culture",
  ];

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    date: "",
    category: "",
    goals: "",
    location: "",
    contact: "",
    description: "",
    requirements: "",
  });

  const [ImageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(true);

  // Inout Refs
  const titleRef = useRef();

  const onMouseEnterTitleRef = () => {
    titleRef.current.focus();
  };

  const dateRef = useRef();

  const onMouseEnterDateRef = () => {
    dateRef.current.focus();
  };

  const categoryRef = useRef();

  const onMouseEnterCategoryRef = () => {
    categoryRef.current.focus();
  };

  const goalsRef = useRef();

  const onMouseEnterGoalsRef = () => {
    goalsRef.current.focus();
  };

  const locationRef = useRef();

  const onMouseEnterLocationRef = () => {
    locationRef.current.focus();
  };

  const emailRef = useRef();

  const onMouseEnterEmailRef = () => {
    emailRef.current.focus();
  };

  const descriptionRef = useRef();

  const onMouseEnterDescriptionRef = () => {
    descriptionRef.current.focus();
  };

  const requirementRef = useRef();

  const onMouseEnterRequirementRef = () => {
    requirementRef.current.focus();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({
      ...newCampaign,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];

    // Validate image file
    if (file) {
      // Check file type
      if (!file.type.match("image.*")) {
        setErrors({
          ...errors,
          ImageFile: "Please upload an image file (PNG, JPG)",
        });
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          ImageFile: "Image size should be less than 5MB",
        });
        return;
      }

      setImageFile(file);

      setErrors({
        ...errors,
        ImageFile: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!newCampaign.title.trim()) {
      newErrors.title = "Title is required";
    } else if (newCampaign.title.trim().length < 5) {
      newErrors.title = "Title should be at least 5 letter";
    } else if (newCampaign.title.trim().length > 20) {
      newErrors.title = "Title should be less than 20 letter";
    }

    if (!newCampaign.date) {
      newErrors.date = "Date is required";
    } else {
      // Check if date is in the past
      const selectedDate = new Date(newCampaign.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }

    if (!newCampaign.category) {
      newErrors.category = "Please select a category";
    } 

    if (!newCampaign.goals.trim()) {
      newErrors.goals = "Campaign goals are required";
    } else if (newCampaign.goals.trim().length < 2) {
      newErrors.goals = "Campaign Goals should be at least 2 letter";
    } else if (newCampaign.goals.trim().length > 35) {
      newErrors.goals = "Campaign Goals  should be less than 35 letter";
    }

    if (!newCampaign.location.trim()) {
      newErrors.location = "Location is required";
    } else if (newCampaign.location.trim().length < 9) {
      newErrors.location = "Campaign location should be at least 9 letter";
    } else if (newCampaign.location.trim().length > 30) {
      newErrors.location = "Campaign location  should be less than 30 letter"; 
    }

    if (!newCampaign.contact.trim()) {
      newErrors.contact = "Contact email is required";
    } else {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newCampaign.contact)) {
        newErrors.contact = "Please enter a valid email address";
      }
    }

    if (!newCampaign.description.trim()) {
      newErrors.description = "Description is required";
    } else if (newCampaign.description.trim().length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    if (!newCampaign.requirements.trim()) {
      newErrors.requirements = "Requirements is required";
    } else if (newCampaign.requirements.trim().length < 20) {
      newErrors.requirements = "Requirements should be at least 20 characters";
    }

    // Image validation
    if (!ImageFile) {
      newErrors.ImageFile = "Please upload an image"; 
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", newCampaign);
      console.log("Image:", ImageFile);

      setNewCampaign({
        title: "",
        date: "",
        category: "",
        goals: "",
        location: "",
        contact: "",
        description: "",
        requirements: "",
      });
      setImageFile(null);
      alert("Campaign created successfully!");
    } else {
      const errorFields = Object.keys(errors);
      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0];
        if (firstErrorField === "title" && titleRef.current)
          titleRef.current.focus();
        else if (firstErrorField === "date" && dateRef.current)
          dateRef.current.focus();
        else if (firstErrorField === "category" && categoryRef.current)
          categoryRef.current.focus();
        else if (firstErrorField === "goals" && goalsRef.current)
          goalsRef.current.focus();
        else if (firstErrorField === "location" && locationRef.current)
          locationRef.current.focus();
        else if (firstErrorField === "contact" && emailRef.current)
          emailRef.current.focus();
        else if (firstErrorField === "description" && descriptionRef.current)
          descriptionRef.current.focus();
        else if (firstErrorField === "requirements" && requirementRef.current)
          requirementRef.current.focus();
      }
    }
  };

  if (!showForm) {
    return (
      <div className="flex justify-center my-8">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New Campaign
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Upload Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md font-medium bg-white text-teal-600 hover:text-teal-500 dark:bg-gray-800 dark:text-teal-400 dark:hover:text-teal-300 focus-within:outline-none"
              >
                <span>Upload an Image of Current Situation</span>
                <input
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleSelfieUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
          </div>
        </div>
        {ImageFile && (
          <div className="mt-2">
            <p className="text-sm text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Image uploaded: {ImageFile.name}
            </p>
          </div>
        )}
        {errors.ImageFile && (
          <p className="mt-2 text-sm text-red-600">{errors.ImageFile}</p>
        )}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-300 dark:font-medium dark:text-opacity-90">
          Please ensure your image is clearly visible, and well-lit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newCampaign.title}
            onChange={handleInputChange}
            ref={titleRef}
            onMouseEnter={onMouseEnterTitleRef}
            className={`w-full p-2 border rounded-md dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white ease-in-out mt-1 transition-all ${
              errors.title
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={newCampaign.date}
            onChange={handleInputChange}
            ref={dateRef}
            onMouseEnter={onMouseEnterDateRef}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all ${
              errors.date
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={newCampaign.category}
            onChange={handleInputChange}
            ref={categoryRef}
            onMouseEnter={onMouseEnterCategoryRef}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all ${
              errors.category
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Campaign Goals
          </label>
          <input
            type="text"
            name="goals"
            placeholder="Campaign Goals"
            value={newCampaign.goals}
            onChange={handleInputChange}
            ref={goalsRef}
            onMouseEnter={onMouseEnterGoalsRef}
            className={`w-full p-2 border rounded-md dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
              errors.goals
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.goals && (
            <p className="mt-1 text-sm text-red-600">{errors.goals}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Campaign Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Campaign Location"
            value={newCampaign.location}
            ref={locationRef}
            onMouseEnter={onMouseEnterLocationRef}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${
              errors.location
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="contact"
            value={newCampaign.contact}
            ref={emailRef}
            onMouseEnter={onMouseEnterEmailRef}
            onChange={handleInputChange}
            placeholder="Your Email Address"
            className={`w-full p-2 border rounded-md focus:outline-none dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all ${
              errors.contact
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.contact && (
            <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={newCampaign.description}
          onChange={handleInputChange}
          ref={descriptionRef}
          onMouseEnter={onMouseEnterDescriptionRef}
          placeholder="Campaign Description"
          rows="4"
          className={`w-full p-2 border rounded-md dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all ${
            errors.description
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Requirements
        </label>
        <textarea
          name="requirements"
          ref={requirementRef}
          onMouseEnter={onMouseEnterRequirementRef}
          value={newCampaign.requirements}
          onChange={handleInputChange}
          rows="3"
          placeholder="Campaign Specific Requirement"
          className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 ease-in-out mt-1 transition-all
            ${ 
              errors.requirements
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
        ></textarea>
          {errors.requirements && (
          <p className="mt-1 text-sm text-red-600">{errors.requirements}</p> 
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Campaign
        </button>
      </div>
    </div>
  );
};

export default NewRequest;
