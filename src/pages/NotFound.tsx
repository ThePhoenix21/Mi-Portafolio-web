import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">¡Ups! Página no encontrada</p>
        <Button 
          onClick={() => window.location.href = "/"}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
