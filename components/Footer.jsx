import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Hiligaynon Hub. All rights reserved.</p>
        <p>
          <a href="/about-us">About us</a> | <a href="/volunter">Volunter</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
