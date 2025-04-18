import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (value: string) => {
    if (value === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (value === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
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
        navigate("/login");
      }
    } catch (error) {
      setError("An error occurred while registering.");
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1>Create Account</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
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
            minLength={6}
            disabled={loading}
          />
          <div
            className="password-toggle"
            onClick={() => togglePasswordVisibility("password")}
          >
            <i className={showPassword ? "icon-eye-off" : "icon-eye"}></i>
          </div>
        </div>
        <div className="form-group form-group-password">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            disabled={loading}
          />
          <div
            className="password-toggle"
            onClick={() => togglePasswordVisibility("confirmPassword")}
          >
            <i
              className={showConfirmPassword ? "icon-eye-slash" : "icon-eye"}
            ></i>
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? (
            <>
              <Loader size="small" color="#ffffff" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
        <div className="form-footer">
          Already have an account?
          <Link
            to="/login"
            style={{ pointerEvents: loading ? "none" : "auto" }}
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
