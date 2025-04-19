import axiosInstance from "../utils/axiosConfig";
const currentUserId = localStorage.getItem("userId");
const reportApi = {
  // Report a post
  reportPost: async (postId, reason) => {
    try {
      const reporterId = localStorage.getItem("userId");
      const response = await axiosInstance.post(
        "/reports/post/" + postId + "/" + currentUserId,
        {
          postId,
          reason,
          reporterId,
        },
        {
          params: { reason },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error reporting post ${postId}:`, error);
      throw error;
    }
  },

  // Report a comment
  reportComment: async (commentId, reason) => {
    try {
      const reporterId = localStorage.getItem("userId");
      const response = await axiosInstance.post(
        "/reports/comment/" + commentId + "/" + currentUserId,
        {
          commentId,
          reason,
          reporterId,
        },
        {
          params: { reason },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error reporting comment ${commentId}:`, error);
      throw error;
    }
  },

  // Get all reports (admin only)
  getAllReports: async (page = 0, size = 20) => {
    try {
      const response = await axiosInstance.get(
        `/reports?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },

  // Get reports by type (POST or COMMENT)
  getReportsByType: async (type, page = 0, size = 20) => {
    try {
      const response = await axiosInstance.get(
        `/reports/type/${type}?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type} reports:`, error);
      throw error;
    }
  },

  // Resolve a report (admin only)
  resolveReport: async (reportId) => {
    try {
      const response = await axiosInstance.put(`/reports/${reportId}/resolve`);
      return response.data;
    } catch (error) {
      console.error(`Error resolving report ${reportId}:`, error);
      throw error;
    }
  },
};

export default reportApi;
