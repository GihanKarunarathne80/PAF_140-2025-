import React, { useState, useEffect } from "react";
import { validateTopicForm } from "../../utils/validation";
import ResourceForm from "./ResourceForm";

const TopicForm = ({ topic, onSave, onCancel }) => {
  const initialFormState = {
    title: "",
    description: "",
    deadlineDate: "",
    resources: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [selectedResourceIndex, setSelectedResourceIndex] = useState(null);

  // If topic is provided, we're in edit mode
  const isEditMode = Boolean(topic);

  useEffect(() => {
    if (topic) {
      const formattedDeadlineDate = topic.deadlineDate
        ? new Date(topic.deadlineDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: topic.title || "",
        description: topic.description || "",
        deadlineDate: formattedDeadlineDate,
        resources: topic.resources || [],
      });
    } else {
      setFormData(initialFormState);
    }
  }, [topic]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateTopicForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Format dates for API
    const apiData = {
      ...formData,
      deadlineDate: formData.deadlineDate
        ? new Date(formData.deadlineDate)
        : null,
    };

    onSave(apiData);
  };

  const handleAddResource = () => {
    setSelectedResourceIndex(null);
    setShowResourceForm(true);
  };

  const handleEditResource = (index) => {
    setSelectedResourceIndex(index);
    setShowResourceForm(true);
  };

  const handleRemoveResource = (index) => {
    const updatedResources = [...formData.resources];
    updatedResources.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      resources: updatedResources,
    }));
  };

  const handleResourceSave = (resourceData) => {
    if (selectedResourceIndex !== null) {
      // Edit existing resource
      const updatedResources = [...formData.resources];
      updatedResources[selectedResourceIndex] = resourceData;

      setFormData((prevData) => ({
        ...prevData,
        resources: updatedResources,
      }));
    } else {
      // Add new resource
      setFormData((prevData) => ({
        ...prevData,
        resources: [...prevData.resources, resourceData],
      }));
    }

    setShowResourceForm(false);
  };

  const handleResourceFormCancel = () => {
    setShowResourceForm(false);
    setSelectedResourceIndex(null);
  };

  if (showResourceForm) {
    return (
      <ResourceForm
        resource={
          selectedResourceIndex !== null
            ? formData.resources[selectedResourceIndex]
            : null
        }
        onSave={handleResourceSave}
        onCancel={handleResourceFormCancel}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-y-auto max-h-[calc(90vh-130px)]"
    >
      <div className="p-5 space-y-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {isEditMode ? "Edit Topic" : "Add New Topic"}
        </h3>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Topic Title *
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
            placeholder="Enter topic title"
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
            rows="3"
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Describe what you'll learn in this topic"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Deadline Date */}
        <div>
          <label
            htmlFor="deadlineDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Deadline Date (Optional)
          </label>
          <input
            type="date"
            id="deadlineDate"
            name="deadlineDate"
            value={formData.deadlineDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Resources Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-md font-medium text-gray-800">Resources</h4>
            <button
              type="button"
              onClick={handleAddResource}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Add Resource
            </button>
          </div>

          {formData.resources.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">
                No resources yet. Add learning materials for this topic.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.resources.map((resource, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start"
                >
                  <div>
                    <h5 className="font-medium text-gray-800">
                      {resource.name}
                    </h5>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm break-all"
                    >
                      {resource.url}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {resource.type}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditResource(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveResource(index)}
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
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEditMode ? "Update Topic" : "Add Topic"}
        </button>
      </div>
    </form>
  );
};

export default TopicForm;
