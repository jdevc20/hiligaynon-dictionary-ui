import React from "react";

function About() {
  return (
    <>
      <div className="page"/>
      <div className="container home-landing-message">
        <header>
          <h1>About Us</h1>
        </header>

        <main>
          <section>
            <h2>Our Team</h2>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any inquiries or feedback, feel free to reach out to
              us at{" "}
              <a href="mailto:windelbedia@gmail.com">windelbedia@gmail.com</a>.
            </p>
          </section>
        </main>

        <footer>
          <p>&copy; 2024 Hiligaynon!</p>
        </footer>
      </div>
    </>
  );
}

export default About;
