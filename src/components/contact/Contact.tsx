import { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Sidebar from '../navbar/sidenav/Sidebar';
import emailjs from '@emailjs/browser';

// ── Success Modal ──────────────────────────────────────────────
const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-250 ${
        closing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'rgba(10,10,30,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-[360px] w-[90%] rounded-[1rem] p-10 text-center border-2 border-[var(--blue)] font-['poppins'] transition-all duration-250 ${
          closing ? 'opacity-0 translate-y-5' : 'animate-slide-up'
        }`}
        style={{
          background: 'rgba(13,13,31,0.97)',
          boxShadow:
            '0 0 40px rgba(0,91,234,0.25), 0 10px 30px rgba(9,156,242,0.1), inset 0 1px 0 rgba(9,156,242,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #099cf2, transparent)' }}
        />

        {/* Animated check icon */}
        <div
          className="w-[72px] h-[72px] rounded-full border-2 border-[var(--lightblue)] flex items-center justify-center mx-auto mb-5 animate-pulse-glow"
          style={{
            background: 'rgba(9,156,242,0.08)',
            boxShadow: '0 0 20px rgba(9,156,242,0.3), inset 0 0 15px rgba(9,156,242,0.05)',
          }}
        >
          <i
            className="fa-solid fa-check text-2xl text-[var(--lightblue)]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(9,156,242,0.8))' }}
          />
        </div>

        <h2 className="text-[var(--light)] text-xl font-bold mb-2 tracking-wide">
          Message Sent!
        </h2>
        <p className="text-[rgba(212,212,222,0.55)] text-sm leading-relaxed mb-7">
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>

        <button
          onClick={handleClose}
          className="border-2 border-[var(--blue)] text-[var(--lightblue)] text-base font-['poppins'] font-medium px-8 py-3 rounded-lg relative overflow-hidden group transition-all duration-300 hover:text-[var(--light)] hover:shadow-[0_0_15px_rgba(0,91,234,0.3)]"
          style={{ boxShadow: '0 5px 15px rgba(9,156,242,0.1), 0 10px 20px rgba(0,91,234,0.1)' }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Close
            <i className="fa-solid fa-xmark text-sm relative z-10" />
          </span>
          <div className="absolute inset-0 bg-[var(--blue)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </button>
      </div>
    </div>
  );
};

// ── Contact ────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Aos.init();
    emailjs.init({
      publicKey: 'pP9uxCM_iIz27sb0o',
      blockHeadless: true,
      blockList: {
        list: ['foo@emailjs.com', 'bar@emailjs.com'],
        watchVariable: form.email,
      },
      limitRate: { id: 'app', throttle: 10000 },
    });
  }, []);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send('service_r4ui4jc', 'template_eeugfmq', {
        name: form.name,
        email: form.email,
        message: form.message,
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setForm({ name: '', email: '', message: '' });
          setShowModal(true); // ← show modal instead of alert
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

  return (
    <div className="container contactcontainer text-[var(--light)] font-['poppins'] text-lg">
      {/* ── Success Modal ── */}
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}

      <div
        className="contactdiv bg-[rgba(var(--dark),0.7)] backdrop-blur-sm border-2 border-[var(--lightblue)] rounded-[1rem] p-10 shadow-[0px_10px_20px_rgba(0,91,234,0.1),0px_30px_30px_rgba(212,212,222,0.1),0px_30px_40px_rgba(9,156,242,0)]"
        data-aos="fade-up-right"
        data-aos-duration="1000"
        id="contactbox"
      >
        <h1 className="text-[var(--blue)] mb-6 text-2xl font-bold">Connect with me</h1>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="message" className="form-label block text-[var(--light)] mb-2">
              Message
            </label>
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
              <i className="fa-solid fa-paper-plane ms-2 relative z-10 drop-shadow-[0_0_3px_rgba(0,91,234,0.6)]" />
              <div className="absolute inset-0 bg-[var(--blue)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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