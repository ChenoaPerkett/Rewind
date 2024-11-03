import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="admin-dashboard bg-gray-100 p-8">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-2 gap-6">
      <Link to="/admin/manage-users" className="p-4 bg-blue-500 text-white rounded-lg">Manage Users</Link>
      <Link to="/admin/manage-playlists" className="p-4 bg-green-500 text-white rounded-lg">Manage Playlists</Link>
      <Link to="/admin/manage-activities" className="p-4 bg-yellow-500 text-white rounded-lg">Manage Activities</Link>
      <Link to="/admin/manage-songs" className="p-4 bg-red-500 text-white rounded-lg">Manage Songs</Link>
      <Link to="/admin/manage-genres" className="p-4 bg-purple-500 text-white rounded-lg">Manage Genres</Link>
    </div>
  </div>
);

export default AdminDashboard;
