import { CheckCircle } from 'lucide-react';

export function IdentityFile() {
  const achievements = [
    "Senior Android Developer",
    "5+ Years Experience", 
    "Kotlin Expert",
    "Material Design Excellence",
    "Clean Architecture",
    "Performance Optimization"
  ];

  const timeline = [
    { role: "Senior Android Developer", period: "2019 - Present", status: "current" },
    { role: "Android Developer", period: "2017 - 2019", status: "completed" },
    { role: "Junior Developer", period: "2016 - 2017", status: "completed" }
  ];

  return (
    <section className="mission-content p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-orbitron font-bold text-tva-orange mb-4 text-glitch animate-glitch" data-text="MISSION 001: IDENTITY FILE">
            MISSION 001: IDENTITY FILE
          </h1>
          <p className="text-tva-text-muted">Developer Classification: ANDROID_SPECIALIST</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Dossier */}
          <div className="holographic p-8 rounded-lg">
            <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">SUBJECT PROFILE</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                  alt="Saurabh Pandey" 
                  className="w-24 h-24 rounded-full border-2 border-tva-orange glow-orange object-cover"
                />
                <div>
                  <h4 className="text-tva-text font-bold text-lg">SAURABH PANDEY</h4>
                  <p className="text-tva-orange">Android Developer</p>
                  <p className="text-tva-text-muted text-sm">Classification: SENIOR</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-tva-orange">Experience:</span>
                  <span className="text-tva-text ml-2">5+ Years</span>
                </div>
                <div>
                  <span className="text-tva-orange">Platform:</span>
                  <span className="text-tva-text ml-2">Android Native</span>
                </div>
                <div>
                  <span className="text-tva-orange">Primary Language:</span>
                  <span className="text-tva-text ml-2">Kotlin</span>
                </div>
                <div>
                  <span className="text-tva-orange">Status:</span>
                  <span className="text-tva-green ml-2">ACTIVE</span>
                </div>
              </div>

              <div className="border-t border-tva-orange/30 pt-4">
                <h5 className="text-tva-orange font-semibold mb-3">MISSION SUMMARY</h5>
                <p className="text-tva-text text-sm leading-relaxed">
                  Senior Android Developer with extensive experience in building scalable mobile applications. 
                  Specialized in Kotlin development, modern Android architecture patterns, and creating 
                  exceptional user experiences. Proven track record of delivering high-quality applications 
                  that serve millions of users across various domains.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Achievements */}
          <div className="holographic p-8 rounded-lg">
            <h3 className="text-tva-orange font-orbitron font-bold text-xl mb-6">TIMELINE ACHIEVEMENTS</h3>
            
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-tva-dark/50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'current' ? 'bg-tva-green glow-green' : 
                    item.status === 'completed' ? 'bg-tva-orange' : 'bg-tva-text-muted'
                  }`}></div>
                  <div>
                    <div className="text-tva-text font-semibold">{item.role}</div>
                    <div className="text-tva-text-muted text-sm">{item.period}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-tva-orange/30">
              <h5 className="text-tva-orange font-semibold mb-3">CORE DIRECTIVES</h5>
              <div className="space-y-2 text-sm">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-tva-green" />
                    <span className="text-tva-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
