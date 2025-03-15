import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Availability() {
  const [coupons, setCoupons] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingAvailability, setloadingAvailability] = useState(false);

  // ✅ Fetch Coupons from API
  const fetchCoupons = async () => {
    try {
      setloadingAvailability(true);
      const response = await axiosInstance.get("/coupon/all");
      if (response.data) setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }finally
    {
      setloadingAvailability(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // ✅ Toggle Coupon Availability
  const toggleAvailability = async (couponId) => {
    setLoadingId(couponId);

    try {
      const response = await axiosInstance.get(`/coupon/toggle/${couponId}`);
      if (response.data) {
        const updatedCoupons = coupons.map((coupon) => {
          if (coupon._id === couponId) {
            return { ...coupon, isAvailable: !coupon.isAvailable };
          }
          return coupon;
        });
        setCoupons(updatedCoupons);
        toast.success("Availability toggled successfully!");
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Failed to toggle availability.");
    }

    setLoadingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-black p-6">
      {/* Availability Heading */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Availability
      </h1>

      {/* Loading Message */}
      {loadingId && (
        <div className="w-full absolute top-12 max-w-3xl bg-white dark:bg-[#181818] shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700">
          <h2 className="text-lg text-center font-semibold text-blue-600 dark:text-blue-400 mb-4">
            Toggling Availability...
          </h2>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white dark:bg-[#181818] shadow-lg rounded-lg p-6 border border-gray-300 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Manage Coupons
        </h2>

        {loadingAvailability ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300">
              Loading...
            </span>
          </div>
        ) : (
          <>
            {coupons.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {coupons.map((coupon) => (
                  <li
                    key={coupon._id}
                    className="flex items-center border m-2.5 border-gray-200 dark:border-gray-700 rounded justify-between p-3 bg-gray-50 dark:bg-[#272727]"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300 text-lg">
                      {coupon.code}
                    </span>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleAvailability(coupon._id)}
                      disabled={loadingId === coupon._id}
                      className={`relative w-16 h-8 flex items-center rounded-full transition-all ${
                        coupon.isAvailable ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {/* Sliding Circle */}
                      <motion.div
                        className="absolute w-6 h-6 bg-white rounded-full shadow-md"
                        initial={{
                          left: coupon.isAvailable
                            ? "calc(100% - 26px )"
                            : "2px",
                        }}
                        animate={{
                          left: coupon.isAvailable
                            ? "calc(100% - 26px )"
                            : "2px",
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      <span
                        className={`absolute w-full text-xs text-white font-semibold text-center ${
                          loadingId === coupon._id ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        {coupon.isAvailable ? "ON" : "OFF"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No coupons available.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Availability;
