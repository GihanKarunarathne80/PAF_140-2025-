import React from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const PlanCard = ({ plan, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateProgress = () => {
    if (!plan.topics || plan.topics.length === 0) return 0;

    // This is a placeholder for progress calculation logic
    // In a real app, you might track completion status for each topic
    return Math.floor(Math.random() * 100); // Placeholder for demo
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="relative">
        {/* Progress bar */}
        <div className="h-1 bg-gray-200 w-full">
          <div
            className="h-full bg-green-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Card content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {plan.title}
            </h3>
            <div className="flex items-center">
              {plan.isPublic ? (
                <Eye size={18} className="text-gray-500" />
              ) : (
                <Lock size={18} className="text-gray-500" />
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {plan.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={16} className="mr-2" />
              <span>
                {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
              </span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <BookOpen size={16} className="mr-2" />
              <span>{plan.topics ? plan.topics.length : 0} topics</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-2" />
              <span>{progressPercentage}% completed</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <Link
              to={`/plans/${plan.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Details
            </Link>
            <div className="flex gap-3">
              <button
                onClick={onEdit}
                className="text-gray-600 hover:text-blue-600"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={onDelete}
                className="text-gray-600 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
