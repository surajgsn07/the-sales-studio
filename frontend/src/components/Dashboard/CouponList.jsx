import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa"; // Edit icon
import { motion } from "framer-motion"; // For toggle animation
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const CouponsList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [filter, setFilter] = useState("all"); // Filter state
  const [isSaving, setisSaving] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosInstance.get("/coupon/all");
        if (response.data) {
          setCoupons(response.data);
        }
      } catch (err) {
        setError("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const openEditModal = (coupon) => setSelectedCoupon({ ...coupon });
  const handleInputChange = (e) =>
    setSelectedCoupon({ ...selectedCoupon, code: e.target.value });

  // Toggle isClaimed
  const toggleIsClaimed = () => {
    const coupon = coupons.find((c) => c._id === selectedCoupon._id);
    if (!selectedCoupon.isClaimed && !coupon.claimedByIp) {
      toast.warn("Cannot toggle claim this coupon");
      return;
    }
    setSelectedCoupon((prev) => ({ ...prev, isClaimed: !prev.isClaimed }));
  };

  // Save changes
  const saveChanges = async () => {
    try {
      setisSaving(true)
      const response = await axiosInstance.put(
        `/coupon/update/${selectedCoupon._id}`,
        {
          code: selectedCoupon.code,
          isClaimed: selectedCoupon.isClaimed,
        }
      );

      if (response.data) {
        toast.success("Coupon updated successfully!");
        setCoupons((prev) =>
          prev.map((coupon) =>
            coupon._id === selectedCoupon._id ? selectedCoupon : coupon
          )
        );
        setSelectedCoupon(null);
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
    }finally{
      setisSaving(false);
    }
  };

  // Filter coupons
  const filteredCoupons = coupons.filter((coupon) => {
    if (filter === "claimed") return coupon.isClaimed;
    if (filter === "unclaimed") return !coupon.isClaimed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto w-full p-6 rounded-lg shadow-lg 
      bg-white dark:bg-black bg-gradient-to-r border-2 border-gray-900 ">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        🎟 Coupons List
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-300 font-medium">
          Filter by:
        </label>
        <select
          className="mt-1 w-full p-2 border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="claimed">Claimed</option>
          <option value="unclaimed">Unclaimed</option>
        </select>
      </div>

      {/* Coupons List */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
          Available Coupons
        </h3>
        {filteredCoupons.length > 0 ? (
          <ul className="space-y-2">
            {filteredCoupons.map((coupon) => (
              <li
                key={coupon._id}
                className="p-3 flex justify-between items-center bg-gray-100 dark:bg-gray-800 border-l-4 rounded-lg transition-all hover:scale-105"
              >
                {/* Claimed Indicator */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      coupon.isClaimed ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></span>
                  <span className="font-mono text-gray-700 dark:text-gray-200">
                    {coupon.code}
                  </span>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(coupon)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-2 rounded-md"
                >
                  <FaEdit size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No coupons available.
          </p>
        )}
      </div>

{/* Edit Modal */}
{selectedCoupon && (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-4">
        Edit Coupon
      </h3>

      {/* Coupon Code */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Coupon Code:
      </label>
      <input
        type="text"
        value={selectedCoupon.code}
        onChange={handleInputChange}
        className="w-full p-2 border text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 
                   bg-gray-50 dark:bg-gray-800 rounded mt-1 focus:ring-2 focus:ring-blue-500"
      />

      {/* Toggle isClaimed */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Claimed:
        </span>
        <button
          onClick={selectedCoupon.isAvailable ? toggleIsClaimed : undefined}
          className={`relative w-16 h-8 flex items-center rounded-full transition-all 
                      ${selectedCoupon.isClaimed ? "bg-green-500" : "bg-red-500"}`}
        >
          <motion.div
            className="absolute w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-md"
            initial={{ x: selectedCoupon.isClaimed ? 36 : 0 }}
            animate={{ x: selectedCoupon.isClaimed ? 36 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <span className="absolute w-full text-xs text-white font-semibold text-center">
            {selectedCoupon.isClaimed ? "ON" : "OFF"}
          </span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setSelectedCoupon(null)}
          className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={saveChanges}
          className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-pink-500 to-blue-500 
                     hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CouponsList;
