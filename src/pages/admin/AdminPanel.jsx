import React from 'react';
// Adjust the path to DashboardLayout based on the new location relative to AdminPanel.jsx
import DashboardLayout from '../../components/DashboardLayout'; 

const AdminPanel = () => {
  return (
    <DashboardLayout>
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl w-full text-center border-t-4 border-purple-500 flex flex-col items-center justify-center min-h-[500px]">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
          <span className="mr-3 text-purple-600">👑</span> Admin Control Panel
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          This is the admin-only section. Content for managing users, settings, etc., will go here.
        </p>
        <p className="text-md text-gray-500">
          (You are seeing this because you are logged in as an admin and the route is working!)
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
