import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const contracts = [
    {
      id: "CT-001",
      tenant: "Juan Pérez",
      property: "Av. Corrientes 1234",
      owner: "Roberto Fernández",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      monthlyRent: 45000,
      commission: 10,
      status: "Activo",
      deposit: 45000,
      warrantyType: "Garante"
    },
    {
      id: "CT-002",
      tenant: "María García",
      property: "San Martín 567",
      owner: "Elena Martínez",
      startDate: "2024-02-01",
      endDate: "2026-01-31",
      monthlyRent: 38000,
      commission: 8,
      status: "Pendiente",
      deposit: 76000,
      warrantyType: "Seguro de Caución"
    },
    {
      id: "CT-003",
      tenant: "Carlos López",
      property: "Rivadavia 890",
      owner: "Miguel Santos",
      startDate: "2023-06-01",
      endDate: "2025-05-31",
      monthlyRent: 52000,
      commission: 12,
      status: "Por Vencer",
      deposit: 52000,
      warrantyType: "Garante"
    },
    {
      id: "CT-004",
      tenant: "Ana Rodríguez",
      property: "Belgrano 456",
      owner: "Carmen Vega",
      startDate: "2024-03-01",
      endDate: "2026-02-28",
      monthlyRent: 41000,
      commission: 10,
      status: "Rescindido",
      deposit: 82000,
      warrantyType: "Seguro de Caución"
    }
  ];

  const filteredContracts = contracts.filter(contract =>
    contract.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Activo": { variant: "default", icon: CheckCircle, className: "bg-success text-success-foreground" },
      "Pendiente": { variant: "secondary", icon: Clock, className: "bg-warning text-warning-foreground" },
      "Por Vencer": { variant: "destructive", icon: AlertCircle, className: "bg-orange-500 text-white" },
      "Rescindido": { variant: "outline", icon: AlertCircle, className: "bg-muted text-muted-foreground" }
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;
    
    return (
      <Badge 
        variant={config?.variant || "secondary"}
        className={`flex items-center gap-1 ${config?.className || ""}`}
      >
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getRemainingDays = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contratos</h1>
            <p className="text-muted-foreground">Gestión completa de contratos de alquiler</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Contrato
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{contracts.length}</div>
            <p className="text-sm text-muted-foreground">Total Contratos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{contracts.filter(c => c.status === "Activo").length}</div>
            <p className="text-sm text-muted-foreground">Activos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{contracts.filter(c => c.status === "Pendiente").length}</div>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-500">{contracts.filter(c => c.status === "Por Vencer").length}</div>
            <p className="text-sm text-muted-foreground">Por Vencer</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por contrato, inquilino, propiedad..."
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
                  <TableHead>Contrato</TableHead>
                  <TableHead>Inquilino</TableHead>
                  <TableHead>Propiedad</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Alquiler</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Garantía</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{contract.id}</p>
                        <p className="text-sm text-muted-foreground">Propietario: {contract.owner}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{contract.tenant}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{contract.property}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3" />
                          {contract.startDate} - {contract.endDate}
                        </div>
                        {contract.status === "Activo" && (
                          <p className="text-xs text-muted-foreground">
                            {getRemainingDays(contract.endDate)} días restantes
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3" />
                          <p className="font-medium">${contract.monthlyRent.toLocaleString('es-AR')}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Com: {contract.commission}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(contract.status)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{contract.warrantyType}</p>
                        <p className="text-xs text-muted-foreground">
                          Depósito: ${contract.deposit.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        {contract.status === "Pendiente" && (
                          <Button variant="ghost" size="icon" className="w-8 h-8 text-success hover:text-success">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
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

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron contratos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Contracts;