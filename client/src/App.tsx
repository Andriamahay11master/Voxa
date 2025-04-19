import "./App.scss";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PublicRoute from "./components/route/PublicRoute";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Home from "./pages/Home";
import AuthentificatedLayout from "./components/authentificated/AuthentificatedLayout";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Profile from "./pages/Profile";
import ListChat from "./pages/ListChat";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPasswordPage />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AuthentificatedLayout>
                  <Home />
                </AuthentificatedLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AuthentificatedLayout>
                  <Profile />
                </AuthentificatedLayout>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/listchat"
            element={
              <ProtectedRoute>
                <AuthentificatedLayout>
                  <ListChat />
                </AuthentificatedLayout>
              </ProtectedRoute>
            }
          />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
