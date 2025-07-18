
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
//importing components
import Navbar from '../src/components/navbar/Navbar';
import Banner from './components/banner/Banner';
import Portfolio from './components/portfolio/Portfolio.js';
import CarouselSection from '../src/components/carousel/CarouselSection.js';
import About from './components/about/About.js';
import '../src/components/navbar/sidenav/Sidebar.js'
import Sidebar from '../src/components/navbar/sidenav/Sidebar.js';
import Contact from './components/contact/Contact.js';
import Home from './Home.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//main code
function App() {

  return (
    <BrowserRouter>
    <div className='container-fluid'>
      <Navbar/>
      <div className='row'>
      <div className='d-none d-lg-block col-lg-auto'>
          <Sidebar customclass='sidebar'/>
        </div>
        <div className='col'>
    <Routes>
      <Route index path="/" element={<Home/>}/>
      <Route  path="/portfolio" element={<Portfolio/>}/>
      <Route  path="/about" element={<About/>}/>
      <Route  path="/contact" element={<Contact/>}/>

    </Routes>
      </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
