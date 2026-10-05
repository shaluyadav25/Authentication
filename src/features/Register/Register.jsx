import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../app/api/userApi";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await registerUser(form);
      navigate("/login", {
        replace: true,
        state: { email: form.email.trim().toLowerCase(), registered: true },
      });
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
        <p className="eyebrow">YOUR WORKSPACE, SIMPLIFIED</p>
        <h1>One place to manage your account.</h1>
        <p className="welcome-copy">
          Create your account to get started. Your personal dashboard will be
          ready as soon as you sign in.
        </p>
        <div className="welcome-note">
          <span className="note-dot" />
          Easy access to your workspace
        </div>
        <span className="panel-decoration panel-decoration-one" />
        <span className="panel-decoration panel-decoration-two" />
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <p className="eyebrow form-eyebrow">GET STARTED</p>
          <h2>Create your account</h2>
          <p className="form-intro">Enter your details to register.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input
              autoComplete="name"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              required
              value={form.name}
            />

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
              autoComplete="new-password"
              id="password"
              minLength={8}
              name="password"
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
              type="password"
              value={form.password}
            />
            <p className="field-hint">Use at least 8 characters.</p>

            {error && (
              <p className="form-message error-message" role="alert">
                {error}
              </p>
            )}

            <button className="primary-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="form-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
