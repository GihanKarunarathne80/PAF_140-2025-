import axiosInstance from "../utils/axiosConfig";

const progressApi = {
  // Get all progresses
  getAllProgresses: async () => {
    try {
      const response = await axiosInstance.get("/progresses");
      return response.data;
    } catch (error) {
      console.error("Error fetching all progresses:", error);
      throw error;
    }
  },

  // Get progresses by user ID
  getProgressesByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`/progresses/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching progresses for user ${userId}:`, error);
      throw error;
    }
  },

  // Get progress by ID
  getProgressById: async (progressId) => {
    try {
      const response = await axiosInstance.get(`/progresses/${progressId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching progress with ID ${progressId}:`, error);
      throw error;
    }
  },

  // Create progress
  createProgress: async (userId, progressData) => {
    try {
      const response = await axiosInstance.post(`/progresses/${userId}`, {
        title: progressData.title,
        description: progressData.description,
        isArchived: progressData.isArchived || false,
        satisfactionLevel: progressData.satisfactionLevel || 3,
        userId: userId,
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating progress for user ${userId}:`, error);
      throw error;
    }
  },

  // Update progress
  updateProgress: async (progressId, progressData) => {
    try {
      const response = await axiosInstance.put(`/progresses/${progressId}`, {
        title: progressData.title,
        description: progressData.description,
        isArchived: progressData.isArchived,
        satisfactionLevel: progressData.satisfactionLevel,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating progress with ID ${progressId}:`, error);
      throw error;
    }
  },

  // Delete progress
  deleteProgress: async (progressId) => {
    try {
      const response = await axiosInstance.delete(`/progresses/${progressId}`);
      return response.status === 204;
    } catch (error) {
      console.error(`Error deleting progress with ID ${progressId}:`, error);
      throw error;
    }
  },

  // Archive progress
  archiveProgress: async (progressId) => {
    try {
      const response = await axiosInstance.patch(
        `/progresses/${progressId}/archive`,
        {
          isArchived: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error archiving progress with ID ${progressId}:`, error);
      throw error;
    }
  },

  // Unarchive progress
  unarchiveProgress: async (progressId) => {
    try {
      const response = await axiosInstance.patch(
        `/progresses/${progressId}/archive`,
        {
          isArchived: false,
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error unarchiving progress with ID ${progressId}:`, error);
      throw error;
    }
  },
};

export default progressApi;
