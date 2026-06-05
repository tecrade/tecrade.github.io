import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import 'aos/dist/aos.css';
import { 
  fetchRepositories, 
  getCategoryFromTopics, 
  formatTopicName, 
  getTopicIcon 
} from '../../services/github';
import type { Repository } from '../../services/github';
import ProjectDetail from './ProjectDetail';

const PlaceholderThumbnail: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[var(--dark)] via-[rgba(10,17,24,0.95)] to-[var(--blue)]/15 flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden border-b border-[var(--blue)]/10">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--blue)]/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--blue)]/5 rounded-full blur-xl animate-pulse delay-500"></div>
      <i className="fas fa-laptop-code text-3xl text-[var(--blue)]/30 mb-2"></i>
      <span className="text-sm font-bold font-mono text-[var(--light)] tracking-wide truncate max-w-full px-2">
        {title}
      </span>
      <span className="text-[10px] font-mono text-[var(--blue)]/60 mt-1 uppercase tracking-widest">
        Showcase Project
      </span>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const activeProjectName = searchParams.get('project');

  useEffect(() => {
    const loadRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        const repos = await fetchRepositories();
        // Filter repositories containing the 'portfolio' topic
        const portfolioRepos = repos.filter(repo => 
          repo.topics.some(topic => topic.toLowerCase() === 'portfolio')
        );
        setRepositories(portfolioRepos);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch projects from GitHub. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  // Filter button click logic
  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    const button = document.querySelector(`[data-filter="${filterId}"]`);
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => button.classList.remove('scale-95'), 150);
    }
  };

  // Derive dynamic filters from the repositories list
  const categoriesList = Array.from(
    new Set(
      repositories.map(repo => getCategoryFromTopics(repo.topics))
    )
  );

  // Sort categories: web, software, embedded first, then others alphabetically
  const PREFERRED_ORDER = ['web', 'software', 'embedded'];
  const sortedCategories = categoriesList.sort((a, b) => {
    const indexA = PREFERRED_ORDER.indexOf(a);
    const indexB = PREFERRED_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const filters = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    ...sortedCategories.map(cat => ({
      id: cat,
      name: formatTopicName(cat),
      icon: getTopicIcon(cat)
    }))
  ];

  // Filter repositories to display
  const filteredProjects = repositories.filter(repo => {
    if (activeFilter === 'all') return true;
    return getCategoryFromTopics(repo.topics) === activeFilter;
  });

  // Switch to ProjectDetail view if project parameter is active
  if (activeProjectName && repositories.length > 0) {
    const selectedRepo = repositories.find(repo => repo.name === activeProjectName);
    if (selectedRepo) {
      return (
        <ProjectDetail
          repo={selectedRepo}
          onBack={() => setSearchParams({})}
        />
      );
    }
  }

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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[var(--blue)]/30 border-t-[var(--blue)] rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--light)]/60 font-mono">Loading repositories from GitHub...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto font-mono">
            <i className="fas fa-exclamation-triangle text-3xl mb-4 text-red-400"></i>
            <h3 className="text-lg font-bold mb-2">Error Loading Portfolio</h3>
            <p>{error}</p>
          </div>
        ) : repositories.length === 0 ? (
          <div className="bg-[rgba(10,25,47,0.5)] border border-[var(--blue)]/20 text-[var(--light)]/60 rounded-xl p-12 text-center max-w-2xl mx-auto font-mono">
            <i className="fas fa-folder-open text-4xl mb-4 text-[var(--blue)]/40"></i>
            <h3 className="text-lg font-bold mb-2 text-[var(--light)]">No Projects Found</h3>
            <p>No repositories were found with the topic "portfolio" on GitHub.</p>
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  data-filter={filter.id}
                  onClick={() => handleFilterClick(filter.id)}
                  className={`group relative px-6 py-3 rounded-lg font-mono font-bold transition-all duration-300 overflow-hidden cursor-pointer ${
                    activeFilter === filter.id
                      ? 'bg-[var(--blue)] text-[var(--dark)] shadow-lg shadow-[var(--blue)]/25'
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
              {filteredProjects.map((project, index) => {
                const category = getCategoryFromTopics(project.topics);
                
                // Filter topics that are NOT the category and NOT 'portfolio'
                const displayTags = project.topics
                  .filter(topic => topic.toLowerCase() !== 'portfolio' && topic.toLowerCase() !== category)
                  .slice(0, 3)
                  .map(tag => tag.toLowerCase() === 'ai' ? 'AI' : tag.charAt(0).toUpperCase() + tag.slice(1));
                  
                const formattedUpdateDate = new Date(project.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                const isImageFailed = imageErrors[project.name];
                const thumbnailUrl = `https://raw.githubusercontent.com/tecrade/${project.name}/${project.default_branch}/assets/thumbnail.jpg`;

                return (
                  <div
                    key={project.name}
                    onClick={() => setSearchParams({ project: project.name })}
                    className="group relative bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[var(--blue)]/20 rounded-2xl overflow-hidden hover:border-[var(--blue)]/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--blue)]/20 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between"
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                  >
                    <div>
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden bg-[rgba(10,17,24,0.5)]">
                        {isImageFailed ? (
                          <PlaceholderThumbnail title={project.name.replace(/-/g, ' ')} />
                        ) : (
                          <img
                            src={thumbnailUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [project.name]: true }));
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Overlay Icons */}
                        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center text-[var(--dark)] hover:scale-110 transition-transform duration-300">
                            <i className="fas fa-eye text-lg"></i>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[var(--blue)]/90 text-[var(--dark)] text-xs font-mono font-bold rounded-full uppercase tracking-wider">
                            {category}
                          </span>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 pb-2">
                        <h3 className="text-xl font-bold text-[var(--light)] mb-3 group-hover:text-[var(--blue)] transition-colors duration-300 truncate">
                          {project.name.replace(/-/g, ' ')}
                        </h3>
                        <p className="text-[var(--light)]/70 mb-4 leading-relaxed text-sm line-clamp-3 min-h-[60px]">
                          {project.description || 'No description provided.'}
                        </p>

                        {/* Technologies / Tags */}
                        {displayTags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {displayTags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2.5 py-1 bg-[var(--blue)]/10 text-[var(--blue)] text-xs rounded font-mono border border-[var(--blue)]/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Last Updated */}
                        <div className="text-[var(--light)]/40 font-mono text-xs mb-4 flex items-center gap-1.5">
                          <i className="far fa-clock text-[var(--blue)]/70"></i>
                          Updated: {formattedUpdateDate}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-2 border-t border-[var(--blue)]/10 flex items-center gap-4 bg-[rgba(10,25,47,0.2)]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchParams({ project: project.name });
                        }}
                        className="flex-1 py-2 bg-[var(--blue)]/10 text-[var(--blue)] font-mono text-xs font-bold rounded border border-[var(--blue)]/30 hover:bg-[var(--blue)] hover:text-[var(--dark)] transition-all duration-300 text-center"
                      >
                        View Project
                      </button>
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 bg-transparent text-[var(--light)] hover:text-[var(--blue)] border border-[var(--light)]/20 hover:border-[var(--blue)] font-mono text-xs rounded transition-all duration-300 flex items-center gap-1.5"
                      >
                        <i className="fab fa-github"></i>
                        GitHub
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20" data-aos="fade-up">
          <div className="bg-gradient-to-r from-[var(--blue)]/10 to-[var(--blue)]/5 border border-[var(--blue)]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[var(--light)] mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-[var(--light)]/85 mb-6 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together. I'm always excited to work on new and challenging projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-[var(--blue)] text-[var(--dark)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--blue)]/25">
                <span className="relative z-10">Start a Project</span>
              </a>
              <a href="https://github.com/tecrade" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[var(--light)]/30 text-[var(--light)] rounded-lg font-mono font-bold tracking-wider overflow-hidden transition-all duration-300 hover:border-[var(--light)] hover:scale-105 hover:shadow-lg hover:shadow-[var(--light)]/10">
                <span className="relative z-10 flex items-center gap-2">
                  <i className="fab fa-github"></i>
                  View More Work
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;