import { useEffect } from 'react';
import Link from 'next/link';

function Navbar() {
  useEffect(() => {
    // Initialize Bootstrap components after the component mounts
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    const handleToggleClick = () => {
      navbarCollapse.classList.toggle('show');
    };

    toggleButton.addEventListener('click', handleToggleClick);

    return () => {
      // Clean up event listeners when the component unmounts
      toggleButton.removeEventListener('click', handleToggleClick);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">Hiligaynon Gid</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/dictionary" legacyBehavior>
                <a className="nav-link">Dictionary</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/grammar" legacyBehavior>
                <a className="nav-link">Grammar</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/archives" legacyBehavior>
                <a className="nav-link">Archives</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/messages" legacyBehavior>
                <a className="nav-link">Messages</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" legacyBehavior>
                <a className="nav-link">About</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
