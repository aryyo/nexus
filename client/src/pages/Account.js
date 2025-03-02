import "../styles/Account.css";

const Account = () => {
  return (
    <div className="account-container">
      <div className="account-overview">
        <p>My Account</p>
      </div>
      <div className="account-wrapper">
        <div className="account-content">
          <div className="profile-form">
            <div className="profile-picture">
              <img src="/profile.jpg" alt="" />
              <div className="picture-buttons">
                <button className="upload-button">Upload</button>
                <button className="remove-button">Remove</button>
              </div>
            </div>

            <div className="form-fields">
              <div className="field-group">
                <label>Name</label>
                <input type="text" placeholder="Jane Doe" />
              </div>
              <div className="field-group">
                <label>Title</label>
                <input type="text" placeholder="Enter Title" />
              </div>
              <div className="field-group">
                <label>Email</label>
                <input type="email" placeholder="johndoe@example.com" />
              </div>
              <div className="field-group">
                <label>Phone Number</label>
                <input type="text" placeholder="+1 (000) 650 321 456" />
              </div>
              <div className="field-group">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="4517 Washington Ave. Manchester, Kentucky 39495"
                />
              </div>
            </div>
            <div className="save-container">
              <button className="save-button">Save</button>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Account;
