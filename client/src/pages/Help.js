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
      </div>

      
    </div>
  );
};

export default Help;
