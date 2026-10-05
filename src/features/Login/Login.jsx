import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../app/api/userApi";

function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: location.state?.email ?? "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await loginUser(form);
      onLogin(user);
      navigate("/dashboard", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="welcome-panel">
        <div className="brand-mark" aria-hidden="true">
          U
        </div>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Your workspace is waiting for you.</h1>
        <p className="welcome-copy">
          Sign in to pick up where you left off and manage your account from
          your personal dashboard.
        </p>
        <div className="welcome-note">
          <span className="note-dot" />
          Your account, all in one place
        </div>
        <span className="panel-decoration panel-decoration-one" />
        <span className="panel-decoration panel-decoration-two" />
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <p className="eyebrow form-eyebrow">ACCOUNT ACCESS</p>
          <h2>Sign in</h2>
          <p className="form-intro">Enter your account details to continue.</p>

          {location.state?.registered && (
            <p className="form-message success-message" role="status">
              Account created successfully. You can sign in now.
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />

            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type="password"
              value={form.password}
            />

            {error && (
              <p className="form-message error-message" role="alert">
                {error}
              </p>
            )}

            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="form-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
