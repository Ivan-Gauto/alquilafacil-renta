import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
          <span className="text-4xl font-bold text-primary-foreground">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Página no encontrada</h1>
        <p className="text-xl text-muted-foreground mb-6">
          La página que buscas no existe o ha sido movida
        </p>
        <Button 
          onClick={() => window.location.href = "/dashboard"}
          className="bg-gradient-primary hover:opacity-90 shadow-elegant"
        >
          <Home className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
