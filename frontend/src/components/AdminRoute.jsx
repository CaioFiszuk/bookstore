import { Navigate } from "react-router-dom";

const AdminRoute = ({ isLoggedIn, userRole, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />; 
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default AdminRoute;
