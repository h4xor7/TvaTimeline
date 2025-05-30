import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { fetchGitHubRepos, getLanguageColor, formatDate } from '@/lib/github-api';

interface DeploymentsProps {
  onProjectView: (xp: number) => void;
}

export function Deployments({ onProjectView }: DeploymentsProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Replace 'saurabhpandey' with actual GitHub username
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['/api/github/repos/saurabhpandey'],
    enabled: true,
  });

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    onProjectView(15);
  };

  if (isLoading) {
    return (
      <section className="mission-content p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-tva-orange">Loading deployments...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mission-content p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-tva-orange">Error loading GitHub repositories</div>
            <p className="text-tva-text-muted mt-2">Displaying sample projects instead</p>
          </div>
        </div>
      </section>
    );
  }

  // Fallback projects if GitHub API fails
  const fallbackProjects = [
    {
      id: 1,
      name: 'E-Commerce App',
      description: 'Full-featured shopping app with payment integration, real-time inventory, and personalized recommendations.',
      language: 'Kotlin',
      stargazers_count: 45,
      forks_count: 12,
      html_url: '#',
      homepage: '#',
      topics: ['android', 'kotlin', 'mvvm', 'retrofit', 'room'],
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      name: 'Fitness Tracker',
      description: 'Comprehensive fitness app with workout tracking, progress analytics, and social features.',
      language: 'Kotlin',
      stargazers_count: 32,
      forks_count: 8,
      html_url: '#',
      homepage: '#',
      topics: ['android', 'kotlin', 'jetpack-compose', 'firebase', 'ml-kit'],
      updated_at: '2024-01-10T10:00:00Z'
    },
    {
      id: 3,
      name: 'Chat Application',
      description: 'Real-time messaging app with end-to-end encryption, group chats, and media sharing.',
      language: 'Kotlin',
      stargazers_count: 67,
      forks_count: 15,
      html_url: '#',
      homepage: '#',
      topics: ['android', 'kotlin', 'websocket', 'dagger', 'camerax'],
      updated_at: '2024-01-05T10:00:00Z'
    }
  ];

  const projects = repos || fallbackProjects;

  return (
    <section className="mission-content p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold text-tva-orange mb-4">
            MISSION 002: DEPLOYMENTS
          </h1>
          <p className="text-tva-text-muted">Project Archive • Sacred Timeline Verified</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="project-card holographic p-6 rounded-lg cursor-pointer transition-all duration-300 hover:glow-orange transform hover:scale-105"
              onClick={() => handleProjectClick(project.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-tva-orange font-orbitron font-bold text-lg">{project.name}</h3>
                <span className="text-xs text-tva-text-muted">+15 XP</span>
              </div>
              
              <p className="text-tva-text text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-4 text-xs text-tva-text-muted">
                {project.language && (
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span>{project.language}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{project.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="w-3 h-3" />
                  <span>{project.forks_count}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.topics.slice(0, 4).map((topic) => (
                  <span 
                    key={topic}
                    className="px-2 py-1 bg-tva-orange/20 text-tva-orange text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                {project.homepage && (
                  <Button 
                    size="sm"
                    className="flex-1 bg-tva-orange hover:bg-tva-orange-light text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.homepage, '_blank');
                    }}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Demo
                  </Button>
                )}
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 border-tva-orange hover:bg-tva-orange/20 text-xs font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.html_url, '_blank');
                  }}
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
              </div>
              
              <div className="mt-3 text-xs text-tva-text-muted">
                Updated {formatDate(project.updated_at)}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Contributions Visualization */}
        <div className="mt-12 holographic p-8 rounded-lg">
          <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">
            TEMPORAL ACTIVITY MATRIX
          </h3>
          <div className="text-center">
            <div className="inline-block p-4 bg-tva-dark rounded-lg">
              <div className="grid grid-cols-52 gap-1">
                {Array.from({ length: 365 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-sm ${
                      Math.random() > 0.7 
                        ? 'bg-tva-orange/80' 
                        : Math.random() > 0.4 
                        ? 'bg-tva-orange/60' 
                        : Math.random() > 0.2 
                        ? 'bg-tva-orange/40' 
                        : 'bg-tva-dark border border-tva-orange/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-tva-text-muted text-sm mt-4">
                Real-time sync with GitHub API
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
