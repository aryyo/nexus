import "../styles/Account.css";

const Account = () => {
  return (
    <div className="account-page">
      <div className="overview">
        <p>My Account</p>
      </div>

      <div className="account-grid">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-info">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-details">
                <h2>Jane Cooper</h2>
                <p>Product Manager</p>
              </div>
            </div>
            <div className="profile-actions">
              <button className="action-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Change Photo
              </button>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">$46.5k</span>
              <span className="stat-label">Total Income</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">85%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">246</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
        </div>

        <div className="cards-container">
          <div className="info-card">
            <div className="card-header">
              <h3>Personal Information</h3>
              <button className="edit-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
            </div>
            <div className="info-grid">
              <div className="info-group">
                <label>Full Name</label>
                <p>Jane Cooper</p>
              </div>
              <div className="info-group">
                <label>Email Address</label>
                <p>jane@company.com</p>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <p>+1 (555) 000-0000</p>
              </div>
              <div className="info-group">
                <label>Location</label>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="security-card">
            <div className="card-header">
              <h3>Security</h3>
            </div>
            <div className="security-content">
              <div className="security-item">
                <div className="security-info">
                  <h4>Password</h4>
                  <p>Last changed 3 months ago</p>
                </div>
                <button className="secondary-button">Change Password</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <button className="primary-button">Enable 2FA</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <h4>Active Sessions</h4>
                  <p>2 devices currently signed in</p>
                </div>
                <button className="secondary-button">View All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
