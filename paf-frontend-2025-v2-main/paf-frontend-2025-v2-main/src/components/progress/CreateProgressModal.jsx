import React, { useState } from "react";
import progressApi from "../../api/progressApi";
import { toast } from "react-toastify";

const CreateProgressPage = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    satisfactionLevel: 3,
    isArchived: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation patterns
  const validationPatterns = {
    title: /^[a-zA-Z0-9\s.,!?-]{5,50}$/,
    description: /^[a-zA-Z0-9\s.,!?-]{10,500}$/,
    satisfactionLevel: /^[1-5]$/,
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.match(validationPatterns.title)) {
      newErrors.title =
        "Title must be 5-50 characters (letters, numbers, spaces, or basic punctuation)";
    }

    if (!formData.description.match(validationPatterns.description)) {
      newErrors.description = "Description must be 10-500 characters";
    }

    if (
      !formData.satisfactionLevel
        .toString()
        .match(validationPatterns.satisfactionLevel)
    ) {
      newErrors.satisfactionLevel =
        "Please select a satisfaction level between 1-5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await progressApi.createProgress(userId, formData);
      toast.success("Progress created successfully!");

      setFormData({
        title: "",
        description: "",
        satisfactionLevel: 3,
        isArchived: false,
      });
    } catch (error) {
      toast.error("Failed to create progress");
      console.error("Error creating progress:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2
        id="create-progress-title"
        className="text-2xl font-bold text-gray-800 mb-6"
      >
        Create New Progress
      </h2>

      <form id="create-progress-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Enter progress title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="Describe your progress..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="satisfactionLevel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Satisfaction Level (1-5) *
          </label>
          <select
            id="satisfactionLevel"
            name="satisfactionLevel"
            value={formData.satisfactionLevel}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.satisfactionLevel
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
          >
            <option value="1">1 - Not Satisfied</option>
            <option value="2">2 - Slightly Satisfied</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Satisfied</option>
            <option value="5">5 - Very Satisfied</option>
          </select>
          {errors.satisfactionLevel && (
            <p className="mt-1 text-sm text-red-600">
              {errors.satisfactionLevel}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isArchived"
              name="isArchived"
              checked={formData.isArchived}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isArchived"
              className="ml-2 block text-sm text-gray-700"
            >
              Archive this progress
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {}}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Progress"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgressPage;
