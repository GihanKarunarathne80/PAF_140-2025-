import React, { useState, useEffect } from "react";
import reportApi from "../../api/reportApi";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";

const ReportContainer = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await reportApi.getAllReports();
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Failed to load reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleBlockUser = async (userId, reportId) => {
    if (!window.confirm("Are you sure you want to block this user?")) return;

    try {
      setIsBlocking(true);
      await userApi.deleteUser(userId);
      await reportApi.resolveReport(reportId);

      toast.success("User blocked successfully");
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user");
    } finally {
      setIsBlocking(false);
    }
  };

  const handleResolveReport = async (reportId) => {
    try {
      await reportApi.resolveReport(reportId);
      setReports((prev) => prev.filter((report) => report.id !== reportId));
      toast.success("Report resolved successfully");
    } catch (error) {
      console.error("Error resolving report:", error);
      toast.error("Failed to resolve report");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No reports found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          All reports have been resolved or no reports have been submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Reported Content
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Review and take action on reported content
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {reports.map((report) => (
          <div key={report.id} className="px-4 py-5 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.reportType === "POST"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {report.reportType}
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    Reported on: {new Date(report.reportedAt).toLocaleString()}
                  </span>
                </div>

                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-900">Reason:</h4>
                  <p className="text-sm text-gray-700">{report.reason}</p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Reported by:
                    </h4>
                    <div className="mt-1 text-sm text-gray-700">
                      <p>
                        {report.reporterName} ({report.reporterEmail})
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Content owner:
                    </h4>
                    <div className="mt-1 text-sm text-gray-700">
                      <p>
                        {report.contentOwnerName} ({report.contentOwnerEmail})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Content preview:
                  </h4>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      {report.contentPreview}
                    </p>
                  </div>
                </div>
              </div>

              {report.resolved ? (
                <p>Ticket already Resolved</p>
              ) : (
                <div className="ml-4 flex-shrink-0 flex flex-col space-y-2">
                  <button
                    onClick={() =>
                      handleBlockUser(report.contentOwnerUserId, report.id)
                    }
                    disabled={isBlocking}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {isBlocking ? "Blocking..." : "Block User"}
                  </button>

                  <button
                    onClick={() => handleResolveReport(report.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportContainer;
