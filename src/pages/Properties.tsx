import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin,
  Home,
  Ruler,
  User
} from "lucide-react";
import property1 from "@/assets/property1.jpg";
import property2 from "@/assets/property2.jpg";
import property3 from "@/assets/property3.jpg";
import property4 from "@/assets/property4.jpg";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const properties = [
    {
      id: 1,
      address: "Av. Corrientes 1234, CABA",
      type: "Departamento",
      surface: 85,
      bedrooms: 2,
      bathrooms: 1,
      owner: "Roberto Fernández",
      status: "Ocupado",
      rentAmount: 45000,
      amenities: ["Balcón", "Cocina integrada", "Portero 24hs"],
      image: property1
    },
    {
      id: 2,
      address: "San Martín 567, Villa Crespo",
      type: "Casa",
      surface: 120,
      bedrooms: 3,
      bathrooms: 2,
      owner: "Elena Martínez",
      status: "Disponible",
      rentAmount: 65000,
      amenities: ["Patio", "Cochera", "Parrilla"],
      image: property2
    },
    {
      id: 3,
      address: "Rivadavia 890, Caballito",
      type: "Departamento",
      surface: 65,
      bedrooms: 1,
      bathrooms: 1,
      owner: "Miguel Santos",
      status: "Ocupado",
      rentAmount: 38000,
      amenities: ["Balcón", "Laundry"],
      image: property3
    },
    {
      id: 4,
      address: "Belgrano 456, Palermo",
      type: "PH",
      surface: 95,
      bedrooms: 2,
      bathrooms: 2,
      owner: "Carmen Vega",
      status: "Mantenimiento",
      rentAmount: 55000,
      amenities: ["Terraza", "Cochera", "Pileta"],
      image: property4
    }
  ];

  const filteredProperties = properties.filter(property =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      "Ocupado": "default",
      "Disponible": "secondary",
      "Mantenimiento": "destructive"
    } as const;
    
    const colors = {
      "Ocupado": "bg-primary text-primary-foreground",
      "Disponible": "bg-success text-success-foreground",
      "Mantenimiento": "bg-warning text-warning-foreground"
    } as const;
    
    return (
      <Badge 
        variant={variants[status as keyof typeof variants] || "secondary"}
        className={colors[status as keyof typeof colors] || ""}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inmuebles</h1>
            <p className="text-muted-foreground">Gestión completa del inventario de propiedades</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Inmueble
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{properties.length}</div>
            <p className="text-sm text-muted-foreground">Total Inmuebles</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{properties.filter(p => p.status === "Disponible").length}</div>
            <p className="text-sm text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{properties.filter(p => p.status === "Ocupado").length}</div>
            <p className="text-sm text-muted-foreground">Ocupados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{properties.filter(p => p.status === "Mantenimiento").length}</div>
            <p className="text-sm text-muted-foreground">En Mantenimiento</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Lista de Inmuebles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por dirección, tipo o propietario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="shadow-card border-0 overflow-hidden hover:shadow-elegant transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={`Imagen de ${property.address}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <h3 className="font-semibold text-foreground leading-tight">{property.address}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{property.type}</p>
                    </div>
                    {getStatusBadge(property.status)}
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{property.owner}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      <span>{property.surface}m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{property.bedrooms} hab, {property.bathrooms} baño{property.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Alquiler mensual</span>
                      <span className="font-bold text-lg text-primary">${property.rentAmount.toLocaleString('es-AR')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Comodidades</p>
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{property.amenities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron inmuebles</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Properties;