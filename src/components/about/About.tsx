import { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { TypeAnimation } from 'react-type-animation';
import Contact from '../contact/Contact';



// Circle Progress Component
const CircleProgress = ({
  iconclass,
  title,
  level,
}: {
  iconclass: string;
  title: string;
  level: 'Extreme' | 'Efficient' | 'Moderate';
}) => {
  const percentMap = {
    Extreme: 95,
    Efficient: 80,
    Moderate: 60,
  };
  const percent = percentMap[level];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress
    const timeout = setTimeout(() => setProgress(percent), 300);
    return () => clearTimeout(timeout);
  }, [percent]);

  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-block m-3 select-none">
      <svg width={size} height={size} className="block transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
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
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
        <i className={`${iconclass} text-lg mb-1 text-[var(--blue)]`}></i>
        <span className="text-[11px] font-bold font-mono tracking-wide text-[var(--light)] truncate max-w-full uppercase">{title}</span>
        <span className="text-[9px] text-[var(--light)]/50 mt-0.5 font-mono">{level}</span>
      </div>
    </div>
  );
};


const Timeline = () => {
  const timelineData = [
    {
      icon: 'fas fa-cake-candles',
      time: '🎂 2004',
      date: 'July 27, 2004',
      content: 'Born in Kerala, India'
    },
    {
      icon: 'fas fa-graduation-cap',
      time: '🎓 2019',
      date: 'Leader, Little Kites Community',
      content: 'ST Thomas College HSS, Thrissur'
    },
    {
      icon: 'fas fa-newspaper',
      time: '📰 2020',
      date: 'Elected School Editor',
      content: 'ST Thomas College HSS, Thrissur'
    },
    {
      icon: 'fas fa-trophy',
      time: '🏆 2024',
      date: 'March',
      content: 'Winner – First Hackathon\nNSS College of Engineering, Palakkad'
    },
    {
      icon: 'fas fa-rocket',
      time: '🚀 2024',
      date: 'October',
      content: 'Global Nominee\nNASA Space Apps Challenge 2024'
    },
    {
      icon: 'fas fa-trophy',
      time: '🏆 2025',
      date: 'February',
      content: 'Winner – Kochi Hackathon 2025'
    },
    {
      icon: 'fas fa-bolt',
      time: '⚡ 2025',
      date: 'February 2025 – February 2026',
      content: 'Join Secretary\nIEEE NSSCE Student Branch'
    },
    {
      icon: 'fas fa-robot',
      time: '🤖 2025',
      date: 'February 2025 – February 2026',
      content: 'Vice Chair\nIEEE Robotics and Automation Society\nNSSCE Student Branch Chapter'
    },
    {
      icon: 'fas fa-globe',
      time: '🌍 2025',
      date: 'March 2025 – February 2026',
      content: 'Webmaster\nIEEE Power & Energy Society\nKerala Section'
    },
    {
      icon: 'fas fa-briefcase',
      time: '💼 2025',
      date: 'August',
      content: 'Started Internship at Hawr Learn\n\nContributed to:\n• Web platform development\n• AI-powered English learning solutions\n• Educational edge-device development\n• Child-focused conversational learning systems\n• Grammar and pronunciation assistance'
    },
    {
      icon: 'fas fa-trophy',
      time: '🏆 2025',
      date: 'October',
      content: 'Winner – Regen Hackathon\nCollege of Engineering Kalloopara'
    },
    {
      icon: 'fas fa-bolt',
      time: '⚡ 2026',
      date: 'February',
      content: 'Secretary\nIEEE NSSCE Student Branch'
    },
    {
      icon: 'fas fa-robot',
      time: '🤖 2026',
      date: 'February',
      content: 'Chair\nIEEE Robotics and Automation Society\nNSSCE Student Branch Chapter'
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
                <p className="text-[var(--light)] font-['poppins'] font-medium whitespace-pre-line">{item.content}</p>
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
          "Hi, I'm Jovin. I build intelligent software, embedded systems, and automation solutions that transform ideas into practical tools and real-world innovations.",
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
    src="/images/jovinbysora.webp" 
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-8 lg:mb-12">
          {/* Card 1: Development */}
          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1)] animate-fade" data-aos="fade-right" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6 font-mono text-[var(--blue)]">Development</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-solid fa-globe" title="WEB" level="Extreme" />
              <CircleProgress iconclass="fa-solid fa-mobile-screen-button" title="APPS" level="Moderate" />
              <CircleProgress iconclass="fa-solid fa-brain" title="AI & ML" level="Moderate" />
            </div>
          </div>

          {/* Card 2: Programming & Technologies */}
          <div className="lg:col-span-2 flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1)]" data-aos="fade-up" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6 font-mono text-[var(--blue)]">Programming & Technologies</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-brands fa-python" title="PYTHON" level="Efficient" />
              <CircleProgress iconclass="fa-solid fa-c" title="C++" level="Efficient" />
              <CircleProgress iconclass="fa-solid fa-code" title="C" level="Efficient" />
              <CircleProgress iconclass="fa-brands fa-js" title="JS" level="Efficient" />
              <CircleProgress iconclass="fa-solid fa-file-code" title="JSX" level="Efficient" />
              <CircleProgress iconclass="fa-brands fa-react" title="React" level="Efficient" />
              <CircleProgress iconclass="fa-brands fa-java" title="Java" level="Moderate" />
              <CircleProgress iconclass="fa-brands fa-flutter" title="Flutter" level="Moderate" />
            </div>
          </div>

          {/* Card 3: Languages I Can Speak */}
          <div className="flex flex-col text-center min-h-[300px] text-[var(--light)] border-2 border-[var(--lightblue)] p-6 bg-[rgba(var(--dark),0.8)] rounded-[0.5rem] shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1)]" data-aos="fade-left" data-aos-duration="900">
            <h4 className="text-xl font-bold mb-6 font-mono text-[var(--blue)]">Languages I Can Speak</h4>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <CircleProgress iconclass="fa-solid fa-language" title="Malayalam" level="Extreme" />
              <CircleProgress iconclass="fa-solid fa-comments" title="ENGLISH" level="Efficient" />
              <CircleProgress iconclass="fa-solid fa-language" title="HINDI" level="Moderate" />
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