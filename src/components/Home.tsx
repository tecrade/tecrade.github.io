import Banner from './banner/Banner';
import About from './about/About';
import PortfolioCarousel from './portfolio/PortfolioCarousel';

const Home = () => {
  return (
    <div>
      <Banner />
      <PortfolioCarousel />
      <About />
    </div>
  );
};

export default Home;