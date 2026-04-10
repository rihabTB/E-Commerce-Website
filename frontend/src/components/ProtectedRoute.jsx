import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuthStore();

  console.log("ProtectedRoute - User:", user, "Required Role:", requiredRole);

  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(`User role (${user.role}) does not match required role (${requiredRole})`);
    return <Navigate to="/" />;
  }

  return children;
}