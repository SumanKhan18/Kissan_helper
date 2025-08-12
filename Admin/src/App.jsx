import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import LoadingScreen from "./components/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar"; // ✅ Import Navbar

// Lazy-loaded pages/components
const Home = lazy(() => import("./Home"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminPolicies = lazy(() => import("./pages/AdminPolicies"));
const AdminPayments = lazy(() => import("./pages/AdminPayments"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminMaintenance = lazy(() => import("./pages/AdminMaintenance"));
const AdminBroadcast = lazy(() => import("./pages/AdminBroadcast"));
const AdminShipment = lazy(() => import("./pages/AdminShipment"));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <ErrorBoundary>
          {/* ✅ Navbar visible across all routes */}
         
         
          {/* <Navbar /> */}

          <main className="pt-[10px]">
            <Routes location={location} key={location.pathname}>
              {/* Redirect from root to secure admin portal */}
              <Route path="/" element={<Navigate to="/portal-9508" replace />} />

              {/* Admin portal route */}
              <Route path="/portal-9508" element={<Home />} />

              {/* Public Routes */}
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/layout/*" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="policies" element={<AdminPolicies />} />
                  <Route path="broadcast" element={<AdminBroadcast />} />
                  <Route path="shipment" element={<AdminShipment />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="maintenance" element={<AdminMaintenance />} />
                </Route>
              </Route>

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                    <h1 className="text-6xl font-extrabold mb-4 animate-bounce">🤖 404</h1>
                    <p className="text-2xl mb-2 animate-pulse">
                      Oops! This page took a coffee break ☕
                    </p>
                    <p className="text-lg text-gray-400">
                      Let’s get you back{" "}
                      .
                    </p>
                  </div>
                }
              />
            </Routes>
          </main>
        </ErrorBoundary>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}
