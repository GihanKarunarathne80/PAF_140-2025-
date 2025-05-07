import React, { useState, useEffect } from "react";
import { validateResourceForm } from "../../utils/validation";

const ResourceForm = ({ resource, onSave, onCancel }) => {
  const initialFormState = {
    name: "",
    url: "",
    type: "article", // Default type
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Resource types
  const resourceTypes = [
    { value: "article", label: "Article" },
    { value: "video", label: "Video" },
    { value: "book", label: "Book" },
    { value: "course", label: "Course" },
    { value: "tutorial", label: "Tutorial" },
    { value: "documentation", label: "Documentation" },
    { value: "other", label: "Other" },
  ];

  // If resource is provided, we're in edit mode
  const isEditMode = Boolean(resource);

  useEffect(() => {
    if (resource) {
      setFormData({
        name: resource.name || "",
        url: resource.url || "",
        type: resource.type || "article",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [resource]);

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
    const validationErrors = validateResourceForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        {isEditMode ? "Edit Resource" : "Add Learning Resource"}
      </h3>

      {/* Resource Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Resource Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="E.g., 'Introduction to React Hooks'"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Resource URL */}
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          URL *
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.url ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="https://example.com/resource"
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-500">{errors.url}</p>
        )}
      </div>

      {/* Resource Type */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Type *
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          {resourceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4 flex justify-end gap-3">
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
          {isEditMode ? "Update Resource" : "Add Resource"}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
