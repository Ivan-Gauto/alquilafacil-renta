import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const payments = [
    {
      id: "PG-001",
      contractId: "CT-001",
      tenant: "Juan Pérez",
      property: "Av. Corrientes 1234",
      period: "Enero 2024",
      amount: 45000,
      fineAmount: 0,
      totalAmount: 45000,
      dueDate: "2024-01-10",
      paymentDate: "2024-01-08",
      status: "Pagado",
      receiptNumber: "RC-001-2024"
    },
    {
      id: "PG-002",
      contractId: "CT-002",
      tenant: "María García",
      property: "San Martín 567",
      period: "Enero 2024",
      amount: 38000,
      fineAmount: 0,
      totalAmount: 38000,
      dueDate: "2024-01-10",
      paymentDate: null,
      status: "Pendiente",
      receiptNumber: null
    },
    {
      id: "PG-003",
      contractId: "CT-003",
      tenant: "Carlos López",
      property: "Rivadavia 890",
      period: "Diciembre 2023",
      amount: 52000,
      fineAmount: 7800,
      totalAmount: 59800,
      dueDate: "2023-12-10",
      paymentDate: "2024-01-15",
      status: "Pagado con Mora",
      receiptNumber: "RC-003-2024"
    },
    {
      id: "PG-004",
      contractId: "CT-004",
      tenant: "Ana Rodríguez",
      property: "Belgrano 456",
      period: "Noviembre 2023",
      amount: 41000,
      fineAmount: 12300,
      totalAmount: 53300,
      dueDate: "2023-11-10",
      paymentDate: null,
      status: "Moroso",
      receiptNumber: null
    }
  ];

  const filteredPayments = payments.filter(payment =>
    payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Pagado": { variant: "default", icon: CheckCircle, className: "bg-success text-success-foreground" },
      "Pendiente": { variant: "secondary", icon: Clock, className: "bg-warning text-warning-foreground" },
      "Pagado con Mora": { variant: "outline", icon: AlertTriangle, className: "bg-orange-100 text-orange-800 border-orange-200" },
      "Moroso": { variant: "destructive", icon: AlertTriangle, className: "bg-destructive text-destructive-foreground" }
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

  const getDaysOverdue = (dueDate: string, status: string) => {
    if (status === "Pagado" || status === "Pagado con Mora") return 0;
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pagos</h1>
            <p className="text-muted-foreground">Registro y control de pagos de alquileres</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="w-4 h-4 mr-2" />
          Registrar Pago
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">${payments.reduce((sum, p) => sum + p.totalAmount, 0).toLocaleString('es-AR')}</div>
            <p className="text-sm text-muted-foreground">Total Recaudado</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{payments.filter(p => p.status === "Pagado" || p.status === "Pagado con Mora").length}</div>
            <p className="text-sm text-muted-foreground">Pagos Confirmados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{payments.filter(p => p.status === "Pendiente").length}</div>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{payments.filter(p => p.status === "Moroso").length}</div>
            <p className="text-sm text-muted-foreground">Morosos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Lista de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por inquilino, propiedad, período..."
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
                  <TableHead>Pago</TableHead>
                  <TableHead>Inquilino / Propiedad</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Montos</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Recibo</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{payment.id}</p>
                        <p className="text-sm text-muted-foreground">{payment.contractId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.tenant}</p>
                        <p className="text-sm text-muted-foreground">{payment.property}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{payment.period}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3" />
                          <p className="font-medium">${payment.amount.toLocaleString('es-AR')}</p>
                        </div>
                        {payment.fineAmount > 0 && (
                          <p className="text-xs text-destructive">
                            Mora: ${payment.fineAmount.toLocaleString('es-AR')}
                          </p>
                        )}
                        <p className="text-sm font-semibold">
                          Total: ${payment.totalAmount.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-3 h-3" />
                          Vence: {payment.dueDate}
                        </div>
                        {payment.paymentDate && (
                          <p className="text-xs text-success">
                            Pagado: {payment.paymentDate}
                          </p>
                        )}
                        {!payment.paymentDate && payment.status !== "Pagado" && (
                          <p className="text-xs text-destructive">
                            {getDaysOverdue(payment.dueDate, payment.status)} días de atraso
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell>
                      {payment.receiptNumber ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{payment.receiptNumber}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Sin recibo</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        {payment.receiptNumber && (
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        {payment.status === "Pendiente" && (
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

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron pagos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;