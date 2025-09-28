import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

const AboutSection: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useInViewAnimation();
  const { ref: textRef, isInView: textInView } = useInViewAnimation({ delay: 200 });
  const { ref: cardsRef, isInView: cardsInView } = useInViewAnimation({ delay: 400 });

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-bold mb-4 text-foreground transition-all duration-800 ${
              titleInView ? 'animate-fade-in-up' : 'animate-hidden'
            }`}
          >
            About <span className="text-primary-glow">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={textRef}
            className={`space-y-6 transition-all duration-800 ${
              textInView ? 'animate-fade-in-left' : 'animate-hidden'
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Soy un desarrollador apasionado que disfruta creando soluciones elegantes a problemas complejos. Con años de experiencia en tecnologías web modernas, disfruto creando aplicaciones que marcan la diferencia.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mi trayectoria comenzó con la curiosidad por cómo funcionan las cosas y evolucionó hacia una carrera dedicada a crear experiencias digitales que los usuarios adoran. Creo en el código limpio, el diseño centrado en el usuario y el aprendizaje continuo.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cuando no estoy programando, me puedes encontrar explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o compartiendo conocimientos con la comunidad de desarrolladores.
            </p>
          </div>
          
          <div 
            ref={cardsRef}
            className={`grid gap-6 transition-all duration-800 ${
              cardsInView ? 'animate-fade-in-right' : 'animate-hidden'
            }`}
          >
            <Card className="glass hover-glow animate-delay-100">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary-glow mb-2">3+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">años de experiencia</div>
              </CardContent>
            </Card>
            
            <Card className="glass hover-glow animate-delay-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary-glow mb-2">2+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Proyectos completados</div>
              </CardContent>
            </Card>
            
            <Card className="glass hover-glow animate-delay-300">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary-glow mb-2">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">satisfación de mis clientes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;