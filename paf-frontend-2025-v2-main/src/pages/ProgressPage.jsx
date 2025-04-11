import { toast } from "react-toastify";
import progressApi from "../api/progressApi";
import { useEffect, useState } from "react";
import ProgressList from "../components/progress/ProgressList";
import { Link } from "react-router-dom";

const ProgressPage = () => {
  const [progresses, setProgress] = useState([]);

  const fetchData = async () => {
    try {
      const res = await progressApi.getAllProgresses();
      setProgress(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Progress</h1>
        <Link
          to={"/create-progresses"}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Progress
        </Link>
      </div>

      <ProgressList
        progresses={progresses}
        onDeleteClick={async (id) => {
          const isConfirmed = window.confirm(
            "Are you sure you want to delete this progress?"
          );
          if (!isConfirmed) return; // Exit if the user cancels

          try {
            await progressApi.deleteProgress(id);
            toast.success("Progress deleted successfully");
            fetchData(); // Refresh data after deletion
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete progress");
          }
        }}
        onRefresh={fetchData}
      />
    </div>
  );
};
export default ProgressPage;
