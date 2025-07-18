import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/navbar/sidenav/Sidebar';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';
import Contact from './components/contact/Contact';
import StarsCanvas from './components/banner/StarsCanvas';

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen">
        <StarsCanvas />
        <Navbar />
        <div className="flex w-full">
          {/* Sidebar - hidden on mobile, visible on large screens */}
          <div className="hidden lg:block w-[80px]">
            <Sidebar customclass="sidebar" />
          </div>
          
          {/* Main content area - with padding on large screens */}
          <main className="flex-1 w-full ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
