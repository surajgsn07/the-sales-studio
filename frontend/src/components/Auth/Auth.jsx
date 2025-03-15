import { useState } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { setCookie } from "../../axiosConfig/cookieFunc";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // ⬅️ Loader icon

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // ⬅️ Loader state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup/Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    const url = isLogin ? "user/login" : "user/register";

    try {
      const response = await axiosInstance.post(url, formData);
      if (response.data) {
        const { user, token } = response.data;
        setCookie("accessToken", token);
        dispatch(login({ user }));
        toast.success("Successfully Logged in");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white">
      <div className="w-full max-w-md p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-500"
            required
          />
          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-500"
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-500"
            required
          />

          {/* 🌈 Gradient Button with Loader */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-md text-white font-medium bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                Processing...
              </>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 block w-full text-center text-blue-500 dark:text-pink-400 hover:underline"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
