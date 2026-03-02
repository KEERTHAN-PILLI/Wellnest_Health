import { useEffect } from "react";

function AdminDashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "ADMIN") {
      window.location.href = "/login";
    }
  }, []);

  // Mock data for dashboard
  const stats = [
    { label: "Total Users", value: "245", icon: "👥", color: "#3b82f6" },
    { label: "Active Today", value: "67", icon: "✅", color: "#10b981" },
    { label: "Health Records", value: "892", icon: "📊", color: "#f59e0b" },
    { label: "Trainers", value: "12", icon: "🏋️", color: "#8b5cf6" },
  ];

  const recentActivities = [
    { user: "John Doe", action: "Logged health metrics", time: "2 mins ago", status: "✅" },
    { user: "Sarah Smith", action: "Completed workout", time: "5 mins ago", status: "✅" },
    { user: "Mike Johnson", action: "Updated nutrition plan", time: "12 mins ago", status: "✅" },
    { user: "Emma Wilson", action: "Consulted with trainer", time: "18 mins ago", status: "✅" },
    { user: "David Brown", action: "Logged sleep data", time: "25 mins ago", status: "✅" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2024-01-15", status: "Active" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", joinDate: "2024-02-10", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "2024-01-20", status: "Inactive" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", joinDate: "2024-02-05", status: "Active" },
  ];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🔐 Admin Dashboard</h1>
      <p style={subtitleStyle}>System Overview & Management</p>

      {/* Stats Cards */}
      <div style={statsGridStyle}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ ...statCardStyle, borderLeft: `4px solid ${stat.color}` }}>
            <div style={statIconStyle}>{stat.icon}</div>
            <div style={statContentStyle}>
              <p style={statLabelStyle}>{stat.label}</p>
              <h3 style={statValueStyle}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>📋 Recent Activities</h2>
        <div style={activityListStyle}>
          {recentActivities.map((activity, idx) => (
            <div key={idx} style={activityItemStyle}>
              <div style={activityMainStyle}>
                <p style={activityUserStyle}>{activity.user}</p>
                <p style={activityActionStyle}>{activity.action}</p>
              </div>
              <div style={activityMeta}>
                <span style={activityTimeStyle}>{activity.time}</span>
                <span style={activityStatusStyle}>{activity.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>👥 Manage Users</h2>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableHeaderCell}>Name</th>
                <th style={tableHeaderCell}>Email</th>
                <th style={tableHeaderCell}>Join Date</th>
                <th style={tableHeaderCell}>Status</th>
                <th style={tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>{user.name}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>{user.joinDate}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      ...statusBadge,
                      backgroundColor: user.status === "Active" ? "#d1fae5" : "#fecaca",
                      color: user.status === "Active" ? "#065f46" : "#991b1b",
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <button style={actionBtnStyle}>Edit</button>
                    <button style={{ ...actionBtnStyle, backgroundColor: "#ef4444", marginLeft: "5px" }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>📈 System Performance</h2>
        <div style={performanceGridStyle}>
          <div style={perfItemStyle}>
            <p style={perfLabelStyle}>API Response Time</p>
            <p style={perfValueStyle}>245ms</p>
          </div>
          <div style={perfItemStyle}>
            <p style={perfLabelStyle}>Database Size</p>
            <p style={perfValueStyle}>256MB</p>
          </div>
          <div style={perfItemStyle}>
            <p style={perfLabelStyle}>Active Sessions</p>
            <p style={perfValueStyle}>34</p>
          </div>
          <div style={perfItemStyle}>
            <p style={perfLabelStyle}>Uptime</p>
            <p style={perfValueStyle}>99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const titleStyle = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "8px",
};

const subtitleStyle = {
  fontSize: "16px",
  color: "#64748b",
  marginBottom: "30px",
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "35px",
};

const statCardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  transition: "transform 0.3s, box-shadow 0.3s",
};

const statIconStyle = {
  fontSize: "32px",
};

const statContentStyle = {
  flex: 1,
};

const statLabelStyle = {
  fontSize: "13px",
  color: "#64748b",
  margin: "0 0 5px 0",
  fontWeight: "500",
};

const statValueStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0",
};

const sectionStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  marginBottom: "25px",
};

const sectionTitleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "20px",
  margin: "0 0 20px 0",
};

const activityListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const activityItemStyle = {
  background: "#f8fafc",
  padding: "15px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderLeft: "3px solid #3b82f6",
};

const activityMainStyle = {
  flex: 1,
};

const activityUserStyle = {
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 4px 0",
  fontSize: "14px",
};

const activityActionStyle = {
  color: "#64748b",
  fontSize: "13px",
  margin: "0",
};

const activityMeta = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const activityTimeStyle = {
  fontSize: "12px",
  color: "#94a3b8",
};

const activityStatusStyle = {
  fontSize: "16px",
};

const tableContainerStyle = {
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const tableHeaderStyle = {
  background: "#f1f5f9",
  borderBottom: "2px solid #e2e8f0",
};

const tableHeaderCell = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  color: "#475569",
};

const tableRowStyle = {
  borderBottom: "1px solid #e2e8f0",
};

const tableCellStyle = {
  padding: "12px",
  color: "#334155",
};

const statusBadge = {
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
};

const actionBtnStyle = {
  padding: "6px 12px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "600",
  transition: "background-color 0.3s",
};

const performanceGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
};

const perfItemStyle = {
  background: "#f1f5f9",
  padding: "15px",
  borderRadius: "8px",
  textAlign: "center",
};

const perfLabelStyle = {
  fontSize: "13px",
  color: "#64748b",
  margin: "0 0 8px 0",
};

const perfValueStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0",
};

export default AdminDashboard;
