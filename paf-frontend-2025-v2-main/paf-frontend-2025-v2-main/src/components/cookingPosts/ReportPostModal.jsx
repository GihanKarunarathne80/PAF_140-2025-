import React, { useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import reportApi from "../../api/reportApi";

// Set app element for modal accessibility
Modal.setAppElement("#root");

const ReportPostModal = ({
  isOpen,
  onClose,
  postId,
  postOwnerName,
  postContentPreview,
}) => {
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedReasons = [
    "Spam or misleading content",
    "Inappropriate content",
    "Harassment or bullying",
    "Violence or harmful behavior",
    "Intellectual property violation",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedReason && !reason.trim()) {
      toast.error("Please select or enter a reason for reporting");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportReason = selectedReason === "Other" ? reason : selectedReason;
      await reportApi.reportPost(postId, reportReason);
      toast.success("Post reported successfully");
      onClose();
    } catch (error) {
      console.error("Error reporting post:", error);
      toast.error("Failed to report post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
    if (e.target.value !== "Other") {
      setReason("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
      contentLabel="Report Post Modal"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Modal Header */}
        <div className="bg-red-50 px-6 py-4 rounded-t-lg border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Report Post</h2>
          <p className="text-sm text-gray-600 mt-1">
            Help us understand what's wrong with this post
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Reported Post Content
            </h3>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-sm font-medium text-gray-800 mb-1">
                Posted by: {postOwnerName}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {postContentPreview}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Reason for reporting *
              </h3>
              <div className="space-y-2">
                {predefinedReasons.map((option) => (
                  <label key={option} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="reportReason"
                      value={option}
                      checked={selectedReason === option}
                      onChange={handleReasonChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedReason === "Other" && (
              <div className="mb-4">
                <label
                  htmlFor="customReason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Please specify *
                </label>
                <textarea
                  id="customReason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Describe the issue..."
                />
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                disabled={isSubmitting || (!selectedReason && !reason.trim())}
              >
                {isSubmitting ? "Reporting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          transform: translate(-50%, -50%);
          background: white;
          padding: 0;
          border-radius: 0.5rem;
          outline: none;
          width: 90%;
          max-width: 32rem;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 1000;
        }
      `}</style>
    </Modal>
  );
};

export default ReportPostModal;
