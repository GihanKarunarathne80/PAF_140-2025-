import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  BookOpen,
  Edit,
  Trash2,
  ArrowLeft,
  Plus,
  ExternalLink,
  Lock,
  Eye,
} from "lucide-react";

import TopicModal from "../components/plans/TopicModal";
import ResourceModal from "../components/plans/ResourceModal";

import planApi from "../api/planApi";
import LoadingSpinner from "../components/common/LoadingSpinner";

const PlanDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [selectedResourceData, setSelectedResourceData] = useState(null);

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const data = await planApi.getPlanById(id);
      setPlan(data);
      setError(null);
    } catch (err) {
      setError("Failed to load plan details. Please try again later.");
      console.error("Error fetching plan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPlans = () => {
    navigate("/plans");
  };

  const handleEditPlan = () => {
    navigate(`/plans/edit/${id}`);
  };

  const handleDeletePlan = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this plan? This action cannot be undone."
      )
    ) {
      try {
        await planApi.deletePlan(id);
        navigate("/plans", { replace: true });
      } catch (err) {
        setError("Failed to delete plan. Please try again.");
        console.error("Error deleting plan:", err);
      }
    }
  };

  const handleAddTopic = () => {
    setSelectedTopic(null);
    setSelectedTopicIndex(null);
    setIsTopicModalOpen(true);
  };

  const handleEditTopic = (topic, index) => {
    setSelectedTopic(topic);
    setSelectedTopicIndex(index);
    setIsTopicModalOpen(true);
  };

  const handleRemoveTopic = async (index) => {
    if (window.confirm("Are you sure you want to remove this topic?")) {
      try {
        await planApi.removeTopicFromPlan(id, index);
        fetchPlan();
      } catch (err) {
        setError("Failed to remove topic. Please try again!.");
        console.error("Error removing topic:", err);
      }
    }
  };

  const handleAddResource = (topicIndex) => {
    setSelectedResourceData({ topicIndex, resource: null });
    setIsResourceModalOpen(true);
  };

  const handleEditResource = (topicIndex, resource, resourceIndex) => {
    setSelectedResourceData({ topicIndex, resource, resourceIndex });
    setIsResourceModalOpen(true);
  };

  const handleRemoveResource = async (topicIndex, resourceIndex) => {
    if (window.confirm("Are you sure you want to remove this resource?")) {
      try {
        // Get the current plan
        const currentPlan = { ...plan };

        // Remove the resource
        const topic = currentPlan.topics[topicIndex];
        topic.resources.splice(resourceIndex, 1);

        // Update the plan
        await planApi.updatePlan(id, currentPlan);
        fetchPlan();
      } catch (err) {
        setError("Failed to remove resource. Please try again.");
        console.error("Error removing resource:", err);
      }
    }
  };

  const handleTopicSave = async (topicData) => {
    try {
      if (selectedTopicIndex !== null) {
        // Edit existing topic
        const updatedPlan = { ...plan };
        updatedPlan.topics[selectedTopicIndex] = topicData;

        await planApi.updatePlan(id, updatedPlan);
      } else {
        // Add new topic
        await planApi.addTopicToPlan(id, topicData);
      }

      fetchPlan();
      setIsTopicModalOpen(false);
    } catch (err) {
      setError("Failed to save topic. Please try again.");
      console.error("Error saving topic:", err);
    }
  };

  const handleResourceSave = async (resourceData) => {
    try {
      const { topicIndex, resourceIndex } = selectedResourceData;

      if (resourceIndex !== undefined) {
        // Edit existing resource
        const updatedPlan = { ...plan };
        updatedPlan.topics[topicIndex].resources[resourceIndex] = resourceData;

        await planApi.updatePlan(id, updatedPlan);
      } else {
        // Add new resource
        await planApi.addResourceToTopic(id, topicIndex, resourceData);
      }

      fetchPlan();
      setIsResourceModalOpen(false);
    } catch (err) {
      setError("Failed to save resource. Please try again.");
      console.error("Error saving resource:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center py-8">
          {error}
          <button
            onClick={handleBackToPlans}
            className="block mx-auto mt-4 text-blue-600 hover:underline"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p>Plan not found.</p>
          <button
            onClick={handleBackToPlans}
            className="block mx-auto mt-4 text-blue-600 hover:underline"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBackToPlans}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Plans</span>
        </button>
      </div>

      {/* Plan header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{plan.title}</h1>
              {plan.isPublic ? (
                <Eye size={20} className="text-gray-500" />
              ) : (
                <Lock size={20} className="text-gray-500" />
              )}
            </div>
            <p className="text-gray-600 mb-4">{plan.description}</p>

            <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>
                  {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen size={18} className="mr-2" />
                <span>{plan.topics ? plan.topics.length : 0} topics</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>
                  Created by {plan.owner ? plan.owner.name : "Unknown"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleEditPlan}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={handleDeletePlan}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Topics section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Topics</h2>
          <button
            onClick={handleAddTopic}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition"
          >
            <Plus size={18} />
            <span>Add Topic</span>
          </button>
        </div>

        {plan.topics && plan.topics.length > 0 ? (
          <div className="space-y-6">
            {plan.topics.map((topic, topicIndex) => (
              <div
                key={topicIndex}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                {/* Topic header */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {topic.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{topic.description}</p>
                      {topic.deadlineDate && (
                        <div className="text-sm text-gray-500 mt-2 flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            Deadline: {formatDate(topic.deadlineDate)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditTopic(topic, topicIndex)}
                        className="text-gray-600 hover:text-blue-600 p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveTopic(topicIndex)}
                        className="text-gray-600 hover:text-red-600 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resources section */}
                <div className="p-5 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">Resources</h4>
                    <button
                      onClick={() => handleAddResource(topicIndex)}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Resource
                    </button>
                  </div>

                  {topic.resources && topic.resources.length > 0 ? (
                    <div className="space-y-3">
                      {topic.resources.map((resource, resourceIndex) => (
                        <div
                          key={resourceIndex}
                          className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start"
                        >
                          <div>
                            <div className="font-medium text-gray-800 mb-1">
                              {resource.name}
                            </div>
                            <div className="flex items-center">
                              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2">
                                {resource.type}
                              </span>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm flex items-center"
                              >
                                <span>View Resource</span>
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleEditResource(
                                  topicIndex,
                                  resource,
                                  resourceIndex
                                )
                              }
                              className="text-gray-600 hover:text-blue-600 p-1"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() =>
                                handleRemoveResource(topicIndex, resourceIndex)
                              }
                              className="text-gray-600 hover:text-red-600 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      No resources added yet.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <BookOpen size={36} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No topics yet
            </h3>
            <p className="text-gray-500 mb-4">
              Add topics to organize your learning plan.
            </p>
            <button
              onClick={handleAddTopic}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Add Your First Topic
            </button>
          </div>
        )}
      </div>

      {/* Topic and Resource modals */}
      {isTopicModalOpen && (
        <TopicModal
          isOpen={isTopicModalOpen}
          onClose={() => setIsTopicModalOpen(false)}
          onSave={handleTopicSave}
          topic={selectedTopic}
        />
      )}

      {isResourceModalOpen && (
        <ResourceModal
          isOpen={isResourceModalOpen}
          onClose={() => setIsResourceModalOpen(false)}
          onSave={handleResourceSave}
          resource={selectedResourceData.resource}
        />
      )}
    </div>
  );
};

export default PlanDetailPage;
