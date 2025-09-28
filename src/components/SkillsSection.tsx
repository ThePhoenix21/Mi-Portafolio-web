import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const SkillsSection: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation();
  const { ref: skill1Ref, isInView: skill1InView } = useInViewAnimation({ delay: 200 });
  const { ref: skill2Ref, isInView: skill2InView } = useInViewAnimation({ delay: 400 });
  const { ref: skill3Ref, isInView: skill3InView } = useInViewAnimation({ delay: 600 });
  const { ref: skill4Ref, isInView: skill4InView } = useInViewAnimation({ delay: 800 });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Sass'],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Python', 'Express', 'Django', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux', 'Kubernetes'],
    },
    {
      title: 'Mobile & Others',
      icon: '📱',
      skills: ['React Native', 'Flutter', 'GraphQL', 'REST APIs', 'Firebase', 'Socket.io'],
    },
  ];

  const skillRefs = [skill1Ref, skill2Ref, skill3Ref, skill4Ref];
  const skillInViews = [skill1InView, skill2InView, skill3InView, skill4InView];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-800 ${
              titleInView ? 'animate-slide-in-right' : 'animate-hidden'
            }`}
          >
            Technical <span className="text-primary-glow">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              ref={skillRefs[index]}
              className={`glass hover-glow group transition-all duration-800 ${
                skillInViews[index] ? 'animate-bounce-in' : 'animate-hidden'
              }`}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <CardTitle className="text-foreground group-hover:text-primary-glow transition-colors">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li 
                      key={skillIndex} 
                      className="text-muted-foreground hover:text-primary-glow transition-colors cursor-default"
                    >
                      • {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;