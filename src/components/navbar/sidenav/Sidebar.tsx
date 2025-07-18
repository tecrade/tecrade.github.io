import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './Sidebar.module.css';

interface SidebarProps {
  customclass?: string;
}

const Sidebar = ({ customclass }: SidebarProps) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const links = {
    insta: "https://www.instagram.com/thetecrade?utm_source=qr&igsh=NXU0NnBqemd3cjJx",
    wa: "https://wa.me/9562066585",
    in: "https://www.linkedin.com/in/jovin-john-9699122ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    git: "https://github.com/tecrade"
  };

  return (
    <nav className={customclass === 'menuicons' ? styles.menuicons : styles.sidebar} data-aos="fade-up" data-aos-duration="900">
      <a href={links.git} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-github"></i>
      </a>
      <a href={links.in} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a href={links.insta} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-instagram"></i>
      </a>
      <a href={links.wa} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </nav>
  );
};

export default Sidebar; 