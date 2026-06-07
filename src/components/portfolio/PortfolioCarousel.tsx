import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchRepositories,
  getCategoryFromTopics,
} from '../../services/github';
import type { Repository } from '../../services/github';
import ProjectDetail from './ProjectDetail';

// ─── Placeholder Thumbnail (identical to Portfolio.tsx) ──────────────────────
const PlaceholderThumbnail: React.FC<{ title: string }> = ({ title }) => (
  <div className="w-full h-full bg-gradient-to-br from-[var(--dark)] via-[rgba(10,17,24,0.95)] to-[var(--blue)]/15 flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden border-b border-[var(--blue)]/10">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--blue)]/5 rounded-full blur-xl animate-pulse" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--blue)]/5 rounded-full blur-xl animate-pulse delay-500" />
    <i className="fas fa-laptop-code text-3xl text-[var(--blue)]/30 mb-2" />
    <span className="text-sm font-bold font-mono text-[var(--light)] tracking-wide truncate max-w-full px-2">
      {title}
    </span>
    <span className="text-[10px] font-mono text-[var(--blue)]/60 mt-1 uppercase tracking-widest">
      Showcase Project
    </span>
  </div>
);

// ─── Project Card (identical layout to Portfolio.tsx) ────────────────────────
interface ProjectCardProps {
  project: Repository;
  imageErrors: Record<string, boolean>;
  onImageError: (name: string) => void;
  onClick: () => void;
  onGitHubClick: (e: React.MouseEvent, url: string) => void;
  onViewProjectClick: (e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  imageErrors,
  onImageError,
  onClick,
  onGitHubClick,
  onViewProjectClick,
}) => {
  const category = getCategoryFromTopics(project.topics);
  const displayTags = project.topics
    .filter(
      (t) =>
        t.toLowerCase() !== 'portfolio' && t.toLowerCase() !== category
    )
    .slice(0, 3)
    .map((tag) =>
      tag.toLowerCase() === 'ai'
        ? 'AI'
        : tag.charAt(0).toUpperCase() + tag.slice(1)
    );

  const formattedUpdateDate = new Date(project.updated_at).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  const isImageFailed = imageErrors[project.name];
  const thumbnailUrl = `https://raw.githubusercontent.com/tecrade/${project.name}/${project.default_branch}/assets/thumbnail.jpg`;

  return (
    <div
      onClick={onClick}
      className="group relative bg-[rgba(10,25,47,0.5)] backdrop-blur-sm border border-[var(--blue)]/20 rounded-2xl overflow-hidden hover:border-[var(--blue)]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[var(--blue)]/20 cursor-pointer flex flex-col justify-between h-full"
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
              onError={() => onImageError(project.name)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay Eye Icon */}
          <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-[var(--blue)] rounded-full flex items-center justify-center text-[var(--dark)] hover:scale-110 transition-transform duration-300">
              <i className="fas fa-eye text-lg" />
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
              {displayTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[var(--blue)]/10 text-[var(--blue)] text-xs rounded font-mono border border-[var(--blue)]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Last Updated */}
          <div className="text-[var(--light)]/40 font-mono text-xs mb-4 flex items-center gap-1.5">
            <i className="far fa-clock text-[var(--blue)]/70" />
            Updated: {formattedUpdateDate}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-2 border-t border-[var(--blue)]/10 flex items-center gap-4 bg-[rgba(10,25,47,0.2)]">
        <button
          onClick={onViewProjectClick}
          className="flex-1 py-2 bg-[var(--blue)]/10 text-[var(--blue)] font-mono text-xs font-bold rounded border border-[var(--blue)]/30 hover:bg-[var(--blue)] hover:text-[var(--dark)] transition-all duration-300 text-center cursor-pointer"
        >
          View Project
        </button>
        <a
          href={project.html_url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => onGitHubClick(e, project.html_url)}
          className="px-4 py-2 bg-transparent text-[var(--light)] hover:text-[var(--blue)] border border-[var(--light)]/20 hover:border-[var(--blue)] font-mono text-xs rounded transition-all duration-300 flex items-center gap-1.5"
        >
          <i className="fab fa-github" />
          GitHub
        </a>
      </div>
    </div>
  );
};

// ─── Main Carousel Component ─────────────────────────────────────────────────
const PortfolioCarousel: React.FC = () => {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch repos ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const repos = await fetchRepositories();
        const portfolioRepos = repos.filter((r) =>
          r.topics.some((t) => t.toLowerCase() === 'portfolio')
        );
        setRepositories(portfolioRepos);
        setActiveIndex(Math.floor(portfolioRepos.length / 2));
      } catch {
        setError('Failed to fetch projects from GitHub.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const total = repositories.length;

  // ── Navigation ───────────────────────────────────────────────────────────────
  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  // ── Auto-play ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (total === 0) return;
    autoPlayRef.current = setInterval(next, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next, total]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(next, 4000);
  };

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  // ── Drag / swipe handlers ────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    setIsDragging(false);
    pauseAutoPlay();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    dragDelta.current = e.clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 5) setIsDragging(true);
  };
  const onPointerUp = () => {
    if (dragStartX.current !== null && Math.abs(dragDelta.current) > 50) {
      dragDelta.current < 0 ? next() : prev();
    }
    dragStartX.current = null;
    dragDelta.current = 0;
    setTimeout(() => setIsDragging(false), 50);
    resumeAutoPlay();
  };

  // ── Carousel geometry ────────────────────────────────────────────────────────
  // visible slots: large=5, medium=3, small=1 (we always render a window of 5)
  const SLOTS = 5; // how many cards we compute transforms for (-2,-1,0,1,2)
  const half = Math.floor(SLOTS / 2); // 2

  const getSlotIndex = (offset: number) => {
    return ((activeIndex + offset) % total + total) % total;
  };

  // Per-slot visual properties
  const slotStyle = (offset: number): React.CSSProperties => {
    // offset: -2, -1, 0, 1, 2
    const abs = Math.abs(offset);

    // Scale: center=1, ±1=0.82, ±2=0.68
    const scale = abs === 0 ? 1 : abs === 1 ? 0.82 : 0.68;

    // Spread cards horizontally — 260px gap between card centres
    const translateX = offset * 260;

    // z-index: center on top
    const zIndex = SLOTS - abs;

    // Dimming for side cards
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.42;

    // Slight perspective rotation for 3-D feel
    const rotateY = offset * -7;

    return {
      // translateY(-50%) lifts the card up so its centre sits on the stage midline
      transform: `translateX(calc(-50% + ${translateX}px)) translateY(-50%) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
    };
  };

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }));
  };

  const handleCardClick = (project: Repository, offset: number) => {
    if (isDragging) return;
    if (offset === 0) {
      setSelectedProject(project);
    } else {
      setActiveIndex(getSlotIndex(offset));
    }
  };

  // ── ProjectDetail overlay ────────────────────────────────────────────────────
  if (selectedProject) {
    return (
      <section id="portfolio" className="relative w-full py-20 overflow-hidden">
        {/* Subtle bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--blue)]/5 via-transparent to-[var(--blue)]/5" />
        </div>
        <div className="relative container mx-auto px-4">
          <ProjectDetail
            repo={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      </section>
    );
  }

  // ── Section render ───────────────────────────────────────────────────────────
  return (
    <section id="portfolio" className="relative w-full py-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--blue)]/5 via-transparent to-[var(--blue)]/5" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--blue)]/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[var(--blue)]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* ── Section Header ── */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block font-mono text-xs text-[var(--blue)] uppercase tracking-[0.3rem] mb-3">
            My Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--light)] mb-4">
            Featured{' '}
            <span className="text-[var(--blue)]">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-[var(--blue)] mx-auto mb-6 rounded-full" />
          <p className="text-[var(--light)]/70 text-base max-w-xl mx-auto font-mono">
            A curated selection of projects I've built — click any card to explore.
          </p>
        </div>

        {/* ── Loading / Error States ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-14 h-14 border-4 border-[var(--blue)]/30 border-t-[var(--blue)] rounded-full animate-spin mb-4" />
            <p className="text-[var(--light)]/60 font-mono text-sm">
              Loading projects…
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-8 text-center max-w-xl mx-auto font-mono">
            <i className="fas fa-exclamation-triangle text-3xl mb-4 text-red-400" />
            <p>{error}</p>
          </div>
        ) : total === 0 ? (
          <div className="bg-[rgba(10,25,47,0.5)] border border-[var(--blue)]/20 text-[var(--light)]/60 rounded-xl p-12 text-center max-w-xl mx-auto font-mono">
            <i className="fas fa-folder-open text-4xl mb-4 text-[var(--blue)]/40" />
            <p>No portfolio projects found.</p>
          </div>
        ) : (
          <>
            {/* ── Carousel Wrapper ── */}
            <div
              className="relative w-full flex items-center justify-center select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
              style={{ touchAction: 'none' }}
            >
              {/* Left Arrow */}
              <button
                onClick={prev}
                className="absolute left-0 z-30 w-10 h-10 rounded-full bg-[rgba(10,25,47,0.8)] border border-[var(--blue)]/30 text-[var(--blue)] flex items-center justify-center hover:bg-[var(--blue)] hover:text-[var(--dark)] transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg shadow-[var(--blue)]/10"
                aria-label="Previous project"
                style={{ left: 'clamp(4px, 2vw, 16px)' }}
              >
                <i className="fas fa-chevron-left text-sm" />
              </button>

              {/* Cards Stage */}
              {/*
                Height is fixed; cards are absolutely centred via translateX.
                We compute a window of SLOTS cards (offsets -2..+2).
                On small screens only the centre card (offset=0) is fully visible;
                on medium ±1; on large ±2.
              */}
              {/*
                Stage: fixed height = centre card height.
                Each card is absolutely positioned at top:50% left:50%
                and then centred via the transform in slotStyle.
              */}
              <div
                className="relative w-full"
                style={{ height: 'clamp(400px, 52vw, 500px)', overflow: 'visible' }}
              >
                {Array.from({ length: SLOTS }, (_, i) => i - half).map((offset) => {
                  const projIndex = getSlotIndex(offset);
                  const project = repositories[projIndex];
                  const absOffset = Math.abs(offset);

                  // Visibility: small=center only | medium=±1 | large=±2
                  let visibilityClass = '';
                  if (absOffset === 2) visibilityClass = 'hidden lg:block';
                  else if (absOffset === 1) visibilityClass = 'hidden md:block';

                  return (
                    <div
                      key={`${offset}-${project.name}`}
                      className={`absolute ${visibilityClass}`}
                      style={{
                        ...slotStyle(offset),
                        width: 'clamp(240px, 26vw, 320px)',
                        height: 'clamp(380px, 48vw, 470px)',
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'center center',
                        pointerEvents: isDragging ? 'none' : 'auto',
                      }}
                    >
                      {/* Glowing focus ring on centre card */}
                      {offset === 0 && (
                        <div className="absolute -inset-[3px] rounded-[1.1rem] border-2 border-[var(--blue)]/60 pointer-events-none z-10 shadow-[0_0_32px_6px_rgba(100,255,218,0.10)]" />
                      )}
                      <div className="w-full h-full">
                        <ProjectCard
                          project={project}
                          imageErrors={imageErrors}
                          onImageError={handleImageError}
                          onClick={() => handleCardClick(project, offset)}
                          onViewProjectClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(project, offset);
                          }}
                          onGitHubClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={next}
                className="absolute right-0 z-30 w-10 h-10 rounded-full bg-[rgba(10,25,47,0.8)] border border-[var(--blue)]/30 text-[var(--blue)] flex items-center justify-center hover:bg-[var(--blue)] hover:text-[var(--dark)] transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg shadow-[var(--blue)]/10"
                aria-label="Next project"
                style={{ right: 'clamp(4px, 2vw, 16px)' }}
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>
            
            {/* ── Dot Indicators ── */}
            <div className="flex justify-center gap-2 mt-10">
              {repositories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-[var(--blue)]'
                      : 'w-2 h-2 bg-[var(--blue)]/30 hover:bg-[var(--blue)]/60'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            {/* ── Project counter ── */}
            <p className="text-center font-mono text-xs text-[var(--light)]/40 mt-3">
              {activeIndex + 1} / {total}
            </p>

            {/* ── View More Button ── */}
            <div className="flex justify-center mt-10" data-aos="fade-up">
              <button
                onClick={() => navigate('/portfolio')}
                className="group relative inline-flex items-center justify-center gap-3 8 py-4 rounded-xl font-mono font-bold text-sm tracking-wider overflow-hidden border-2 border-[var(--blue)]/50 text-[var(--blue)] hover:text-[var(--dark)] transition-all duration-400 hover:scale-105 hover:shadow-lg hover:shadow-[var(--blue)]/25 cursor-pointer"
              >
                {/* Fill animation */}
                <span className="absolute inset-0 bg-[var(--blue)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 rounded-[0.65rem]" />
                <span className="relative z-10 flex items-center gap-2">
                  <i className="fas fa-th-large" />
                  View Full Portfolio
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <hr className="border-[var(--light)]/20 mt-5" />
    </section>
  );
};

export default PortfolioCarousel;
