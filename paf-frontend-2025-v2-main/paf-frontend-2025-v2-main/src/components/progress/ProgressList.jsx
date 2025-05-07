import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2, Archive, RefreshCcw } from "lucide-react";
import progressApi from "../../api/progressApi";

const ProgressList = ({ progresses, onDeleteClick, onRefresh }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleEditClick = (progressId) => {
    navigate(`/edit-progress/${progressId}`);
  };

  const handleArchiveClick = async (progressId, isCurrentlyArchived) => {
    try {
      if (isCurrentlyArchived) {
        await progressApi.unarchiveProgress(progressId);
        toast.success("Progress unarchived successfully");
      } else {
        await progressApi.archiveProgress(progressId);
        toast.success("Progress archived successfully");
      }
      onRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update archive status");
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex justify-between items-center px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Learning Progress
        </h3>
        <button
          onClick={onRefresh}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCcw className="-ml-0.5 mr-2 h-4 w-4" />
          Refresh
        </button>
      </div>

      {progresses.length === 0 ? (
        <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
          No progress records found. Create your first progress to get started!
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {progresses.map((progress) => (
            <li key={progress.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p
                      className={`text-sm font-medium ${
                        progress.isArchived
                          ? "text-gray-400 line-through"
                          : "text-blue-600"
                      } truncate`}
                    >
                      {progress.title}
                    </p>
                    {/* {progress.isArchived && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Archived
                      </span>
                    )} */}
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {progress.description}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-3">
                      Satisfaction: {progress.satisfactionLevel}/5
                    </span>
                    <span>
                      Created:{" "}
                      {new Date(progress.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex space-x-2">
                  {progress.user.id === userId && (
                    <>
                      {/* <button
                        onClick={() =>
                          handleArchiveClick(progress.id, progress.isArchived)
                        }
                        className={`inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white ${
                          progress.isArchived
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
                        title={progress.isArchived ? "Unarchive" : "Archive"}
                      >
                        <Archive className="h-4 w-4" />
                      </button> */}
                      <button
                        onClick={() => handleEditClick(progress.id)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(progress.id)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgressList;
