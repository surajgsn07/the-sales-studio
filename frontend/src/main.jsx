import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthForm from './components/Auth/Auth.jsx'
import Dashboard from './components/Dashboard/DashBoard.jsx'
import CouponsList from './components/Dashboard/CouponList.jsx'
import AddCoupon from './components/Dashboard/AddCoupon.jsx'
import Availability from './components/Dashboard/AvailabilityCoupon.jsx'
import ClaimCoupon from './components/Claim/claimCoupon.jsx'
import Home from './components/Home/Home.jsx'

// ✅ Use `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "auth",
        element: <AuthForm />,
      },
      {
        path:"/claim",
        element:<ClaimCoupon/>
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children:[
          {
            path:"",
            element:<CouponsList/>
          },{
            path:"add-coupon",
            element:<AddCoupon/>
          },{
            path:"set-availability",
            element:<Availability/>
          }
        ]
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
