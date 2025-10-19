import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <motion.h1 
            className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">¡Ups! Página no encontrada</h2>
          <p className="text-gray-500 mt-2">
            La página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg"
          >
            Volver al inicio
          </Button>
          
          <div className="text-sm text-gray-500 mt-6">
            <p>O explora mis proyectos:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a 
                href="#projects" 
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/#projects');
                }}
              >
                Proyectos
              </a>
              <a 
                href="#contact" 
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/#contact');
                }}
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
