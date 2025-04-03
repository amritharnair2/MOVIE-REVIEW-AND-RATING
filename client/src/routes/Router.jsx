import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/user/SignupPage";
import LoginPage from "../pages/shared/LoginPage";
import UserLayout from "../layout/UserLayout";
import LandingPage from "../pages/shared/LandingPage";
import HomePage from "../pages/shared/HomePage";
import ProfilePage from "../pages/ProfilePage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/signup",
      element: <SignupPage/>
    },
    {
      path: "/home",
      element: <UserLayout />,
      errorElement: <h1>Error Page</h1>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        }
      ]

    }
    
  ]);

