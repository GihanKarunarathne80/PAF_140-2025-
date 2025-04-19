import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import planApi from "../../api/planApi";
import TopicForm from "./TopicForm";
import { validatePlanForm } from "../../utils/validation";

const PlanModal = ({ isOpen, onClose, plan }) => {
  const initialFormState = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isPublic: false,
    topics: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);

  // If plan is provided, we're in edit mode
  const isEditMode = Boolean(plan);

  useEffect(() => {
    if (plan) {
      const formattedStartDate = plan.startDate
        ? new Date(plan.startDate).toISOString().split("T")[0]
        : "";
      const formattedEndDate = plan.endDate
        ? new Date(plan.endDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: plan.title || "",
        description: plan.description || "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        isPublic: plan.isPublic || false,
        topics: plan.topics || [],
      });
    } else {
      setFormData(initialFormState);
    }
  }, [plan]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validatePlanForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format dates for API
      const apiData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
      };

      if (isEditMode) {
        await planApi.updatePlan(plan.id, apiData);
      } else {
        await planApi.createPlan(apiData);
      }

      onClose(true); // Close modal and refresh plan list
    } catch (error) {
      console.error("Error saving plan:", error);
      setErrors({ submit: "Failed to save plan. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTopic = () => {
    setSelectedTopicIndex(null);
    setShowTopicForm(true);
  };

  const handleEditTopic = (index) => {
    setSelectedTopicIndex(index);
    setShowTopicForm(true);
  };

  const handleRemoveTopic = (index) => {
    const updatedTopics = [...formData.topics];
    updatedTopics.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      topics: updatedTopics,
    }));
  };

  const handleTopicSave = (topicData) => {
    if (selectedTopicIndex !== null) {
      // Edit existing topic
      const updatedTopics = [...formData.topics];
      updatedTopics[selectedTopicIndex] = topicData;

      setFormData((prevData) => ({
        ...prevData,
        topics: updatedTopics,
      }));
    } else {
      // Add new topic
      setFormData((prevData) => ({
        ...prevData,
        topics: [...prevData.topics, topicData],
      }));
    }

    setShowTopicForm(false);
  };

  const handleTopicFormCancel = () => {
    setShowTopicForm(false);
    setSelectedTopicIndex(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Edit Learning Plan" : "Create Learning Plan"}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {showTopicForm ? (
          <TopicForm
            topic={
              selectedTopicIndex !== null
                ? formData.topics[selectedTopicIndex]
                : null
            }
            onSave={handleTopicSave}
            onCancel={handleTopicFormCancel}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-130px)]"
          >
            <div className="p-5 space-y-6">
              {errors.submit && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  {errors.submit}
                </div>
              )}

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Plan Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter plan title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
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
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe the plan's purpose and goals"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.startDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Visibility */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="isPublic"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Make this plan public
                </label>
              </div>

              {/* Topics Section */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Topics</h3>
                  <button
                    type="button"
                    onClick={handleAddTopic}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Add Topic
                  </button>
                </div>

                {formData.topics.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">
                      No topics yet. Add topics to your learning plan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start"
                      >
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {topic.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {topic.description}
                          </p>
                          {topic.deadlineDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Deadline:{" "}
                              {new Date(
                                topic.deadlineDate
                              ).toLocaleDateString()}
                            </p>
                          )}
                          {topic.resources && topic.resources.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {topic.resources.length} resource(s)
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditTopic(index)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTopic(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Plan"
                  : "Create Plan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlanModal;
