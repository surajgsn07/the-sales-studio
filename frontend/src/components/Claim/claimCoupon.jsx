import React, { useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { FaTicketAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loader icon
import { toast } from "react-toastify";

const ClaimCoupon = () => {
  const [claimedCoupon, setClaimedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClaimCoupon = async () => {
    setLoading(true);
    setError("");
    setClaimedCoupon(null);

    try {
      const sessionId = sessionStorage.getItem("sessionId");
      if (!sessionId) {
        toast.error("Refresh the page to get a session ID");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post("/claim/claim", {
        userSession: sessionId,
      });

      if (response.data) {
        console.log("res : ", response.data);
        setClaimedCoupon(response.data.couponCode);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to claim a coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col justify-between p-6 min-h-screen bg-white text-black dark:bg-black dark:text-white shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BsLightningFill className="text-yellow-400" /> Claim Your Coupon
        </h2>

        {claimedCoupon ? (
          <div className="p-4 bg-green-600 text-white font-semibold text-center rounded-md flex items-center gap-2">
            <FaTicketAlt className="text-2xl" /> 🎉 Coupon Claimed:{" "}
            <span className="font-mono bg-white text-green-700 px-2 py-1 rounded-md">
              {claimedCoupon}
            </span>
          </div>
        ) : (
          <button
            onClick={handleClaimCoupon}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                Claiming...
              </>
            ) : (
              <>
                <FaTicketAlt /> Claim Coupon
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
          <MdErrorOutline className="text-lg" /> {error}
        </p>
      )}

      {/* How It Works Section */}
      <div className="mt-6 bg-gray-200 text-black dark:bg-gray-900 dark:text-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-500 mb-2">
          How It Works? 🤔
        </h3>
        <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
          <li>
            🎟️ <span className="font-bold">Coupons are assigned sequentially</span> without repetition.
          </li>
          <li>
            🌍 <span className="font-bold">No Login Required</span> - Claim your coupon instantly!
          </li>
          <li>
            🛑 <span className="font-bold">Anti-Abuse System:</span>
          </li>
          <ul className="ml-4 list-disc">
            <li>
              🚫 <span className="font-bold">IP Tracking: </span> Prevents multiple claims from the same IP.
            </li>
            <li>
              🍪 <span className="font-bold">Cookie Tracking:</span> Restricts claims from the same browser session.
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default ClaimCoupon;
