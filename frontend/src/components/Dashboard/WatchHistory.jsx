import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";

const WatchHistory = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axiosInstance.get("/claim/all");
        if (response.data) {
          console.log("data: ", response.data);
          setClaims(response.data);
        }
      } catch (err) {
        setError("Failed to fetch claim history.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-black shadow-xl rounded-lg border border-gray-300 dark:border-gray-800">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-5 text-gray-800 dark:text-gray-100 text-center">
        Coupon Claim History
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : claims.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">No claims found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
              <tr className="text-left text-sm sm:text-base">
                <th className="p-3 border-b dark:border-gray-800">Coupon Code</th>
                <th className="p-3 border-b dark:border-gray-800">Claimed By (IP)</th>
                <th className="p-3 border-b dark:border-gray-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr
                  key={claim._id}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-200 dark:hover:bg-gray-700`}
                >
                  <td className="p-3 border-b dark:border-gray-800 font-mono text-sm sm:text-base">
                    {claim?.couponId?.code || "N/A"}
                  </td>
                  <td className="p-3 border-b dark:border-gray-800 text-sm sm:text-base">
                    {claim.ip || "Unknown"}
                  </td>
                  <td className="p-3 border-b dark:border-gray-800 text-sm sm:text-base">
                    {new Date(claim.claimedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
