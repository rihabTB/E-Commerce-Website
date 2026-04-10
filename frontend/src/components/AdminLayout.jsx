import { Outlet } from "react-router-dom";
import "./AdminShell.css";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <Outlet />
    </div>
  );
}