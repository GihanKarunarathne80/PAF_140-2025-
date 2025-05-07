import React from "react";
import { X } from "lucide-react";
import TopicForm from "./TopicForm";

const TopicModal = ({ isOpen, onClose, onSave, topic }) => {
  if (!isOpen) return null;

  const handleSave = (topicData) => {
    onSave(topicData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {topic ? "Edit Topic" : "Add New Topic"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <TopicForm topic={topic} onSave={handleSave} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
