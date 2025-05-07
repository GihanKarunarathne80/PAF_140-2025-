import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import progressApi from "../../api/progressApi";
import { toast } from "react-toastify";

const UpdateProgressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    satisfactionLevel: "3", // Default value as string
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await progressApi.getProgressById(id);
        const data = res;
        setFormData({
          title: data.title || "",
          description: data.description || "",
          satisfactionLevel: data.satisfactionLevel?.toString() || "3",
        });
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch progress details");
        console.error(error);
        navigate("/"); // Redirect if fetch fails
      }
    };

    fetchProgress();
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.satisfactionLevel) {
      newErrors.satisfactionLevel =
        "Please select a satisfaction level between 1 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await progressApi.updateProgress(id, {
        ...formData,
        satisfactionLevel: parseInt(formData.satisfactionLevel),
      });
      toast.success("Progress updated successfully");
      navigate("/progresses");
    } catch (error) {
      toast.error("Failed to update progress");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Progress</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter progress title"
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your progress..."
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Satisfaction Level Dropdown */}
        <div>
          <label
            htmlFor="satisfactionLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Satisfaction Level
          </label>
          <select
            id="satisfactionLevel"
            name="satisfactionLevel"
            value={formData.satisfactionLevel}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.satisfactionLevel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a level</option>
            <option value="1">1 - Not Satisfied</option>
            <option value="2">2 - Slightly Satisfied</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Satisfied</option>
            <option value="5">5 - Very Satisfied</option>
          </select>
          {errors.satisfactionLevel && (
            <p className="text-sm text-red-600 mt-1">
              {errors.satisfactionLevel}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Progress
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProgressPage;
