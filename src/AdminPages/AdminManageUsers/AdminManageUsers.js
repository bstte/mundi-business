import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "../AdminDashboard/AdminDashboard.css";
import { useSelector } from "react-redux";
import services from "../../API/ApiService";

const AdminManageUsers = () => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); // ✅ Loading state added

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true); // ✅ API call start hone se pehle loading true karein
      try {
        console.log("Token:", token);
        const response = await services.AdminApiService.adminUsersList(token);
        console.log("Users Response:", response.data);
        setUsers(response.data.users || []); // ✅ Ensure response.data.users exists
      } catch (error) {
        console.error("Get Users Error:", error);
      }
      setLoading(false); // ✅ API response aane ke baad loading false karein
    };

    getAllUsers();
  }, [token]);

  return (
    <div className="ss_dashboard_mn_sec ss_main_sec_Corporate">
      <Header user={user} />

      <div className="ss_dash_main_sec">
        <div className="ss_dash_side_bar">
          <Sidebar user={user} />
        </div>

        <div className="ss_content">
          <section className="ss_dash_hed">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <h2>Managed Users</h2>
                </div>

                <div className="col-lg-3">
                  <div className="header-search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search w-4 h-4 mr-2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input type="search" className="form-control" placeholder="What are you looking for?" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ✅ Users ko show karne ka section */}
          <section className="ss_dash_graph_sec">
            <div className="container">
              {loading ? ( // ✅ Jab tak API response na aaye tab "Loading..." show karein
                <div className="text-center">
                  <p>Loading users...</p>
                </div>
              ) : users.length > 0 ? ( // ✅ API response ke baad check karein
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Verified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.verified ? "✅ Yes" : "❌ No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">
                  <p>No Users Found</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminManageUsers;
