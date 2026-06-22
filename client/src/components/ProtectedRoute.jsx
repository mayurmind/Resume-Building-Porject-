import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>Loading session...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
