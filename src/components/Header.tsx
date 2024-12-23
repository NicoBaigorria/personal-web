import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '@/styles/header.module.scss';  // Import the SCSS module

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Toggle the mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        {/* Navbar links container */}
        <div className={`${styles.navbarLinks} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navbarLinks}>
            <li><a onClick={() => router.push('/')}>Home</a></li>
            <li><a onClick={() => router.push('/projects')}>Projects</a></li>
            <li><a onClick={() => router.push('/gallery')}>Gallery</a></li>
          </ul>

          <div className={styles.socialLinks}>
            <a href="https://github.com/NicoBaigorria" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/nicolas-baigorria/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:nicobaig@hotmail.com" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* Hamburger Menu Icon for mobile */}
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <div className={styles.burgerIcon}></div>
          <div className={styles.burgerIcon}></div>
          <div className={styles.burgerIcon}></div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
