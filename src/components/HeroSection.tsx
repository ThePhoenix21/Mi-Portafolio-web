import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { createDownloadCVHandler, scrollToSection } from '@/lib/utils';
import { TypewriterText } from '../lib/AnimatedTextOnce';

const HeroSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadHandler] = useState(() => createDownloadCVHandler());

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      downloadHandler.cleanup();
    };
  }, [downloadHandler]);

  const handleClick = async () => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      await new Promise<void>((resolve) => {
        downloadHandler.handler();
        // Esperamos un momento para asegurar que la descarga se inicie
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      console.error('Error al manejar la descarga:', error);
      // El manejador ya muestra un alerta de error
    } finally {
      // Restablecer el estado después de 1.5 segundos
      const timer = setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 md:pt-60 lg:pt-40">
      <video className="absolute top-0 left-0 w-full h-full object-cover" src="public/programming.mp4" autoPlay loop muted></video>
      <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 z-10">
          <h1 className="flex flex-wrap justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            James Cordova
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground/90 flex justify-center">
            desarrollador web
          </h2>
          
          <div className="mb-8 sm:mb-12 max-w-2xl mx-auto min-h-[120px] sm:min-h-[160px] px-4 sm:px-0">
            <div className="text-center text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
              <TypewriterText 
                text="Hola, soy un entusiasta de la tecnología con pasión por el desarrollo web. Me encanta aprender sobre nuevas tecnologías y convertir ideas en interfaces útiles. Soy autodidacta y siempre estoy buscando nuevos retos para mejorar mis habilidades." 
                speed={30} 
              />
            </div>
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