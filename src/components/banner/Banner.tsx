import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Typer from './Typer';

const Banner = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <hr className="border-[var(--light)] opacity-20" />

          {/* Left side - Name and Title */}
          <div className="w-full md:w-1/2">
            <div
              className="w-auto border-2 border-transparent text-center mx-auto mt-12 mb-8 md:my-24 leading-[3rem] md:leading-[5rem] text-[var(--light)]"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <h1 className="mt-8 md:mt-16 text-[36px] sm:text-[48px] md:text-[60px] tracking-[0.3rem] sm:tracking-[0.5rem] md:tracking-[0.7rem] font-normal">
                JOVIN JOHN
              </h1>
              <div className="mt-4 md:mt-8 tracking-[0.3rem] sm:tracking-[0.5rem] text-[16px] sm:text-[20px] md:text-[24px]">
                <h3 className="text-[var(--light)] whitespace-nowrap">I'M A <Typer /></h3>
              </div>
              <div className="mt-6 md:mt-8">
                <Link
                  to="/contact"
                  className="relative inline-flex items-center justify-center h-12 w-auto border-2 border-[var(--blue)] text-[var(--blue)] rounded-[0.3rem] z-[1] shadow-[0px_5px_15px_rgba(9,156,242,0.1),0px_10px_20px_rgba(0,91,234,0.1)] hover:text-[var(--light)] px-6 after:content-[''] after:absolute after:h-full after:w-[30%] after:bg-transparent after:top-0 after:left-0 after:right-0 after:-z-[1] hover:after:w-full hover:after:bg-[var(--blue)] hover:after:transition-[width_0.5s]"
                >
                  Connect me
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Picture */}
          <div className="w-full md:w-1/2">
            <div
              className="h-[260px] w-[260px] sm:h-[360px] sm:w-[360px] md:h-[500px] md:w-[500px] border-0 border-[var(--light)] mx-auto mb-10 md:my-8 overflow-hidden rounded-lg"
              data-aos="zoom-in-left"
              data-aos-duration="1500"
            >
              <img
                src="/images/profilepic2.png"
                alt="Jovin John"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <hr className="border-[var(--light)] opacity-20" />
      </div>
    </div>
  );
};

export default Banner;