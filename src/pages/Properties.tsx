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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      amenities: ["Balcón", "Cocina integrada", "Portero 24hs"]
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
      amenities: ["Patio", "Cochera", "Parrilla"]
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
      amenities: ["Balcón", "Laundry"]
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
      amenities: ["Terraza", "Cochera", "Pileta"]
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

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Inmueble</TableHead>
                  <TableHead>Propietario</TableHead>
                  <TableHead>Características</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Alquiler</TableHead>
                  <TableHead>Comodidades</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium text-foreground">{property.address}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{property.type}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm">{property.owner}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Ruler className="w-3 h-3" />
                          {property.surface}m²
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Home className="w-3 h-3" />
                          {property.bedrooms} hab, {property.bathrooms} baño{property.bathrooms > 1 ? 's' : ''}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(property.status)}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">${property.rentAmount.toLocaleString('es-AR')}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 2).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.amenities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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