import React from "react";

export const AnimatedScrollArrow = () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  
    React.useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const isAtBottom = window.innerHeight + currentScrollPos >= document.documentElement.scrollHeight - 50;
        
        // Mostrar/ocultar basado en la dirección del scroll y posición
        if (currentScrollPos > prevScrollPos && isAtBottom) {
          // Si el usuario está bajando y está cerca del final, ocultar
          setIsVisible(false);
        } else if (currentScrollPos < prevScrollPos) {
          // Si el usuario está subiendo, mostrar
          setIsVisible(true);
        }
        
        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);
  
    return (
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-primary-glow" 
            fill="none"
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    );
  };