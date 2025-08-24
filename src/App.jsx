import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all your components
import { AuthProvider, useAuth } from './context/AuthContext'; 

// Public Pages
import Home from './pages/public/Home';
import AboutUs from './pages/public/AboutUs';
import Events from './pages/public/Events';
import Projects from './pages/public/Projects';

// Auth Pages
import SignIn from './auth/SignIn';
import Signup from './auth/Signup';

// Private Pages (assuming they are in src/pages/private/)
import Dashboard from './pages/private/Dashboard';
import Profile from './pages/private/Profile';
import Learn from './pages/private/Learn';
import ProjectsHub from './pages/private/ProjectsHub';
import MemberEvents from './pages/private/MemberEvents';
import AnnouncementsForum from './pages/private/AnnouncementsForum';

// NEW: Admin Panel Page (UPDATE THE IMPORT PATH)
import AdminPanel from './pages/admin/AdminPanel'; // ⭐ UPDATED PATH HERE ⭐

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import DashboardLayout from './components/DashboardLayout'; // Your sidebar layout component
import AuthLayout from './components/AuthLayout'; // Ensure this is imported for auth pages


// PrivateRoute component to protect routes
const PrivateRoute = ({ children, requiredRole }) => { // Added requiredRole prop
  const { currentUser, loading, isAdmin } = useAuth(); // Destructure isAdmin
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <p className="text-gray-700 text-lg">Loading application...</p>
      </div>
    );
  }

  // If no user is logged in, redirect to signin
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // If a role is required, check if the current user has that role
  if (requiredRole && currentUser.role !== requiredRole) {
    // For simplicity, redirect to dashboard if not authorized for admin page
    return <Navigate to="/dashboard" replace />; 
  }

  return children;
};

function App() {
  return (
    // Wrap the entire application with AuthProvider
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar now always renders here. It will internally decide whether to show itself based on route. */}
        <Navbar /> 
        
        <main className="min-h-[calc(100vh-200px)]"> {/* Adjusted min-height for footer */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />

            {/* Authentication Routes wrapped by AuthLayout */}
            <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />

            {/* Protected Dashboard Routes wrapped by DashboardLayout */}
            <Route 
              path="/dashboard/*" // Use a splat route to match all /dashboard sub-paths
              element={
                <PrivateRoute> {/* Protect the entire dashboard section */}
                  <DashboardLayout>
                    {/* Nested Routes within DashboardLayout's children */}
                    <Routes> 
                      <Route index element={<Dashboard />} /> {/* /dashboard (base path) */}
                      <Route path="profile" element={<Profile />} /> {/* /dashboard/profile */}
                      <Route path="learn" element={<Learn />} /> {/* /dashboard/learn */}
                      <Route path="projects-hub" element={<ProjectsHub />} /> {/* /dashboard/projects-hub */}
                      <Route path="member-events" element={<MemberEvents />} /> {/* /dashboard/member-events */}
                      <Route path="announcements-forum" element={<AnnouncementsForum />} /> {/* /dashboard/announcements-forum */}
                      
                      {/* ⭐ NEW: Admin-Only Route within DashboardLayout ⭐ */}
                      {/* This uses the requiredRole prop on PrivateRoute to ensure admin access */}
                      <Route path="admin" element={<PrivateRoute requiredRole="admin"><AdminPanel /></PrivateRoute>} />

                      {/* Fallback for any /dashboard/* that doesn't match a specific sub-route */}
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </DashboardLayout>
                </PrivateRoute>
              } 
            />

            {/* Fallback for any unmatched routes outside of /dashboard and auth */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* Footer now always renders here. It will internally decide whether to show itself based on route. */}
        <Footer />
        
        {/* FloatingButton and ScrollToTopButton typically render universally */}
        <FloatingButton />
        <ScrollToTopButton />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
