import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-black text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Our Coupon Portal 🎉</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Grab exciting discounts & special offers now!
        </p>
      </section>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/auth")}
          className="px-6 py-3 rounded-md cursor-pointer text-white font-medium bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
        >
          Admin Login
        </button>
        <button
          onClick={() => navigate("/claim")}
          className="px-6 py-3 rounded-md cursor-pointer text-white font-medium bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-300"
        >
          Claim Your Coupon
        </button>
      </div>

      {/* Rules Section */}
      <section className="mt-8 max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-3">Coupon Claiming Rules 📜</h2>
        <ul className="text-gray-700 dark:text-gray-300 list-disc text-left mx-auto w-fit space-y-2">
          <li>One coupon per user.</li>
          <li>Coupons are valid for a limited time.</li>
          <li>Unauthorized sharing of coupons is prohibited.</li>
          <li>Admin reserves the right to revoke coupons.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
