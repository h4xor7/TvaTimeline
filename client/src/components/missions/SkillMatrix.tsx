import { Code, Database, Smartphone, Cloud, Settings, TestTube } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export function SkillMatrix() {
  const technicalSkills: Skill[] = [
    { name: 'Kotlin', proficiency: 90 },
    { name: 'Android SDK', proficiency: 85 },
    { name: 'Jetpack Compose', proficiency: 80 },
    { name: 'Firebase', proficiency: 75 },
  ];

  const frameworkSkills: Skill[] = [
    { name: 'Android Architecture Components', proficiency: 80 },
    { name: 'MVVM / MVP Architecture', proficiency: 95 },
    { name: 'Room Database', proficiency: 85 },
    { name: 'Retrofit / OkHttp', proficiency: 90 },
    { name: 'Dagger / Hilt DI', proficiency: 75 },
    { name: 'JUnit / Espresso Testing', proficiency: 70 },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: 'MOBILE EXPERTISE',
      icon: <Smartphone className="text-3xl mb-4" />,
      skills: ['Material Design', 'Responsive UI/UX', 'Performance Optimization', 'Memory Management']
    },
    {
      title: 'BACKEND INTEGRATION',
      icon: <Cloud className="text-3xl mb-4" />,
      skills: ['REST API Integration', 'GraphQL', 'WebSocket', 'OAuth / JWT']
    },
    {
      title: 'DEVELOPMENT TOOLS',
      icon: <Settings className="text-3xl mb-4" />,
      skills: ['Android Studio', 'Git / GitHub', 'CI/CD Pipelines', 'Gradle Build System']
    }
  ];

  const SkillRing = ({ skill }: { skill: Skill }) => {
    const circumference = 2 * Math.PI * 16;
    const strokeDasharray = `${(skill.proficiency / 100) * circumference} ${circumference}`;
    
    return (
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-tva-dark"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={strokeDasharray}
              className="text-tva-orange glow-orange transition-all duration-1000 animate-float"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-tva-orange font-bold">{skill.proficiency}%</span>
          </div>
        </div>
        <p className="text-tva-text font-semibold">{skill.name}</p>
      </div>
    );
  };

  const SkillBar = ({ skill }: { skill: Skill }) => (
    <div className="flex items-center justify-between p-3 bg-tva-dark/50 rounded-lg">
      <div className="flex items-center space-x-3">
        {skill.icon || <Code className="text-tva-green text-xl" />}
        <span className="text-tva-text">{skill.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-20 h-2 bg-tva-dark rounded-full overflow-hidden">
          <div 
            className="h-full bg-tva-orange rounded-full transition-all duration-1000"
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
        <span className="text-tva-orange text-sm font-bold">{skill.proficiency}%</span>
      </div>
    </div>
  );

  return (
    <section className="mission-content p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold text-tva-orange mb-4">
            MISSION 003: SKILL MATRIX
          </h1>
          <p className="text-tva-text-muted">Capability Assessment • Proficiency Analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div className="holographic p-8 rounded-lg">
            <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">
              TECHNICAL PROFICIENCY
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {technicalSkills.map((skill) => (
                <SkillRing key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          {/* Framework & Tools */}
          <div className="holographic p-8 rounded-lg">
            <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">
              FRAMEWORK MASTERY
            </h3>
            
            <div className="space-y-4">
              {frameworkSkills.map((skill) => (
                <SkillBar 
                  key={skill.name} 
                  skill={{
                    ...skill,
                    icon: skill.name.includes('Architecture') ? <Code className="text-tva-green text-xl" /> :
                          skill.name.includes('Database') ? <Database className="text-tva-green text-xl" /> :
                          skill.name.includes('Testing') ? <TestTube className="text-tva-green text-xl" /> :
                          <Settings className="text-tva-green text-xl" />
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Skills Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="holographic p-6 rounded-lg text-center">
              <div className="text-tva-orange">{category.icon}</div>
              <h4 className="text-tva-orange font-orbitron font-bold mb-3">
                {category.title}
              </h4>
              <div className="space-y-2 text-sm">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-tva-text">
                    • {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
