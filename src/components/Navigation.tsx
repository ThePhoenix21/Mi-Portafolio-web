import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHideNav, setShouldHideNav] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth <= 1024);
      
      setIsScrolled(currentScrollY > 50);
      
      if (isMediumScreen) {
        if (currentScrollY < 50) {
          // Cerca del inicio, siempre mostrar
          setShouldHideNav(false);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scroll hacia abajo, ocultar
          setShouldHideNav(true);
        } else if (currentScrollY < lastScrollY) {
          // Scroll hacia arriba, mostrar
          setShouldHideNav(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Manejar el scroll y posición al abrir/cerrar el menú
  useEffect(() => {
    if (isMenuOpen) {
      // Solo deshabilitar el scroll sin modificar la posición
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      // Restaurar el scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      // Limpieza al desmontar
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-button') && !target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const phrases1 = separatePhrases.map(sp => sp[0]);
  const phrases2 = separatePhrases.map(sp => sp[1]);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setIndex(prev => (prev + 1) % separatePhrases.length);
    }, 6000);
  };

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleNavClick = (sectionId: string) => {
    // Cerrar el menú
    setIsMenuOpen(false);
    
    // Habilitar scroll nuevamente
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    
    // Hacer scroll suave a la sección
    setTimeout(() => {
      scrollToSection(sectionId);
      
      // Enfocar la sección para accesibilidad
      const section = document.getElementById(sectionId);
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      }
    }, 50); // Pequeño retraso para permitir que el menú se cierre
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
      isScrolled ? 'glass shadow-card h-20' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-row lg:flex-row md:flex-col items-center justify-between">
          <div className={`flex flex-col lg:flex-row lg:w-full items-center lg:justify-between py-4 lg:py-0 w-full transition-all duration-300 transform ${
            shouldHideNav ? 'md:-translate-y-full md:opacity-0 md:invisible' : ''}`}>
            <div className="text-xl font-bold text-primary-glow font-mono pb-2 lg:pb-0 md:block sm:block sm:pb-0">
              &lt;Portfolio/&gt;
            </div>
            <div className="hidden md:flex flex-col h-[3rem] w-[460px] lg:w-[460px] px-6">
              <AnimatedText phrases={phrases1} index={index} onAnimationEnd={handleAnimationEnd} />
              <AnimatedText phrases={phrases2} index={index} />
            </div>
          </div>

          
          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-1 ${
            isScrolled && isMediumScreen ? 'absolute top-5' : ''}`}>
            {navLinks.map((link) => (
              <Button 
                key={link.id}
                variant="ghost" 
                onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
                className="text-foreground hover:text-primary-glow transition-colors"
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mobile-menu-button">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? (
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } pt-20 z-40 mobile-menu overflow-y-auto`}
        style={{ 
          display: isMenuOpen ? 'block' : 'none',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          height: '100vh',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform, opacity'
        }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-2 h-full">
          {navLinks.map((link) => (
            <Button 
              key={link.id}
              variant="ghost" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="text-foreground hover:text-primary-glow transition-colors text-lg py-6 w-full justify-start"
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick(link.id)}
              role="menuitem"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;