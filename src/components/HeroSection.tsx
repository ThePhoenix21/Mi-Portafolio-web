import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { createDownloadCVHandler, scrollToSection } from '@/lib/utils';
import { TypewriterText } from '../lib/AnimatedTextOnce';

const HeroSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadHandler = createDownloadCVHandler();

  const handleClick = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    downloadHandler.handler();
    setTimeout(() => setIsDownloading(false), 1500);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="flex justify-center text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent ">
            James Cordova
          </h1>
          <h2 className="text-4xl md:text-4xl font-bold mb-8 text-foreground flex justify-center">
            desarrollador web
          </h2>
          
          <div className="mb-12 max-w-2xl mx-auto h-40">
          <TypewriterText 
            text="Hola, soy un entusiasta de la tecnología con pasión por el desarrollo web. Me encanta aprender sobre nuevas tecnologías y convertir ideas en interfaces útiles. Soy autodidacta y siempre estoy buscando nuevos retos para mejorar mis habilidades." 
            speed={30} 
          />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('projects')}
            >
              Mira mi trabajo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-4 text-lg font-semibold ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleClick}
              disabled={isDownloading}
            >
              {isDownloading ? 'Descargando...' : 'Descargar CV'}
            </Button>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;