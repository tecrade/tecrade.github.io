import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { TypeAnimation } from 'react-type-animation';
import Contact from '../contact/Contact';



// Circle Progress Component
const CircleProgress = ({
  iconclass,
  title,
  percent,
}: {
  iconclass: string;
  title: string;
  percent: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress
    const timeout = setTimeout(() => setProgress(percent), 300);
    return () => clearTimeout(timeout);
  }, [percent]);

  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-block m-5">
      <svg width={size} height={size} className="block">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fff"
          strokeWidth={strokeWidth}
          fill="black"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--blue)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <i className={`${iconclass} mb-1`}></i>
        <span className="text-sm">{title}</span>
        <span className="text-xs mt-1">{percent}%</span>
      </div>
    </div>
  );
};


// Timeline Component
const Timeline = () => {
  const timelineData = [
    {
      icon: 'fas fa-brain',
      time: 'MAY 21',
      date: '7:45PM',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-camera',
      time: '8:00 AM',
      date: 'May 18',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-campground',
      time: '7:25 PM',
      date: 'May 6',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-sun',
      time: '3:55 PM',
      date: 'Apr 26',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-palette',
      time: '5:24 PM',
      date: 'Apr 12',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-laugh-beam',
      time: '11:25 AM',
      date: 'Apr 11',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    },
    {
      icon: 'fas fa-pizza-slice',
      time: '12:30 PM',
      date: 'Apr 5',
      content: 'Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.'
    }
  ];

  return (
    <div className="py-5 max-w-6xl mx-auto">
      <div className="relative text-white">
        {/* Timeline Line */}
        <div className="after:content-[''] after:absolute after:w-[3px] after:bg-[#bbb] after:top-0 after:bottom-0 after:left-1/2 after:-ml-[3px]"></div>
        
        {timelineData.map((item, index) => (
          <div 
            key={index}
            className={`relative bg-inherit w-1/2 ${
              index % 2 === 0 
                ? 'pr-10 pb-5 left-0 after:content-[\'\'] after:absolute after:w-[25px] after:h-[25px] after:-right-[11px] after:bg-[var(--dark)] after:top-[15px] after:border-[3px] after:border-solid after:border-[var(--lightblue)] after:rounded-full after:z-[1] before:content-[\'_\'] before:absolute before:top-[18px] before:z-[1] before:right-[30px] before:border-[10px] before:border-solid before:border-transparent before:border-l-[rgba(37,117,252,1)]' 
                : 'pl-10 pb-5 left-1/2 after:content-[\'\'] after:absolute after:w-[25px] after:h-[25px] after:-left-[14px] after:bg-[var(--dark)] after:top-[15px] after:border-[3px] after:border-solid after:border-[var(--lightblue)] after:rounded-full after:z-[1] before:content:[\'_\'] before:absolute before:top-[18px] before:z-[1] before:left-[30px] before:border-[10px] before:border-solid before:border-transparent before:border-r-[rgba(37,117,252,1)]'
            }`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-duration="900"
          >
            <div className={`card p-4 ${
              index % 2 === 0 
                ? 'bg-gradient-to-r from-[rgb(12,99,231)] to-[rgba(37,117,252,1)] shadow-[0px_10px_20px_rgba(9,156,242,0.1),0px_20px_30px_rgba(9,156,242,0.1)]' 
                : 'bg-gradient-to-l from-[rgb(12,99,231)] to-[rgba(37,117,252,1)] shadow-[0px_10px_20px_rgba(9,156,242,0.1),0px_20px_30px_rgba(9,156,242,0.1)]'
            }`}>
              <div className="card-body p-4">
                <i className={`${item.icon} text-2xl mb-3`}></i>
                <h4>{item.time}</h4>
                <p className="small text-white/50 mb-4">{item.date}</p>
                <p className="text-[var(--light)] font-['poppins'] font-medium">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// About Typer Component
const AboutTyper = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          'Hi,I\'m jovin.My expertise is to develop and maintain websites,apps & APIs to people around me and make their jobs more easy & efficient. ',
          5000,
        ]}
        wrapper="div"
        speed={50}
        style={{ display: 'inline-block' }}
        repeat={0}
      />
    </div>
  );
};

const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="w-full overflow-hidden py-8 lg:py-0">
      {/* About Section */}
      <section className="section about mb-16 lg:mb-24">
        <div className="row mb-8 lg:mb-12">
          <div className="col-12 title">
            <h1 className="text-center text-[var(--blue)] mb-8 lg:mb-12">ABOUT</h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-8 lg:gap-12 px-4 lg:px-8 mb-8 lg:mb-12">
          {/* Profile Image Column */}
          <div className="flex justify-center lg:justify-start">
  <img 
    src="public/images/jovinbysora.webp" 
    alt="Profile picture" 
    className="object-cover object-center rounded-full border-4 border-transparent h-[171px] w-[180px]" 
  />
</div>

          
          {/* About Text Column */}
          <div className="flex-1 lg:max-w-lg">
            <div className="h-auto w-auto text-[var(--light)] font-['poppins'] font-stretch-condensed rounded-[1%] text-[30px] font-normal border-none p-6 lg:p-10">
              <AboutTyper />
            </div>
          </div>
        </div>
        <hr className="border-[var(--light)]/20" />
      </section>

      {/* Timeline Section */}
      <section className="timeline px-4 lg:px-8 mb-16 lg:mb-24">
        <div className="row mb-8 lg:mb-12">
          <div className="col-12 title">
            <h1 className="text-center text-[var(--blue)] mb-8 lg:mb-12">TIMELINE</h1>
          </div>
        </div>
        <div className="timelinediv mb-8 lg:mb-12">
          <Timeline />
        </div>
        <hr className="border-[var(--light)]/20" />
      </section>

      {/* Skills Section */}
      <section className="skills px-4 lg:px-8 mb-16 lg:mb-24">
        <div className="row mb-8 lg:mb-12">
          <div className="col-12 title">
            <h1 className="text-center text-[var(--blue)] mb-8 lg:mb-12">MY SKILLS</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8 lg:mb-12">
          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]" data-aos="fade-right" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6">Development</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-solid fa-globe" title="WEB" percent={75} />
              <CircleProgress iconclass="fa-solid fa-mobile-screen-button" title="APPS" percent={20} />
              <CircleProgress iconclass="fa-solid fa-gears" title="AI&ML" percent={0} />
            </div>
          </div>

          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]" data-aos="fade-left" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6">Programming Languages</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-solid fa-c" title="CPP" percent={0} />
              <CircleProgress iconclass="fa-brands fa-js" title="JS" percent={0} />
              <CircleProgress iconclass="fa-brands fa-python" title="PYTHON" percent={0} />
              <CircleProgress iconclass="fa-brands fa-flutter" title="FLUTTER" percent={0} />
            </div>
          </div>

          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]" data-aos="fade-right" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6">Frameworks</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-brands fa-react" title="REACT" percent={0} />
              <CircleProgress iconclass="fa-brands fa-bootstrap" title="Bootstrap" percent={0} />
              <CircleProgress iconclass="fa-solid fa-database" title="DSA" percent={0} />
              <CircleProgress iconclass="fa-brands fa-node-js" title="NODE" percent={0} />
            </div>
          </div>

          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]" data-aos="fade-left" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6">Languages I Can Speak</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-solid fa-e" title="ENGLISH" percent={0} />
              <CircleProgress iconclass="fa-solid fa-h" title="HINDI" percent={0} />
              <CircleProgress iconclass="fa-solid fa-m" title="Malayalam" percent={0} />
            </div>
          </div>
        </div>
      </section>
      <hr className="border-[var(--light)]/20 mb-16 lg:mb-24" />

      {/* Contact Section */}
      <section className="contact px-4 lg:px-8 mb-16 lg:mb-24">
        <div className="row mb-8 lg:mb-12">
          <div className="col-12 title">
            <h1 className="text-center text-[var(--blue)] mb-8 lg:mb-12">CONTACT</h1>
          </div>
        </div>
        <div className="mb-8 lg:mb-12">
          <Contact />
        </div>
        <hr className="border-[var(--light)]/20" />
      </section>
    </div>
  );
};

export default About; 