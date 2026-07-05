import React from 'react';
import "../Styles/Userhome.css"
const Header = () => {
  return (
    <div className="header0">
      <h1 className='mx-auto'>Contact Us</h1>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer0">
      <p>&copy; 2024 My Restuarnt</p>
    </footer>
  );
};

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact-container">
        <h2>Contact Information</h2>
        <p>Feel free to reach out to us via email or phone:</p>
        <ul className="contact-list">
          <li>Email: myrestaurant@gmail.com</li>
          <li>Phone: 987-965-145</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
