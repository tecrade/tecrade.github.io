import { useState, useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Sidebar from '../navbar/sidenav/Sidebar';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init();
    emailjs.init({
      publicKey: 'pP9uxCM_iIz27sb0o',
      // Do not allow headless browsers
      blockHeadless: true,
      blockList: {
        // Block the suspended emails
        list: ['foo@emailjs.com', 'bar@emailjs.com'],
        // The variable contains the email address
        watchVariable:form.email,
      },
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  }, []);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };
    emailjs.send('service_clmuwxw','template_eeugfmq', templateParams).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        setLoading(false)
        setForm({ name: '', email: '', message: '' });
      },
      (error) => {
        console.log('FAILED...', error);
        setLoading(false)
      },
    );
  };

 

  return (
    <div className="container contactcontainer text-[var(--light)] font-['poppins'] text-lg">
      <div 
        className="contactdiv bg-[rgba(var(--dark),0.7)] backdrop-blur-sm border-2 border-[var(--lightblue)] rounded-[1rem] p-10 shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]" 
        data-aos="fade-up-right" 
        data-aos-duration="1000" 
        id="contactbox"
      >
        <h1 className="text-[var(--blue)] mb-6 text-2xl font-bold">Connect with me</h1>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label block text-[var(--light)] mb-2">
              <i className="fa-solid fa-user me-2 text-[var(--light)] drop-shadow-[0_0_5px_rgba(212,212,222,0.8)]"></i>Name
            </label>
            <input 
              type="text" 
              className="form-control w-full px-3 py-2 bg-transparent border-2 border-[var(--light)] text-[var(--light)] rounded focus:outline-none focus:border-[var(--blue)] focus:shadow-[0_0_10px_rgba(212,212,222,0.5)] transition-all duration-300" 
              id="name" 
              name="name"
              value={form.name}
              onChange={handleChanges}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-[var(--light)] mb-2">
              <i className="fa-solid fa-envelope me-2 text-[var(--light)] drop-shadow-[0_0_5px_rgba(212,212,222,0.8)]"></i>Email
            </label>
            <input 
              type="email" 
              className="form-control w-full px-3 py-2 bg-transparent border-2 border-[var(--light)] text-[var(--light)] rounded focus:outline-none focus:border-[var(--blue)] focus:shadow-[0_0_10px_rgba(212,212,222,0.5)] transition-all duration-300" 
              id="email" 
              name="email"
              value={form.email}
              onChange={handleChanges}
              placeholder="name@example.com" 
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="message" className="form-label block text-[var(--light)] mb-2">Message</label>
            <textarea 
              className="form-control w-full px-3 py-2 bg-transparent border-2 border-[var(--light)] text-[var(--light)] rounded focus:outline-none focus:border-[var(--blue)] focus:shadow-[0_0_10px_rgba(212,212,222,0.5)] transition-all duration-300 resize-none" 
              id="message" 
              name="message"
              value={form.message}
              onChange={handleChanges}
              rows={3} 
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          
          <div className="mb-3">
            <button 
              type="submit" 
              className="btn contactbtn text-[var(--blue)] text-lg text-center block mx-auto border-2 border-[var(--blue)] relative z-[1] shadow-[0px_5px_15px_rgba(9,156,242,0.1),0px_10px_20px_rgba(0,91,234,0.1)] hover:text-[var(--light)] px-6 py-3 rounded transition-all duration-300 overflow-hidden group font-['poppins'] hover:shadow-[0_0_15px_rgba(0,91,234,0.3)]"
            >
              <span className="relative z-10">Send</span>
              <i className="fa-solid fa-paper-plane ms-2 relative z-10 drop-shadow-[0_0_3px_rgba(0,91,234,0.6)]"></i>
              <div className="absolute inset-0 bg-[var(--blue)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </form>
      </div>
      
      <div className="lg:hidden footericon shadow-[0px_5px_15px_rgba(9,156,242,0.1),0px_10px_20px_rgba(0,91,234,0.1)]">
        <Sidebar customclass="menuicons" />
      </div>
    </div>
  );
};

export default Contact; 