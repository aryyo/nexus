import "../styles/Help.css";

const Help = () => {
  return (
    <div className="help-page">
      <div className="overview">
        <p>Help & Support</p>
      </div>

      <div className="help-content">
        {/* Support Cards */}
        <div className="support-cards">
          <div className="support-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3>Live Chat</h3>
            <p>Get instant help from our support team in real-time</p>
            <button className="primary-button">
              Start Chat
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="support-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3>Email Support</h3>
            <p>Send us an email and we'll respond within 24 hours</p>
            <button className="primary-button">
              Send Email
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="support-card">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Documentation</h3>
            <p>Browse our comprehensive guides and tutorials</p>
            <button className="primary-button">
              View Docs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>How do I process refunds?</h4>
              <p>To process a refund, go to the Orders page, find the specific order, and click the 'Refund' button. Follow the prompts to complete the refund process.</p>
            </div>
            <div className="faq-card">
              <h4>How do I add new products?</h4>
              <p>Navigate to the Products page and click the 'Add Product' button. Fill in the required information, including name, price, and inventory levels.</p>
            </div>
            <div className="faq-card">
              <h4>How do I export my sales data?</h4>
              <p>You can export your sales data from the Analytics page. Click the 'Export' button and choose your preferred format (CSV or PDF).</p>
            </div>
            <div className="faq-card">
              <h4>How do I manage my account settings?</h4>
              <p>Access your account settings by clicking on your profile picture in the top right corner and selecting 'My Account'. Here you can update your personal information and security preferences.</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-section">
          <div className="section-header">
            <h2>Contact Support</h2>
          </div>
          <div className="contact-card">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="What can we help you with?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Describe your issue in detail..."
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="primary-button">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
