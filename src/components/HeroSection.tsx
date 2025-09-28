import React from 'react';
import { Button } from './ui/button';

const HeroSection: React.FC = () => {

  return (
    <section id="home" className="min-h-screen flex items-center justify-center matrix-bg">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            James Cordova
          </h1>
          <h2 className="text-4xl md:text-4xl font-bold mb-8 text-foreground">
            desarrollador web
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Hola, soy un entusiasta de la tecnología con pasión por el desarrollo web. Me encanta aprender sobre nuevas tecnologías y convertir ideas en interfaces útiles. Soy autodidacta y siempre estoy buscando nuevos retos para mejorar mis habilidades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Mira mi trabajo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Descargar CV
            </Button>
          </div>
        </div>        
      </div>
    </section>
  );
};

export default HeroSection;