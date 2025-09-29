import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const SkillsSection: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation();
  const { ref: skill1Ref, isInView: skill1InView } = useInViewAnimation({ delay: 200 });
  const { ref: skill2Ref, isInView: skill2InView } = useInViewAnimation({ delay: 250 });
  const { ref: skill3Ref, isInView: skill3InView } = useInViewAnimation({ delay: 300 });
  const { ref: skill4Ref, isInView: skill4InView } = useInViewAnimation({ delay: 350 });
  const { ref: skill5Ref, isInView: skill5InView } = useInViewAnimation({ delay: 400 });
  const { ref: skill6Ref, isInView: skill6InView } = useInViewAnimation({ delay: 450 });
  const { ref: skill7Ref, isInView: skill7InView } = useInViewAnimation({ delay: 500 });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        'HTML5',
        'CSS3',
        'Javascript',
        'TypeScript',
        'React',
        'Next.js',
        'Astro',
        'Zustand',
        'Tailwind CSS',
        'Sass'
      ]      
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        'C#',
        'ASP.NET Core',
        'Entity Framework Core',
        'Node.js',
        'Express.js',
        'Nest.js',
        'Prisma',
        'Mongoose'
      ],
    },
    {
      title: 'Base de datos',
      icon: '🗄️',
      skills: [
        'SQL Server',
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'GraphQL',
        'REST APIs'
      ],
    },
    {
      title: 'Arquitecturas & Patrones',
      icon: '🏛️',
      skills: [
        // FrontEnd
        'Module-Based Structure (Frontend)',
        'Component-Based Architecture (Frontend)',
        // BackEnd
        'Module-Based (Backend)',
        'Clean Architecture (Backend)',
        'Layered Architecture (Backend)'
      ],
    },
    {
      title: 'Herramientas de desarrollo',
      icon: '🛠️',
      skills: ['Vite', 'Bun', 'npm', 'pnpm', 'Docker']
    },
    {
      title: 'IDE & Gestión de bases de datos',
      icon: '💻',
      skills: [
        'Visual Studio Code',
        'Visual Studio 2022',
        'SQL Server Management Studio',
        'pgAdmin',
        'Mongo Compass',
        'MySQL Workbench'
      ]
    },
    {
      title: 'APIs & Versionado',
      icon: '🔗',
      skills: ['Axios', 'fetch', 'Postman', 'Git', 'Sourcetree']
    }
  ];

  const skillRefs = [skill1Ref, skill2Ref, skill3Ref, skill4Ref, skill5Ref, skill6Ref, skill7Ref];
  const skillInViews = [skill1InView, skill2InView, skill3InView, skill4InView, skill5InView, skill6InView, skill7InView];

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
            Habilidades <span className="text-primary-glow">técnicas</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologías y herramientas que uso para dar vida a ideas
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