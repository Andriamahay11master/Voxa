import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //handleChange input forms
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //togglePassword function
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //handleSubmit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/profile";
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome Back</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group form-group-password">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            <i className={showPassword ? "icon-eye-off" : "icon-eye"}></i>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <Loader size="small" color="#ffffff" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
          <Link
            to="/reset-password"
            className="forgot-password"
            style={{ pointerEvents: loading ? "none" : "auto" }}
          >
            Forgot Password?
          </Link>
        </div>
        <div className="form-footer">
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ pointerEvents: loading ? "none" : "auto" }}
          >
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
