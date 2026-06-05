export interface Repository {
  name: string;
  description: string | null;
  topics: string[];
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  default_branch: string;
  homepage: string | null;
}

const GITHUB_USERNAME = 'tecrade';
const API_BASE = 'https://api.github.com';

/**
 * Fetches all public repositories for the specified GitHub user.
 */
export const fetchRepositories = async (): Promise<Repository[]> => {
  const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories for ${GITHUB_USERNAME}: ${response.statusText}`);
  }
  const data = await response.json();
  
  // Format response to match the Repository interface
  return data.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    topics: repo.topics || [],
    html_url: repo.html_url,
    updated_at: repo.updated_at,
    stargazers_count: repo.stargazers_count,
    default_branch: repo.default_branch || 'main',
    homepage: repo.homepage || null,
  }));
};

/**
 * Fetches and decodes the README.md content for a repository.
 * Falls back to fetching the raw content directly if decoding or API call fails.
 */
export const fetchReadme = async (repoName: string): Promise<string> => {
  const response = await fetch(`${API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/readme`);
  if (!response.ok) {
    throw new Error(`Failed to fetch README for ${repoName}: ${response.statusText}`);
  }
  const data = await response.json();
  
  if (data.content && data.encoding === 'base64') {
    try {
      // Clean up whitespace/newlines from the base64 string
      const normalized = data.content.replace(/\s/g, '');
      const binary = atob(normalized);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
      console.error('Error decoding base64 content via TextDecoder, trying fallback download_url', e);
    }
  }

  // Fallback: If no base64 content, or decoding failed, attempt to fetch the raw README file
  if (data.download_url) {
    const rawResponse = await fetch(data.download_url);
    if (rawResponse.ok) {
      return await rawResponse.text();
    }
  }
  
  throw new Error(`Could not retrieve README content for ${repoName}`);
};

export const NON_CATEGORY_TAGS = new Set([
  // Languages
  'python', 'javascript', 'typescript', 'html', 'css', 'c', 'cpp', 'c++', 'csharp', 'java', 'kotlin', 'swift', 'rust', 'go', 'php', 'ruby', 'assembly', 'sql',
  // Frameworks / Libraries
  'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt', 'gatsby', 'tailwind', 'bootstrap', 'sass', 'jquery', 'redux', 'node', 'nodejs', 'express', 'fastapi', 'flask', 'django', 'spring', 'tensorflow', 'pytorch', 'keras', 'opencv', 'd3', 'd3js', 'socketio', 'socket.io', 'redis', 'mqtt',
  // Tools / Databases / Cloud
  'mongodb', 'postgresql', 'postgres', 'sqlite', 'mysql', 'aws', 'docker', 'firebase', 'git', 'github', 'npm', 'vite', 'webpack',
  // Specific hardware / concepts / terms that are clearly tags rather than top-level categories
  'esp32', 'esp8266', 'arduino', 'raspberrypi', 'raspberry-pi', 'electronics', 'automation', 'pcb', 'circuits', 'iot', 'sensors', 'actuators', 'robotics-operating-system', 'ros', 'microcontroller', 'microcontrollers', 'embedded-systems',
  // Custom user tags / specific details
  'algotrade-strategy', 'bitcoin', 'btctrade', 'telegrambot', 'gesture', 'gesture-recognition', 'rssi', 'wifi', 'wifi-gesture'
]);

export const KNOWN_CATEGORIES = new Set(['web', 'software', 'embedded']);

export const getCategoryFromTopics = (topics: string[]): string => {
  // 1. First check if any topic matches our known categories
  const knownCategory = topics.find(topic => 
    KNOWN_CATEGORIES.has(topic.toLowerCase())
  );
  if (knownCategory) return knownCategory.toLowerCase();

  // 2. If no known category is found, find the first topic that is not 'portfolio' and not in the blacklist
  const category = topics.find(topic => 
    topic.toLowerCase() !== 'portfolio' && 
    !NON_CATEGORY_TAGS.has(topic.toLowerCase())
  );
  return category ? category.toLowerCase() : 'software'; // Default fallback
};

export const formatTopicName = (topic: string): string => {
  if (topic.toLowerCase() === 'ai') return 'AI';
  if (topic.toLowerCase() === 'iot') return 'IoT';
  return topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
};

export const getTopicIcon = (topic: string): string => {
  switch (topic.toLowerCase()) {
    case 'web':
      return 'fas fa-globe';
    case 'software':
      return 'fas fa-mobile-alt';
    case 'embedded':
      return 'fas fa-microchip';
    case 'robotics':
      return 'fas fa-robot';
    case 'ai':
      return 'fas fa-brain';
    case 'automation':
      return 'fas fa-cogs';
    default:
      return 'fas fa-tag';
  }
};

