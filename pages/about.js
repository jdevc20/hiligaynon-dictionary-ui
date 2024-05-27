import React from "react";

function About() {
  return (
    <div className="container mt-5">
      <header>
        <h1>About Us</h1>
      </header>
      
      <main>
        <section>
          <h2>Our Team</h2>
          <p>Introduce your team members here.</p>
        </section>
        
        <section>
          <h2>Contact Us</h2>
          <p>If you have any inquiries or feedback, feel free to reach out to us at <a href="mailto:windelbedia@gmail.com">windelbedia@gmail.com</a>.</p>
        </section>
      </main>
      
      <footer>
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
