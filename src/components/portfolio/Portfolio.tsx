import { useState, useEffect } from 'react';
import 'aos/dist/aos.css'

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  link: string;
  github: string;
  demo: string;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'A modern e-commerce platform built with React and Node.js',
      fullDescription: 'A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Built with modern technologies for optimal performance and user experience.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['User Authentication', 'Product Management', 'Payment Processing', 'Order Tracking', 'Admin Dashboard'],
      link: '#',
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'AI Chat Application',
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      description: 'Intelligent chat application powered by machine learning',
      fullDescription: 'An AI-powered chat application that uses natural language processing to provide intelligent responses. Features include sentiment analysis, conversation history, and customizable AI models.',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      features: ['Natural Language Processing', 'Sentiment Analysis', 'Conversation History', 'Custom AI Models'],
      link: '#',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      description: 'Secure mobile banking application with biometric authentication',
      fullDescription: 'A secure mobile banking application with biometric authentication, real-time transaction monitoring, and advanced security features. Built for both iOS and Android platforms.',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      features: ['Biometric Authentication', 'Real-time Transactions', 'Security Monitoring', 'Cross-platform'],
      link: '#',
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      category: 'data',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      description: 'Interactive dashboard for real-time data visualization',
      fullDescription: 'An interactive dashboard that provides real-time data visualization with customizable charts, filters, and export capabilities. Perfect for business intelligence and analytics.',
      technologies: ['D3.js', 'React', 'Python', 'PostgreSQL'],
      features: ['Real-time Data', 'Interactive Charts', 'Custom Filters', 'Export Functionality'],
      link: '#',
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Social Media Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Full-featured social media platform with real-time messaging',
      fullDescription: 'A comprehensive social media platform featuring user profiles, posts, real-time messaging, notifications, and content moderation. Built with scalability in mind.',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Redis'],
      features: ['User Profiles', 'Real-time Messaging', 'Content Moderation', 'Notifications'],
      link: '#',
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'IoT Smart Home System',
      category: 'iot',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      description: 'Smart home automation system with IoT integration',
      fullDescription: 'A smart home automation system that integrates various IoT devices for lighting, temperature control, security, and energy management. Features mobile app control and voice commands.',
      technologies: ['Python', 'Arduino', 'React', 'MQTT'],
      features: ['Device Integration', 'Mobile Control', 'Voice Commands', 'Energy Management'],
      link: '#',
      github: '#',
      demo: '#'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    { id: 'web', name: 'Web Development', icon: 'fas fa-globe' },
    { id: 'mobile', name: 'Mobile Apps', icon: 'fas fa-mobile-alt' },
    { id: 'ai', name: 'AI/ML', icon: 'fas fa-brain' },
    { id: 'data', name: 'Data Science', icon: 'fas fa-chart-bar' },
    { id: 'iot', name: 'IoT', icon: 'fas fa-microchip' }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    // Add ripple effect
    const button = document.querySelector(`[data-filter="${filterId}"]`);
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => button.classList.remove('scale-95'), 150);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--blue)]/5 via-transparent to-[var(--blue)]/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--blue)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--blue)]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl lg:text-6xl font-bold text-[var(--light)] mb-4">
            My <span className="text-[var(--blue)]">Portfolio</span>
          </h1>
          <div className="w-24 h-1 bg-[var(--blue)] mx-auto mb-8"></div>
          <p className="text-[var(--light)]/80 text-lg max-w-2xl mx-auto">
            Explore my latest projects and see how I bring creative ideas to life through innovative solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter.id}
              data-filter={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`group relative px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 overflow-hidden ${
                activeFilter === filter.id
                  ? 'bg-[var(--blue)] text-[var(--light)] shadow-lg shadow-[var(--blue)]/25'
                  : 'bg-transparent border-2 border-[var(--light)]/30 text-[var(--light)] hover:border-[var(--blue)] hover:text-[var(--blue)] hover:shadow-lg hover:shadow-[var(--blue)]/10'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className={filter.icon}></i>
                {filter.name}
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-[var(--blue)]/20 to-[var(--blue)]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                activeFilter === filter.id ? 'scale-x-100' : ''
              }`}></div>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group relative bg-[rgba(var(--dark),0.7)] backdrop-blur-sm border border-[var(--blue)]/20 rounded-2xl overflow-hidden hover:border-[var(--blue)]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--blue)]/20 cursor-pointer transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Icons */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center text-[var(--light)] hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-eye"></i>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--blue)]/80 text-[var(--light)] text-xs rounded-full font-mono uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--light)] mb-3 group-hover:text-[var(--blue)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[var(--light)]/70 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[var(--blue)]/20 text-[var(--blue)] text-sm rounded-full font-mono hover:bg-[var(--blue)]/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-[var(--light)]/20 text-[var(--light)]/70 text-sm rounded-full font-mono">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details */}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--blue)] text-sm font-mono uppercase tracking-wider group-hover:scale-105 transition-transform duration-300">
                    View Details
                  </span>
                  <div className="w-8 h-8 bg-[var(--blue)]/20 rounded-full flex items-center justify-center group-hover:bg-[var(--blue)]/40 transition-colors duration-300">
                    <i className="fas fa-arrow-right text-[var(--blue)] text-sm group-hover:translate-x-1 transition-transform duration-300"></i>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[var(--blue)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20" data-aos="fade-up">
          <div className="bg-gradient-to-r from-[var(--blue)]/10 to-[var(--blue)]/5 border border-[var(--blue)]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[var(--light)] mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-[var(--light)]/80 mb-6 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together. I'm always excited to work on new and challenging projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative inline-flex items-center px-8 py-4 bg-[var(--blue)] text-[var(--light)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--blue)]/25">
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-[var(--light)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="group relative inline-flex items-center px-8 py-4 bg-transparent border-2 border-[var(--light)]/30 text-[var(--light)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:border-[var(--light)] hover:scale-105 hover:shadow-lg hover:shadow-[var(--light)]/10">
                <span className="relative z-10">View More Work</span>
                <div className="absolute inset-0 bg-[var(--light)]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[var(--dark)]/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-[rgba(var(--dark),0.95)] backdrop-blur-md border border-[var(--blue)]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-[var(--blue)]/20 rounded-full flex items-center justify-center text-[var(--blue)] hover:bg-[var(--blue)]/40 transition-colors duration-300 z-10"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/60 to-transparent"></div>
              
              {/* Project Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--light)] mb-2">
                  {selectedProject.title}
                </h2>
                <span className="px-4 py-2 bg-[var(--blue)]/80 text-[var(--light)] text-sm rounded-full font-mono uppercase tracking-wider">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 md:p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[var(--light)] mb-4">About the Project</h3>
                <p className="text-[var(--light)]/80 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[var(--light)] mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[var(--blue)] rounded-full"></div>
                      <span className="text-[var(--light)]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[var(--light)] mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[var(--blue)]/20 text-[var(--blue)] rounded-full font-mono hover:bg-[var(--blue)]/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={selectedProject.demo}
                  className="flex-1 group relative inline-flex items-center justify-center px-6 py-3 bg-[var(--blue)] text-[var(--light)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <i className="fas fa-play"></i>
                    Live Demo
                  </span>
                </a>
                <a
                  href={selectedProject.github}
                  className="flex-1 group relative inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-[var(--light)]/30 text-[var(--light)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:border-[var(--light)] hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <i className="fab fa-github"></i>
                    View Code
                  </span>
                </a>
                <a
                  href={selectedProject.link}
                  className="flex-1 group relative inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-[var(--blue)]/30 text-[var(--blue)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:border-[var(--blue)] hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <i className="fas fa-external-link-alt"></i>
                    Visit Site
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio; 