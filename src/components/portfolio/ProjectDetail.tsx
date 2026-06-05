import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchReadme, getCategoryFromTopics } from '../../services/github';
import type { Repository } from '../../services/github';

interface ProjectDetailProps {
  repo: Repository;
  onBack: () => void;
}

interface HeadingItem {
  text: string;
  level: number;
  id: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ repo, onBack }) => {
  const [readme, setReadme] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  useEffect(() => {
    const loadReadme = async () => {
      setLoading(true);
      setError(null);
      try {
        const content = await fetchReadme(repo.name);
        setReadme(content);
        
        // Extract headings for Table of Contents
        const extractedHeadings: HeadingItem[] = [];
        const lines = content.split('\n');
        let inCodeBlock = false;

        for (const line of lines) {
          if (line.trim().startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
          }
          if (inCodeBlock) continue;

          // Match #, ##, ### headings (limit to H1, H2, H3 for clean ToC)
          const match = line.match(/^(#{1,3})\s+(.+)$/);
          if (match) {
            const level = match[1].length;
            // Clean up any markdown formatting inside the heading text
            const text = match[2]
              .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Strip links
              .replace(/[*_`]/g, '') // Strip bold, italic, code styling
              .trim();
            
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-');
              
            extractedHeadings.push({ text, level, id });
          }
        }
        setHeadings(extractedHeadings);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load project documentation. It might be missing a README.md file.');
      } finally {
        setLoading(false);
      }
    };

    loadReadme();
    
    // Scroll to top when loading a new project detail page
    window.scrollTo(0, 0);
  }, [repo.name]);

  // Dynamic image path replacer
  const transformImageUri = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
      return src;
    }
    // Remove leading ./ or /
    const cleanPath = src.replace(/^\.?\//, '');
    return `https://raw.githubusercontent.com/tecrade/${repo.name}/${repo.default_branch}/${cleanPath}`;
  };

  // Helper to extract text from ReactNode to generate heading slug
  const getChildrenText = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getChildrenText).join('');
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>;
      if (element.props && element.props.children) {
        return getChildrenText(element.props.children);
      }
    }
    return '';
  };

  // Custom Markdown Heading components
  const MarkdownHeading = ({ level, children }: { level: number; children: React.ReactNode }) => {
    const text = getChildrenText(children);
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const Tag = `h${level}` as any;
    
    let className = 'scroll-mt-24 font-bold text-[var(--light)] mb-4 ';
    if (level === 1) {
      className += 'text-3xl lg:text-4xl mt-10 border-b border-[var(--blue)]/20 pb-2';
    } else if (level === 2) {
      className += 'text-2xl lg:text-3xl mt-8 border-b border-[var(--blue)]/10 pb-1';
    } else if (level === 3) {
      className += 'text-xl lg:text-2xl mt-6';
    } else {
      className += 'text-lg mt-4';
    }

    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  };

  const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Filter out the "portfolio" topic and format remaining topics
  const categoryTopic = getCategoryFromTopics(repo.topics);

  // Filter out the "portfolio" topic and format remaining topics
  const projectTags = repo.topics
    .filter((topic) => topic.toLowerCase() !== 'portfolio' && 
                     topic.toLowerCase() !== categoryTopic.toLowerCase())
    .map((tag) => tag.toLowerCase() === 'ai' ? 'AI' : tag.charAt(0).toUpperCase() + tag.slice(1));

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--blue)]/5 via-transparent to-[var(--blue)]/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--blue)]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--blue)]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-10 lg:py-16">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgba(var(--dark),0.5)] border border-[var(--blue)]/20 text-[var(--light)] font-mono text-sm hover:border-[var(--blue)] hover:text-[var(--blue)] hover:shadow-lg hover:shadow-[var(--blue)]/10 transition-all duration-300 cursor-pointer"
        >
          <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-300"></i>
          Back to Projects
        </button>

        {/* Hero Section */}
        <div className="bg-[rgba(10,25,47,0.7)] backdrop-blur-md border border-[var(--blue)]/20 rounded-2xl p-6 lg:p-10 mb-12 shadow-xl shadow-[var(--blue)]/5" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-[var(--blue)]/10 text-[var(--blue)] text-xs font-mono font-bold uppercase rounded-full mb-3 tracking-widest border border-[var(--blue)]/30">
                {categoryTopic}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--light)] mb-4">
                {repo.name.replace(/-/g, ' ')}
              </h1>
              <p className="text-[var(--light)]/80 text-lg max-w-3xl mb-6 leading-relaxed">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--light)]/60 font-mono">
                <span className="flex items-center gap-2">
                  <i className="fas fa-history text-[var(--blue)]"></i>
                  Updated: {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-star text-[var(--blue)]"></i>
                  {repo.stargazers_count} {repo.stargazers_count === 1 ? 'star' : 'stars'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--blue)] text-[var(--dark)] font-mono font-bold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-[var(--blue)]/25 transition-all duration-300"
              >
                <i className="fab fa-github text-lg"></i>
                GitHub Repo
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border-2 border-[var(--blue)]/40 text-[var(--blue)] font-mono font-bold rounded-lg hover:border-[var(--blue)] hover:bg-[var(--blue)]/10 hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          {projectTags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[var(--light)]/10 flex flex-wrap items-center gap-2">
              <span className="text-[var(--light)]/50 font-mono text-sm mr-2">Tags:</span>
              {projectTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[rgba(var(--blue),0.05)] border border-[var(--blue)]/10 text-[var(--light)]/90 text-sm rounded-md font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Documentation Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[var(--blue)]/30 border-t-[var(--blue)] rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--light)]/60 font-mono">Fetching documentation from GitHub...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto font-mono">
            <i className="fas fa-exclamation-triangle text-3xl mb-4 text-red-400"></i>
            <h3 className="text-lg font-bold mb-2">Error Loading README</h3>
            <p>{error}</p>
            <button
              onClick={onBack}
              className="mt-6 px-5 py-2 bg-[var(--blue)]/20 hover:bg-[var(--blue)]/30 border border-[var(--blue)]/40 text-[var(--light)] rounded-md transition-all cursor-pointer"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Doc Content */}
            <article className="lg:col-span-9 bg-[rgba(10,25,47,0.5)] backdrop-blur-md border border-[var(--blue)]/10 rounded-2xl p-6 lg:p-10 shadow-lg markdown-body overflow-x-hidden">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <MarkdownHeading level={1}>{children}</MarkdownHeading>,
                  h2: ({ children }) => <MarkdownHeading level={2}>{children}</MarkdownHeading>,
                  h3: ({ children }) => <MarkdownHeading level={3}>{children}</MarkdownHeading>,
                  h4: ({ children }) => <MarkdownHeading level={4}>{children}</MarkdownHeading>,
                  h5: ({ children }) => <MarkdownHeading level={5}>{children}</MarkdownHeading>,
                  h6: ({ children }) => <MarkdownHeading level={6}>{children}</MarkdownHeading>,
                  
                  p: ({ children }) => <p className="text-[var(--light)]/85 leading-relaxed mb-6 text-base md:text-lg">{children}</p>,
                  
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target={href?.startsWith('#') ? undefined : '_blank'}
                      rel={href?.startsWith('#') ? undefined : 'noreferrer'}
                      className="text-[var(--blue)] hover:underline font-semibold transition-all"
                    >
                      {children}
                    </a>
                  ),
                  
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[var(--light)]/85">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[var(--light)]/85">{children}</ol>,
                  li: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
                  
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[var(--blue)] bg-[rgba(100,255,218,0.05)] pl-4 py-2 pr-2 my-6 italic text-[var(--light)]/80 rounded-r-md">
                      {children}
                    </blockquote>
                  ),
                  
                  table: ({ children }) => (
                    <div className="overflow-x-auto w-full my-8 rounded-lg border border-[var(--blue)]/15">
                      <table className="w-full text-left border-collapse">{children}</table>
                    </div>
                  ),
                  thead: ({ children }) => <thead className="bg-[rgba(100,255,218,0.08)] border-b border-[var(--blue)]/20 font-mono text-[var(--light)] text-sm">{children}</thead>,
                  tbody: ({ children }) => <tbody className="divide-y divide-[var(--light)]/5">{children}</tbody>,
                  tr: ({ children }) => <tr className="hover:bg-[rgba(255,255,255,0.01)] transition-colors">{children}</tr>,
                  th: ({ children }) => <th className="p-3 font-semibold">{children}</th>,
                  td: ({ children }) => <td className="p-3 text-[var(--light)]/80 text-sm">{children}</td>,
                  
                  img: ({ src, alt }) => {
                    const absSrc = transformImageUri(src || '');
                    return (
                      <div className="my-8 flex justify-center">
                        <img
                          src={absSrc}
                          alt={alt || 'Documentation image'}
                          className="max-w-full h-auto rounded-xl border border-[var(--blue)]/10 shadow-lg"
                          onError={(e) => {
                            // Hide broken image placeholder by replacing it or adding opacity-50
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    );
                  },
                  
                  code({ className, children}) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    const codeString = String(children).replace(/\n$/, '');
                    
                    if (isInline) {
                      return (
                        <code className="px-1.5 py-0.5 bg-[var(--blue)]/10 border border-[var(--blue)]/20 text-[var(--blue)] rounded font-mono text-sm">
                          {children}
                        </code>
                      );
                    }
                    
                    const language = match ? match[1] : '';
                    
                    return (
                      <div className="my-6 rounded-xl overflow-hidden border border-[var(--blue)]/15 bg-[#1e1e1e] shadow-xl">
                        {/* Custom Mock Header */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-[var(--blue)]/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                          </div>
                          {language && (
                            <span className="text-[var(--light)]/40 font-mono text-xs uppercase tracking-wider">
                              {language}
                            </span>
                          )}
                        </div>
                        
                        {/* Syntax Highlighter */}
                        <SyntaxHighlighter
                          style={atomDark as any}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            background: 'transparent',
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                          }}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  }
                }}
              >
                {readme}
              </ReactMarkdown>
            </article>

            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-3 sticky top-24 max-h-[80vh] overflow-y-auto hidden lg:block bg-[rgba(10,25,47,0.3)] backdrop-blur-sm border border-[var(--blue)]/10 rounded-2xl p-6 shadow-md">
              <h4 className="font-mono text-xs font-bold text-[var(--blue)] uppercase tracking-wider mb-4 border-b border-[var(--blue)]/20 pb-2">
                Table of Contents
              </h4>
              {headings.length === 0 ? (
                <p className="text-[var(--light)]/40 text-xs font-mono">No headings found in README.</p>
              ) : (
                <ul className="space-y-3 font-mono text-sm">
                  {headings.map((heading, index) => {
                    let paddingClass = '';
                    let textClass = 'text-[var(--light)]/70 hover:text-[var(--blue)] transition-colors duration-200';
                    
                    if (heading.level === 2) {
                      paddingClass = 'pl-3';
                      textClass = 'text-xs text-[var(--light)]/50 hover:text-[var(--blue)] transition-colors duration-200';
                    } else if (heading.level === 3) {
                      paddingClass = 'pl-6';
                      textClass = 'text-[11px] text-[var(--light)]/40 hover:text-[var(--blue)] transition-colors duration-200';
                    } else {
                      textClass = 'text-sm font-bold text-[var(--light)]/80 hover:text-[var(--blue)] transition-colors duration-200';
                    }

                    return (
                      <li key={index} className={`${paddingClass} truncate`}>
                        <a
                          href={`#${heading.id}`}
                          className={textClass}
                          title={heading.text}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(heading.id);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          {heading.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
