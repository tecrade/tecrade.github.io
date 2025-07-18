import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidenav/Sidebar';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scroll 
        ? 'bg-[rgba(10,17,24,0.7)]' 
        : 'bg-[rgba(10,17,24,0.8)]'
    }`}>
      <div className="container-fluid px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="text-[var(--light)] font-bold text-xl font-mono border-2 border-transparent hover:border-[var(--light)] px-2 py-1 rounded transition-all duration-300">
            tecrade
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1" id="navbarSupportedContent">
            <ul className="flex items-center space-x-8 justify-center flex-1">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className="text-[var(--light)] font-mono font-bold px-2 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300 relative focus:after:content-[''] focus:after:absolute focus:after:w-full focus:after:h-0.5 focus:after:bg-[var(--blue)] focus:after:left-0 focus:after:right-0 focus:after:top-full focus:after:bottom-0"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/portfolio" 
                  className="text-[var(--light)] font-mono font-bold px-2 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300 relative focus:after:content-[''] focus:after:absolute focus:after:w-full focus:after:h-0.5 focus:after:bg-[var(--blue)] focus:after:left-0 focus:after:right-0 focus:after:top-full focus:after:bottom-0"
                >
                  PORTFOLIO
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className="text-[var(--light)] font-mono font-bold px-2 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300 relative focus:after:content-[''] focus:after:absolute focus:after:w-full focus:after:h-0.5 focus:after:bg-[var(--blue)] focus:after:left-0 focus:after:right-0 focus:after:top-full focus:after:bottom-0"
                >
                  ABOUT
                </Link>
              </li>
            </ul>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <input 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              className="px-3 py-1 bg-transparent border border-[var(--light)]/30 text-[var(--light)] rounded focus:outline-none focus:border-[var(--blue)] transition-all duration-300"
            />
            <button 
              type="submit" 
              className="text-[var(--light)] hover:text-[var(--blue)] border-2 border-transparent hover:border-[var(--blue)] hover:rounded-md px-2 py-1 transition-all duration-300"
            >
              <i className="fas fa-search" id="navsearch"></i>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[var(--blue)] hover:text-[var(--blue)] border-2 border-transparent hover:border-[var(--blue)] p-2 rounded transition-all duration-300"
            type="button"
            aria-controls="navbarSupportedContent" 
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span><i className="fa-solid fa-bars-staggered"></i></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[var(--light)]/20">
            <div className="flex flex-col items-center space-y-2">
              <Link 
                to="/" 
                className="text-center text-[var(--light)] font-mono font-bold px-3 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                to="/portfolio" 
                className="text-center text-[var(--light)] font-mono font-bold px-3 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                PORTFOLIO
              </Link>
              <Link 
                to="/about" 
                className="text-center text-[var(--light)] font-mono font-bold px-3 py-2 border-2 border-transparent hover:border-[var(--blue)] hover:text-[var(--blue)] hover:rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
            </div>
            <div className="flex justify-center pt-4 border-t border-[var(--light)]/20">
              <Sidebar customclass="menuicons" />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[var(--light)]/20" />
    </nav>
  );
};

export default Navbar; 