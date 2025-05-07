import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import planApi from "../api/planApi";
import PlanCard from "../components/plans/PlanCard";
import PlanModal from "../components/plans/PlanModal";
import SearchBar from "../components/common/SearchBar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch all plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter plans when search keyword changes
  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter((plan) =>
        plan.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredPlans(filtered);
    }
  }, [searchKeyword, plans]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const data = await planApi.getPlansByUserId(userId);
      setPlans(data);
      setFilteredPlans(data);
      setError(null);
    } catch (err) {
      setError("Failed to load plans. Please try again later.");
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await planApi.deletePlan(planId);
        fetchPlans();
      } catch (err) {
        setError("Failed to delete plan. Please try again.");
        console.error("Error deleting plan:", err);
      }
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleModalClose = (shouldRefresh = false) => {
    setIsModalOpen(false);
    if (shouldRefresh) {
      fetchPlans();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Learning Plans</h1>
        <button
          onClick={handleCreatePlan}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <PlusCircle size={20} />
          <span>Create Plan</span>
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search plans..." />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : filteredPlans.length === 0 ? (
        <EmptyState
          message="No plans found"
          description="Create your first learning plan by clicking the button above."
          action={handleCreatePlan}
          actionLabel="Create Plan"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => handleEditPlan(plan)}
              onDelete={() => handleDeletePlan(plan.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <PlanModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default PlansPage;
