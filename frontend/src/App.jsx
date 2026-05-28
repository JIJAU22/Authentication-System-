import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import AppNavbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundVideo from './components/landing/BackgroundVideo';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <main className="relative bg-black min-h-screen w-full flex flex-col overflow-hidden selection:bg-white selection:text-black">
          <BackgroundVideo />
          <AppNavbar />
          
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full overflow-y-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Default fallback Route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
