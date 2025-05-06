// Form validation utility functions

/**
 * Validates a plan form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Validation errors
 */
export const validatePlanForm = (formData) => {
  const errors = {};

  // Title validation
  if (!formData.title) {
    errors.title = "Title is required";
  } else if (formData.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (formData.title.length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  } else if (!/^[a-zA-Z0-9\s\-_.,!?()]+$/.test(formData.title)) {
    errors.title = "Title contains invalid characters";
  }

  // Description validation
  if (!formData.description) {
    errors.description = "Description is required";
  } else if (formData.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (formData.description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  // Start date validation
  if (!formData.startDate) {
    errors.startDate = "Start date is required";
  }

  // End date validation
  if (!formData.endDate) {
    errors.endDate = "End date is required";
  } else if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      errors.endDate = "End date must be after start date";
    }
  }

  return errors;
};

/**
 * Validates a topic form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Validation errors
 */
export const validateTopicForm = (formData) => {
  const errors = {};

  // Title validation
  if (!formData.title) {
    errors.title = "Title is required";
  } else if (formData.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (formData.title.length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  } else if (!/^[a-zA-Z0-9\s\-_.,!?()]+$/.test(formData.title)) {
    errors.title = "Title contains invalid characters";
  }

  // Description validation
  if (!formData.description) {
    errors.description = "Description is required";
  } else if (formData.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (formData.description.length > 300) {
    errors.description = "Description cannot exceed 300 characters";
  }

  // Deadline date validation (optional field)
  if (formData.deadlineDate) {
    const deadline = new Date(formData.deadlineDate);
    if (isNaN(deadline.getTime())) {
      errors.deadlineDate = "Invalid date format";
    }
  }

  return errors;
};

/**
 * Validates a resource form
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Validation errors
 */
export const validateResourceForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name) {
    errors.name = "Name is required";
  } else if (formData.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (formData.name.length > 100) {
    errors.name = "Name cannot exceed 100 characters";
  }

  // URL validation
  if (!formData.url) {
    errors.url = "URL is required";
  } else {
    // Basic URL validation using regex
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(formData.url)) {
      errors.url = "Please enter a valid URL";
    }
  }

  // Type validation - assuming it's always selected from dropdown
  if (!formData.type) {
    errors.type = "Resource type is required";
  }

  return errors;
};
