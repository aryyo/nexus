import "../styles/Help.css";

const Help = () => {
  return (
    <div className="help-page">
      <div className="overview">
        <p>Help & Support</p>
      </div>

      <div className="help-content">
        <div className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>How do I process refunds?</h4>
              <p>
                Navigate to Orders, select the order, and click 'Refund'. Follow the prompts to complete the refund process.
              </p>
            </div>
            <div className="faq-card">
              <h4>How do I add new products?</h4>
              <p>
                Go to Products, click 'Add Product', and fill in the product details including name, price, and inventory.
              </p>
            </div>
            <div className="faq-card">
              <h4>How do I export sales data?</h4>
              <p>
                Visit the Analytics section and use the 'Export' button to download your data in CSV or PDF format.
              </p>
            </div>
            <div className="faq-card">
              <h4>Managing account settings?</h4>
              <p>
                Click your profile picture and select 'My Account' to update your personal information and preferences.
              </p>
            </div>
            <div className="faq-card">
              <h4>How to track inventory?</h4>
              <p>
                Monitor stock levels in the Products section. Set up low stock alerts in your inventory settings.
              </p>
            </div>
            <div className="faq-card">
              <h4>Setting up shipping rates?</h4>
              <p>
                Configure shipping options in Settings → Shipping. Define zones, rates, and delivery methods.
              </p>
            </div>
            <div className="faq-card">
              <h4>How to handle returns?</h4>
              <p>
                Process returns through the Orders section. Create a return label and update inventory once received.
              </p>
            </div>
            <div className="faq-card">
              <h4>Customizing invoices?</h4>
              <p>
                Modify invoice templates in Settings → Documents. Add your logo and customize the layout.
              </p>
            </div>
            <div className="faq-card">
              <h4>Managing tax settings?</h4>
              <p>
                Configure tax rates and rules in Settings → Taxes. Set up automatic tax calculations by region.
              </p>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have a question or need assistance? Our team is here to help you.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Email Us</h4>
                    <p>support@nexus.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
