import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  return token ? children : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;

