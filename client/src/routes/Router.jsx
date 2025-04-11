import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import UserLayout from "../layout/UserLayout";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import SingleMoviePage from "../pages/SingleMoviePage";
import ProfilePage from "../pages/ProfilePage";


export const router = createBrowserRouter([

    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/signup",
      element: <SignupPage/>
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      errorElement: <h1>Error Page</h1>,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "movie/:movieId",   
          element: <SingleMoviePage />,
        },
        {
          path: "profile",   
          element: <ProfilePage />,
        }

  
      ]

    }
    
  ]);

