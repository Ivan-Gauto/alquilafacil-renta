import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail,
  FileText
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const tenants = [
    {
      id: 1,
      name: "Juan Pérez",
      dni: "12345678",
      email: "juan.perez@email.com",
      phone: "+54 11 1234-5678",
      property: "Av. Corrientes 1234",
      contractStatus: "Activo",
      rentAmount: 45000,
      lastPayment: "2024-01-15"
    },
    {
      id: 2,
      name: "María García",
      dni: "87654321", 
      email: "maria.garcia@email.com",
      phone: "+54 11 8765-4321",
      property: "San Martín 567",
      contractStatus: "Activo",
      rentAmount: 38000,
      lastPayment: "2024-01-10"
    },
    {
      id: 3,
      name: "Carlos López",
      dni: "11223344",
      email: "carlos.lopez@email.com", 
      phone: "+54 11 1122-3344",
      property: "Rivadavia 890",
      contractStatus: "Pendiente",
      rentAmount: 52000,
      lastPayment: "2024-01-13"
    },
    {
      id: 4,
      name: "Ana Rodríguez",
      dni: "44332211",
      email: "ana.rodriguez@email.com",
      phone: "+54 11 4433-2211", 
      property: "Belgrano 456",
      contractStatus: "Moroso",
      rentAmount: 41000,
      lastPayment: "2023-12-15"
    }
  ];

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.dni.includes(searchTerm) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      "Activo": "default",
      "Pendiente": "secondary", 
      "Moroso": "destructive"
    } as const;
    
    return (
      <Badge 
        variant={variants[status as keyof typeof variants] || "secondary"}
        className={status === "Activo" ? "bg-success text-success-foreground" : ""}
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
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inquilinos</h1>
            <p className="text-muted-foreground">Gestión de inquilinos del sistema</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Inquilino
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{tenants.length}</div>
            <p className="text-sm text-muted-foreground">Total Inquilinos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{tenants.filter(t => t.contractStatus === "Activo").length}</div>
            <p className="text-sm text-muted-foreground">Contratos Activos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{tenants.filter(t => t.contractStatus === "Pendiente").length}</div>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{tenants.filter(t => t.contractStatus === "Moroso").length}</div>
            <p className="text-sm text-muted-foreground">Morosos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Lista de Inquilinos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, DNI o email..."
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
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Propiedad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Alquiler</TableHead>
                  <TableHead>Último Pago</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{tenant.name}</p>
                        <p className="text-sm text-muted-foreground">DNI: {tenant.dni}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3" />
                          {tenant.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3" />
                          {tenant.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{tenant.property}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(tenant.contractStatus)}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">${tenant.rentAmount.toLocaleString('es-AR')}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{tenant.lastPayment}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <FileText className="w-4 h-4" />
                        </Button>
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

          {filteredTenants.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron inquilinos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tenants;