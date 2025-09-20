import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail,
  FileText,
  CreditCard
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Owners = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const owners = [
    {
      id: 1,
      name: "Roberto Fernández",
      cuit: "20-12345678-9",
      email: "roberto.fernandez@email.com",
      phone: "+54 11 1234-5678",
      properties: 3,
      totalIncome: 135000,
      bankAccount: "1234567890123456789012",
      status: "Activo"
    },
    {
      id: 2,
      name: "Elena Martínez",
      cuit: "27-87654321-4", 
      email: "elena.martinez@email.com",
      phone: "+54 11 8765-4321",
      properties: 2,
      totalIncome: 89000,
      bankAccount: "9876543210987654321098",
      status: "Activo"
    },
    {
      id: 3,
      name: "Miguel Santos",
      cuit: "20-11223344-5",
      email: "miguel.santos@email.com", 
      phone: "+54 11 1122-3344",
      properties: 1,
      totalIncome: 45000,
      bankAccount: "1122334455667788990011",
      status: "Pendiente"
    },
    {
      id: 4,
      name: "Carmen Vega",
      cuit: "27-44332211-8",
      email: "carmen.vega@email.com",
      phone: "+54 11 4433-2211", 
      properties: 4,
      totalIncome: 180000,
      bankAccount: "4433221155667788990044",
      status: "Activo"
    }
  ];

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.cuit.includes(searchTerm) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      "Activo": "default",
      "Pendiente": "secondary",
      "Inactivo": "destructive"
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
            <Building className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Propietarios</h1>
            <p className="text-muted-foreground">Gestión de propietarios y dueños de inmuebles</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Propietario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{owners.length}</div>
            <p className="text-sm text-muted-foreground">Total Propietarios</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{owners.filter(o => o.status === "Pendiente").length}</div>
            <p className="text-sm text-muted-foreground">Pagos Pendientes</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">${Math.round(owners.reduce((sum, o) => sum + o.totalIncome, 0) / owners.length).toLocaleString('es-AR')}</div>
            <p className="text-sm text-muted-foreground">Ingreso Promedio</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{owners.filter(o => o.properties > 1).length}</div>
            <p className="text-sm text-muted-foreground">Multi-propietarios</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Lista de Propietarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, CUIT o email..."
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
                  <TableHead>Propietario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Propiedades</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Datos Bancarios</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOwners.map((owner) => (
                  <TableRow key={owner.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{owner.name}</p>
                        <p className="text-sm text-muted-foreground">CUIT: {owner.cuit}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3" />
                          {owner.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3" />
                          {owner.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-primary">{owner.properties}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">${owner.totalIncome.toLocaleString('es-AR')}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(owner.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-mono">***{owner.bankAccount.slice(-4)}</p>
                      </div>
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

          {filteredOwners.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron propietarios</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Owners;