import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider , Navigate, Outlet } from 'react-router-dom'
import AuthForm from './components/Auth/Auth.jsx'
import Dashboard from './components/Dashboard/DashBoard.jsx'
import CouponsList from './components/Dashboard/CouponList.jsx'
import AddCoupon from './components/Dashboard/AddCoupon.jsx'
import Availability from './components/Dashboard/AvailabilityCoupon.jsx'
import ClaimCoupon from './components/Claim/claimCoupon.jsx'
import Home from './components/Home/Home.jsx'


import { getCookie } from './axiosConfig/cookieFunc.js'
import WatchHistory from './components/Dashboard/WatchHistory.jsx'

const ProtectedRoute = () => {
  const isAuthenticated = getCookie("accessToken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth",
        element: <AuthForm />,
      },
      {
        path: "/claim",
        element: <ClaimCoupon />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />, // Protect this route
        children: [
          {
            path: "",
            element: <Dashboard />, // Dashboard itself
            children: [
              {
                path: "",
                element: <CouponsList />,
              },
              {
                path: "add-coupon",
                element: <AddCoupon />,
              },
              {
                path: "set-availability",
                element: <Availability />,
              },
              {
                path:"history",
                element:<WatchHistory/>
              }
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
