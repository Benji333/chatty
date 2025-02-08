import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage"; // Removed trailing space
import SignUpPage from "./pages/SignUpPage"; // Removed trailing space
import LoginPage from "./pages/LoginPage"; // Removed trailing space
import SettingsPage from "./pages/SettingsPage"; // Removed trailing space
import ProfilePage from "./pages/ProfilePage"; // Removed trailing space

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth();

  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
     return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
  
  return ( <div>

  <Navbar />
  <Routes>

  
  <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/> } />
  <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/login"/>}  />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to ="login" /> } />
  <Route path="/settings" element={<SettingsPage/>} />

  </Routes>
  </div>
  );
};

export default App;