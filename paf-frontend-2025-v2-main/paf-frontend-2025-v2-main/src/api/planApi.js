import axiosInstance from "../utils/axiosConfig";

const planApi = {
  // Get all plans
  getAllPlans: async () => {
    try {
      const response = await axiosInstance.get("/plans");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      throw error;
    }
  },

  // Get all public plans
  getAllPublicPlans: async () => {
    try {
      const response = await axiosInstance.get("/plans/public");
      return response.data;
    } catch (error) {
      console.error("Error fetching public plans:", error);
      throw error;
    }
  },

  // Get plan by ID
  getPlanById: async (id) => {
    try {
      const response = await axiosInstance.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching plan with ID ${id}:`, error);
      throw error;
    }
  },

  // Get plans by user ID
  getPlansByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/plans/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching plans for user ${userId}:`, error);
      throw error;
    }
  },

  // Get public plans by user ID
  getPublicPlansByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/plans/user/${userId}/public`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching public plans for user ${userId}:`, error);
      throw error;
    }
  },

  // Create plan
  createPlan: async (planData) => {
    try {
      // Set the current user as the plan owner
      const planWithUser = {
        ...planData,
        userId: localStorage.getItem("userId"),
      };

      const response = await axiosInstance.post("/plans", planWithUser);
      return response.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      throw error;
    }
  },

  // Update plan
  updatePlan: async (id, planData) => {
    try {
      const response = await axiosInstance.put(`/plans/${id}`, planData);
      return response.data;
    } catch (error) {
      console.error(`Error updating plan with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete plan
  deletePlan: async (id) => {
    try {
      const response = await axiosInstance.delete(`/plans/${id}`);
      return response.status === 204;
    } catch (error) {
      console.error(`Error deleting plan with ID ${id}:`, error);
      throw error;
    }
  },

  // Search plans by title
  searchPlansByTitle: async (keyword) => {
    try {
      const response = await axiosInstance.get(
        `/plans/search?keyword=${encodeURIComponent(keyword)}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error searching plans with keyword ${keyword}:`, error);
      throw error;
    }
  },

  // Add topic to plan
  addTopicToPlan: async (planId, topicData) => {
    try {
      // First get the current plan
      const plan = await planApi.getPlanById(planId);

      // Add the new topic to the topics array
      const updatedPlan = {
        ...plan,
        topics: [...(plan.topics || []), topicData],
      };

      // Update the plan with the new topic
      return await planApi.updatePlan(planId, updatedPlan);
    } catch (error) {
      console.error(`Error adding topic to plan ${planId}:`, error);
      throw error;
    }
  },

  // Remove topic from plan
  removeTopicFromPlan: async (planId, topicIndex) => {
    try {
      // First get the current plan
      const plan = await planApi.getPlanById(planId);

      // Filter out the topic by index
      const updatedTopics = plan.topics.filter(
        (_, index) => index !== topicIndex
      );

      // Update the plan with the filtered topics
      const updatedPlan = {
        ...plan,
        topics: updatedTopics,
      };

      return await planApi.updatePlan(planId, updatedPlan);
    } catch (error) {
      console.error(`Error removing topic from plan ${planId}:`, error);
      throw error;
    }
  },

  // Add resource to topic
  addResourceToTopic: async (planId, topicIndex, resourceData) => {
    try {
      // First get the current plan
      const plan = await planApi.getPlanById(planId);

      // Make a copy of the plan
      const updatedPlan = { ...plan };

      // Add the resource to the specified topic
      const topic = updatedPlan.topics[topicIndex];
      if (!topic.resources) {
        topic.resources = [];
      }
      topic.resources.push(resourceData);

      // Update the plan
      return await planApi.updatePlan(planId, updatedPlan);
    } catch (error) {
      console.error(`Error adding resource to topic in plan ${planId}:`, error);
      throw error;
    }
  },
};

export default planApi;
