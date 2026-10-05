import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./features/Dashboard/Dashboard";
import Login from "./features/Login/Login";
import Register from "./features/Register/Register";

const SESSION_KEY = "login-page-user";

function readSavedUser() {
  const savedUser = localStorage.getItem(SESSION_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    const user = JSON.parse(savedUser);
    return user && user.id && user.name && user.email ? user : null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function App() {
  const [user, setUser] = useState(readSavedUser);

  const handleLogin = (authenticatedUser) => {
    const userProfile = {
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(userProfile));
    setUser(userProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/register"} replace />}
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/register"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
