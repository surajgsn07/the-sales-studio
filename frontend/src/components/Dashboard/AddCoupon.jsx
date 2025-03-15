import { useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const [codes, setCodes] = useState([""]); // Start with one empty field
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle input change
  const handleInputChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  // ✅ Add a new input field
  const addField = () => {
    setCodes([...codes, ""]);
  };

  // ✅ Submit to backend
  const submitCoupons = async () => {
    if (codes.some(code => code.trim() === "")) {
      setMessage("Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/coupon/add", { codes });
      if (res.data) {
        console.log("res:", res.data);
        toast.success("Coupons added successfully!");
        setCodes([""]); // Reset input fields after successful submission
      }
    } catch (err) {
      setMessage("Error adding coupons.");
      toast.error("Failed to add coupons.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Coupons</h2>

      {codes.map((code, index) => (
        <input
          key={index}
          type="text"
          value={code}
          onChange={(e) => handleInputChange(index, e.target.value)}
          placeholder={`Coupon Code ${index + 1}`}
          className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-700 rounded 
                     bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-blue-500"
        />
      ))}

      {/* Add Another Button */}
      <button 
        onClick={addField} 
        className="w-full p-2 rounded mb-2 text-white 
                   bg-gradient-to-r from-purple-500 to-pink-500 
                   hover:from-purple-600 hover:to-pink-600 transition-all"
      >
        + Add Another
      </button>

      {/* Submit Button */}
      <button 
        onClick={submitCoupons} 
        className="w-full p-2 rounded text-white 
                   bg-gradient-to-r from-blue-500 to-green-500 
                   hover:from-blue-600 hover:to-green-600 transition-all"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Coupons"}
      </button>

      {/* Message Display */}
      {message && <p className="mt-2 text-gray-900 dark:text-gray-300">{message}</p>}
    </div>
  );
};

export default AddCoupon;
