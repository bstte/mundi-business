import React from "react";
import "./Sidebar.css"
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = ({ user }) => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const location = useLocation(); 

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            dispatch(logout());
    
            // Clear authentication data
            localStorage.clear();
            sessionStorage.clear();
    
            // Completely remove navigation history and redirect to home/login
            window.location.replace("/");
        }
    };
    
    const handleAdminLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            dispatch(logout());
    
            // Clear authentication data
            localStorage.clear();
            sessionStorage.clear();
    
            // Completely remove navigation history and redirect to home/login
            window.location.replace("/admin");
        }
    };
    
    const isActive = (path) => location.pathname === path ? "active" : "";
    return (
        <div>
            <div className="ss_sidebar">
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                {user && user.isAdmin ? (
                    <ul>
                        <li onClick={() => navigate('/admin/dashboard')} className={isActive('/admin/dashboard')}>
                            <button >
                                🏠 Dashboard
                            </button>
                        </li>
                        <li onClick={() => navigate('/admin/manage-users')} className={isActive('/admin/manage-users')}>
                            <button >
                                👥 Manage Users
                            </button>
                        </li>
                        <li onClick={handleAdminLogout}>
                            <button >🚪 Log Out</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li onClick={() => navigate('/dashboard')} className={isActive('/dashboard')}>
                            <button >
                                🏠 Dashboard
                            </button>
                        </li>
                        <li onClick={() => alert("working")} className={isActive('/customer-segmentation')}>
                            <button >
                                📊 Customer Segmentation
                            </button>
                        </li>
                        <li onClick={() => alert("working")} className={isActive('/reports')}>
                            <button >
                                📈 Reports
                            </button>
                        </li>
                        <li onClick={() => alert("working")} className={isActive('/market-trends')}>
                            <button >
                                🔔 Market Trends
                            </button>
                        </li>
                        <li onClick={() => alert("working")} className={isActive('/settings')}>
                            <button >
                                ⚙️ Settings
                            </button>
                        </li>
                        <li onClick={handleLogout}>
                            <button >🚪 Log Out</button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );

}


export default Sidebar;
