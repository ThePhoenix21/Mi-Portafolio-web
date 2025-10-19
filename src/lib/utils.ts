import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Funcion para combinar clases
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Funcion para calcular la experiencia laboral desde el 1 de mayo de 2023
export const calculateYearsOfExperience = (): number => {
  const startDate = new Date('2023-05-01');
  const currentDate = new Date();
  
  let years = currentDate.getFullYear() - startDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startDate.getMonth();
  
  
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < startDate.getDate())) {
    years--;
  }
  
  return Math.max(0, years);
};

/**
 * Función de scroll suave personalizada
 */
const smoothScrollTo = (targetPosition: number, duration: number = 800): void => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(
      timeElapsed,
      startPosition,
      distance,
      duration
    );
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  };

  // Función de easing para una transición suave
  const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  window.requestAnimationFrame(animation);
};

/**
 * Desplaza la ventana suavemente hasta la sección con el ID especificado
 * @param sectionId - El ID de la sección a la que se debe hacer scroll
 */
export const scrollToSection = (sectionId: string): void => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Calcular la posición con un offset para el header
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  // Usar nuestra función de scroll suave personalizada
  smoothScrollTo(offsetPosition);

  // Manejo de foco para accesibilidad
  element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
};

// Función que genera un manejador para descargar el CV, evitando descargas múltiples
// si el usuario hace clic repetidamente. El estado se mantiene entre llamadas.
const DOWNLOAD_COOLDOWN = 3000; // 3 segundos de espera entre descargas

type DownloadHandler = {
  handler: () => void;
  isDownloading: boolean;
  setUpdateState: (updater: (value: boolean) => void) => void;
};
interface DownloadCVHandler {
  handler: () => Promise<void>;
  cleanup: () => void;
}

/**
 * Crea un manejador para descargar el CV con manejo de estado y limpieza
 * @returns {DownloadCVHandler} Objeto con las funciones handler y cleanup
 */
export const createDownloadCVHandler = (): DownloadCVHandler => {
  let isDownloading = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let activeLink: HTMLAnchorElement | null = null;

  const cleanupResources = () => {
    if (activeLink) {
      document.body.removeChild(activeLink);
      activeLink = null;
    }
  };

  const handler = async (): Promise<void> => {
    if (isDownloading) return;
    
    isDownloading = true;
    cleanupResources();

    try {
      const cvUrl = import.meta.env.VITE_CV_URL;
      if (!cvUrl) {
        throw new Error('La URL del CV no está configurada en las variables de entorno');
      }

      // Asegurar que la URL sea válida
      const url = new URL(cvUrl.startsWith('http') ? cvUrl : `https://${cvUrl}`);
      
      // Método 1: Descarga directa con fetch + blob (funciona en la mayoría de navegadores modernos)
      try {
        const response = await fetch(url.toString(), {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/pdf' },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        activeLink = document.createElement('a');
        activeLink.href = blobUrl;
        activeLink.download = 'CV-James-Cordova.pdf';
        activeLink.style.display = 'none';
        
        document.body.appendChild(activeLink);
        activeLink.click();
        
        // Limpiar después de un tiempo
        setTimeout(() => {
          cleanupResources();
          if (blobUrl) window.URL.revokeObjectURL(blobUrl);
        }, 100);
        
        return;
      } catch (fetchError) {
        console.warn('No se pudo descargar con fetch, intentando método alternativo...', fetchError);
      }

      // Método 2: Abrir en nueva pestaña si falla la descarga directa
      try {
        const newWindow = window.open(url.toString(), '_blank', 'noopener,noreferrer');
        
        // Si el navegador bloquea la apertura de ventanas emergentes
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          throw new Error('No se pudo abrir la ventana emergente');
        }
      } catch (windowError) {
        console.warn('No se pudo abrir en nueva ventana, intentando último método...', windowError);
        
        // Último recurso: Crear un enlace temporal
        activeLink = document.createElement('a');
        activeLink.href = url.toString();
        activeLink.target = '_blank';
        activeLink.rel = 'noopener noreferrer';
        activeLink.style.display = 'none';
        
        document.body.appendChild(activeLink);
        activeLink.click();
      }
    } catch (error) {
      console.error('Error al procesar la descarga del CV:', error);
      alert('No se pudo abrir el CV. Por favor, inténtalo de nuevo o contáctame en jamescorcam@gmail.com');
    } finally {
      // Resetear el estado después de un tiempo
      timeoutId = setTimeout(() => {
        cleanupResources();
        isDownloading = false;
      }, 1500);
    }
  };

  const cleanup = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    cleanupResources();
    isDownloading = false;
  };

  // Limpiar al desmontar el componente
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanup);
  }

  return { handler, cleanup };
};
