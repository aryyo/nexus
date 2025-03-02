import "../styles/Help.css";

const Help = () => {
  return (
    <div className="help-container">
      <div className="help-header">
        <p>Help & Support</p>
      </div>
      <div className="help-content">
        <div className="support-options">
          <div className="support-card">
            <span className="support-icon">💬</span>
            <h2>Live Chat</h2>
            <p>Chat with our support team</p>
            <a href="#" className="get-started-link">
              Get Started →
            </a>
          </div>
          <div className="support-card">
            <span className="support-icon">📧</span>
            <h2>Email Support</h2>
            <p>Get help via email</p>
            <a href="#" className="get-started-link">
              Get Started →
            </a>
          </div>
          <div className="support-card">
            <span className="support-icon">📄</span>
            <h2>Documentation</h2>
            <p>Read our guides</p>
            <a href="#" className="get-started-link">
              Get Started →
            </a>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            <details>
              <summary>How do I process refunds?</summary>
              <p>
                To process a refund, go to the Orders page, find the specific
                order, and click the 'Refund' button. Follow the prompts to
                complete the refund process.
              </p>
            </details>
            <details>
              <summary>How do I add new products?</summary>
              <p>
                Navigate to the Products page and click the 'Add Product'
                button. Fill in the required information, including name, price,
                and inventory levels.
              </p>
            </details>
            <details>
              <summary>How do I export my sales data?</summary>
              <p>
                You can export your sales data from the Analytics page. Click
                the 'Export' button and choose your preferred format (CSV or
                PDF).
              </p>
            </details>
            
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="What can we help you with?"
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Describe your issue..."
            ></textarea>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
