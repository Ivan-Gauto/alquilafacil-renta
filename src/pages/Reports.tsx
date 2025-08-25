import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Search, 
  FileText, 
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Building2,
  Users,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for operational reports
  const expiringContracts = [
    { id: "CT-003", tenant: "Carlos López", property: "Rivadavia 890", endDate: "2025-05-31", daysRemaining: 120 },
    { id: "CT-007", tenant: "Luis Morales", property: "Santa Fe 234", endDate: "2025-07-15", daysRemaining: 165 },
    { id: "CT-012", tenant: "Patricia Silva", property: "Córdoba 789", endDate: "2025-08-30", daysRemaining: 211 }
  ];

  const propertyInventory = [
    { id: 1, address: "Av. Corrientes 1234", type: "Departamento", status: "Ocupado", rentAmount: 45000 },
    { id: 2, address: "San Martín 567", type: "Casa", status: "Disponible", rentAmount: 65000 },
    { id: 3, address: "Rivadavia 890", type: "Departamento", status: "Ocupado", rentAmount: 38000 },
    { id: 4, address: "Belgrano 456", type: "PH", status: "Mantenimiento", rentAmount: 55000 }
  ];

  // Mock data for financial reports
  const delinquencyReport = [
    { tenant: "Ana Rodríguez", property: "Belgrano 456", amount: 53300, daysOverdue: 65, range: "+60 días" },
    { tenant: "Jorge Martín", property: "Alsina 123", amount: 47000, daysOverdue: 45, range: "31-60 días" },
    { tenant: "Sofia Herrera", property: "Defensa 678", amount: 39500, daysOverdue: 15, range: "0-30 días" }
  ];

  const monthlyIncome = [
    { month: "Enero 2024", collected: 287000, pending: 53300, commission: 28700, netOwners: 258300 },
    { month: "Diciembre 2023", collected: 295000, pending: 0, commission: 29500, netOwners: 265500 },
    { month: "Noviembre 2023", collected: 278000, pending: 47000, commission: 27800, netOwners: 250200 }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Ocupado": "default",
      "Disponible": "secondary",
      "Mantenimiento": "destructive"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const getDelinquencyBadge = (range: string) => {
    const colors = {
      "0-30 días": "bg-yellow-100 text-yellow-800",
      "31-60 días": "bg-orange-100 text-orange-800", 
      "+60 días": "bg-red-100 text-red-800"
    } as const;
    
    return (
      <Badge className={colors[range as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {range}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <PieChart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
            <p className="text-muted-foreground">Reportes operativos y financieros del sistema</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{propertyInventory.length}</div>
                <p className="text-sm text-muted-foreground">Inmuebles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-foreground">{propertyInventory.filter(p => p.status === "Ocupado").length}</div>
                <p className="text-sm text-muted-foreground">Ocupados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">${monthlyIncome[0]?.collected.toLocaleString('es-AR')}</div>
                <p className="text-sm text-muted-foreground">Recaudado Enero</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-foreground">{delinquencyReport.length}</div>
                <p className="text-sm text-muted-foreground">Morosos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report types */}
      <Tabs defaultValue="operational" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operational">Reportes Operativos</TabsTrigger>
          <TabsTrigger value="financial">Reportes Financieros</TabsTrigger>
        </TabsList>

        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expiring Contracts */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Contratos por Vencer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expiringContracts.map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{contract.tenant}</p>
                        <p className="text-sm text-muted-foreground">{contract.property}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{contract.endDate}</p>
                        <p className="text-xs text-muted-foreground">{contract.daysRemaining} días</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Inventory */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Inventario de Inmuebles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {propertyInventory.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-sm text-muted-foreground">{property.type}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        {getStatusBadge(property.status)}
                        <p className="text-sm font-medium">${property.rentAmount.toLocaleString('es-AR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Delinquency Report */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Reporte de Morosidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Inquilino</TableHead>
                      <TableHead>Propiedad</TableHead>
                      <TableHead>Monto Adeudado</TableHead>
                      <TableHead>Días de Atraso</TableHead>
                      <TableHead>Rango</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {delinquencyReport.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.tenant}</TableCell>
                        <TableCell>{item.property}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-destructive" />
                            <span className="font-medium text-destructive">
                              ${item.amount.toLocaleString('es-AR')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{item.daysOverdue}</TableCell>
                        <TableCell>{getDelinquencyBadge(item.range)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Income Report */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Reporte de Ingresos Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Período</TableHead>
                      <TableHead>Recaudado</TableHead>
                      <TableHead>Pendiente</TableHead>
                      <TableHead>Comisión</TableHead>
                      <TableHead>Neto Propietarios</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyIncome.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>
                          <span className="font-medium text-success">
                            ${item.collected.toLocaleString('es-AR')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${item.pending > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                            ${item.pending.toLocaleString('es-AR')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-primary">
                            ${item.commission.toLocaleString('es-AR')}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${item.netOwners.toLocaleString('es-AR')}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;