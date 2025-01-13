// src/components/AdminPanel.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css'; // Import the CSS for styling the Admin Panel

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <Link className="sidebar-link users" to="/admin/manage-users">Manage Users</Link>
        <Link className="sidebar-link settings" to="/admin/settings">Settings</Link>
        <Link className="sidebar-link reports" to="/admin/reports">Reports</Link>
      </div>
      <div className="main-content">
        <h1>Welcome to the Admin Panel</h1>
        <p>Manage your app from here. Use the sidebar to navigate through the options.</p>
      </div>
    </div>
  );
};

export default AdminPanel;