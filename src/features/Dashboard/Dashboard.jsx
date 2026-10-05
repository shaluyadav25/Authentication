import { Link } from "react-router-dom";

function Dashboard({ user, onLogout }) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link className="dashboard-brand" to="/dashboard">
          <span className="brand-mark small-brand-mark" aria-hidden="true">
            U
          </span>
          <span>Workspace</span>
        </Link>
        <div className="header-account">
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <button className="text-button" onClick={onLogout} type="button">
            Sign out
          </button>
        </div>
      </header>

      <section className="dashboard-content">
        <p className="eyebrow form-eyebrow">YOUR DASHBOARD</p>
        <h1>Welcome, {user.name.split(/\s+/)[0]}.</h1>
        <p className="dashboard-intro">
          You’re signed in. Here’s your account overview.
        </p>

        <article className="account-card">
          <div className="account-card-heading">
            <div>
              <p className="eyebrow form-eyebrow">ACCOUNT DETAILS</p>
              <h2>Your profile</h2>
            </div>
            <div className="avatar large-avatar" aria-hidden="true">
              {initials}
            </div>
          </div>
          <dl className="profile-details">
            <div>
              <dt>Full name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt>Email address</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Account status</dt>
              <dd>
                <span className="status-dot" />
                Active
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
