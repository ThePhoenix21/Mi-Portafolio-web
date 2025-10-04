import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from './AnimatedText';
import { scrollToSection } from '@/lib/utils';

const separatePhrases = [
  ["El primer lenguaje de programación que aprendí fue VBA.", ""],
  ["A mi también me gusta salir de viaje con amigos!", ""],
  ["Soy un desarrollador con ganas", "de seguir creciendo día a día!"],
  ["Disfruto explorar nuevos lugares", "y probar comidas diferentes."],
  ["Soy programador gracias a mis amigos,", "que me inspiraron a aprender."],
  ["Tengo una gatita negra llamada Luna,", "la quiero muchísimo y siempre me acompaña."],
  ["Lunita decide mi hora de dormir:", "cuando tiene sueño, se acurruca en mi brazo."],
  ["Cuando el código corre a la primera, me río…", "pero reviso todo, porque eso nunca pasa."],
  ["El café, mi gatita y mis programas", "son parte de mi día a día."],
  ["A veces la IA quiere que reescriba medio proyecto", "para arreglar un detalle minusculo… qué linda."],
  ["ChatGPT es mi maestra, Google es mi libro de curso", "y YouTube son mis clases online."],
  ["cuando no entiendo algo investigo y entonces", "entiendo todavía menos... pero soy terco y sigo"],
  ["me gusta equivocarme, no entender porque sin esos", "gloriosos errores, mi vida sería aburridísima."],
  ["si fuera químico, seguro ya habría hecho explotar algo…", "por suerte los bucles infinitos no matan a nadie… creo."],
  ["un bug me pidió ser su padrino pero el compilador", "me guiñó el ojo justo antes de fallar"],
  ["Me gusta perderme en mundos virtuales… y a veces también ganar.", ""],
  ["Me gustan los videojuegos… y salir de compras con mi novia", "aunque ahí siempre pierdo."]
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phrases1 = separatePhrases.map(sp => sp[0]);
  const phrases2 = separatePhrases.map(sp => sp[1]);

  const handleAnimationEnd = () => {
    setTimeout(() => {
        setIndex(prev => (prev + 1) % separatePhrases.length);
    }, 6000);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass shadow-card' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col lg:flex-row lg:w-full items-center lg:justify-between py-4 lg:py-0 w-screen h-full">
            <div className="hidden text-xl font-bold text-primary-glow font-mono pb-2 lg:pb-0 md:block">
              &lt;Portfolio/&gt;
            </div>
            <div className="hidden md:flex flex-col h-[3rem] w-[460px] lg:w-[460px] px-6">
              <AnimatedText phrases={phrases1} index={index} onAnimationEnd={handleAnimationEnd} />
              <AnimatedText phrases={phrases2} index={index} />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary-glow transition-colors"
            >
              Inicio
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary-glow transition-colors"
            >
              Sobre mí
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('projects')}
              className="text-foreground hover:text-primary-glow transition-colors"
            >
              Proyectos
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('skills')}
              className="text-foreground hover:text-primary-glow transition-colors"
            >
              Habilidades
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary-glow transition-colors"
            >
              Contacto
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-7 h-7 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h20M4 12h20M4 20h20" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;