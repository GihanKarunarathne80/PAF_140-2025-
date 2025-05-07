import React from "react";
import { BookOpen } from "lucide-react";

const EmptyState = ({ message, description, action, actionLabel }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="bg-blue-100 p-3 rounded-full mb-4">
        <BookOpen size={32} className="text-blue-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{message}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {actionLabel || "Take Action"}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
