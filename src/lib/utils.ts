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
export const createDownloadCVHandler = () => {
  let isDownloading = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handler = async () => {
    if (isDownloading) return;
    isDownloading = true;

    // Debug: Mostrar la URL que se está intentando acceder
    console.log('URL del CV desde VITE_CV_URL:', import.meta.env.VITE_CV_URL);
    console.log('Todas las variables de entorno:', import.meta.env);

    try {
      // Primero verificamos si el recurso está disponible
      const response = await fetch(import.meta.env.VITE_CV_URL, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('No se pudo acceder al archivo CV');
      }
      
      // Si el archivo existe, lo abrimos en una nueva pestaña
      const newWindow = window.open(import.meta.env.VITE_CV_URL, '_blank', 'noopener,noreferrer');
      
      // Si el navegador bloquea la apertura de ventanas, mostramos un mensaje
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Alternativa: abrir en la misma pestaña
        window.location.href = import.meta.env.VITE_CV_URL;
      }
    } catch (error) {
      console.error('Error al abrir el CV:', error);
      // Mostrar mensaje de error al usuario
      alert('No se pudo abrir el CV. Por favor, inténtalo de nuevo más tarde o contáctame directamente.');
    } finally {
      // Liberar después de 1.5 segundos
      timeoutId = setTimeout(() => {
        isDownloading = false;
      }, 1500);
    }
  };

  const cleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isDownloading = false;
  };

  return { handler, cleanup };
};