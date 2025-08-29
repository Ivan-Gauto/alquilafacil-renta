import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  FileText, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  DollarSign
} from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app, this would come from Supabase
  const stats = {
    totalProperties: 124,
    activeTenants: 98,
    activeContracts: 87,
    monthlyRevenue: 245000,
    pendingPayments: 12,
    expiringContracts: 8,
    maintenanceRequests: 5,
    occupancyRate: 92
  };

  const recentPayments = [
    { id: 1, tenant: "Juan Pérez", property: "Av. Corrientes 1234", amount: 45000, date: "2024-01-15", status: "paid" },
    { id: 2, tenant: "María García", property: "San Martín 567", amount: 38000, date: "2024-01-14", status: "pending" },
    { id: 3, tenant: "Carlos López", property: "Rivadavia 890", amount: 52000, date: "2024-01-13", status: "paid" },
  ];

  const expiringContracts = [
    { id: 1, tenant: "Ana Rodríguez", property: "Belgrano 456", expiryDate: "2024-02-28", daysLeft: 15 },
    { id: 2, tenant: "Luis Martínez", property: "Mitre 789", expiryDate: "2024-03-15", daysLeft: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general del sistema</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Último acceso</p>
          <p className="font-medium">{new Date().toLocaleDateString('es-AR')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inmuebles Totales
            </CardTitle>
            <Building2 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalProperties}</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inquilinos Activos
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeTenants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.occupancyRate}% ocupación
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contratos Activos
            </CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeContracts}</div>
            <p className="text-xs text-warning flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" />
              {stats.expiringContracts} próximos a vencer
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos Mensual
            </CardTitle>
            <DollarSign className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${stats.monthlyRevenue.toLocaleString('es-AR')}
            </div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +8.2% vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{payment.tenant}</p>
                    <p className="text-sm text-muted-foreground">{payment.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${payment.amount.toLocaleString('es-AR')}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={payment.status === 'paid' ? 'default' : 'secondary'}
                        className={payment.status === 'paid' ? 'bg-success text-success-foreground' : ''}
                      >
                        {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiring Contracts */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-warning" />
              Contratos por Vencer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contract.tenant}</p>
                    <p className="text-sm text-muted-foreground">{contract.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{contract.expiryDate}</p>
                    <Badge variant="secondary" className="bg-warning/10 text-warning">
                      {contract.daysLeft} días
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Alertas del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{stats.pendingPayments} Pagos Pendientes</p>
                  <p className="text-sm text-muted-foreground">Requieren atención inmediata</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{stats.expiringContracts} Contratos Vencen</p>
                  <p className="text-sm text-muted-foreground">En los próximos 30 días</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{stats.maintenanceRequests} Mantenimientos</p>
                  <p className="text-sm text-muted-foreground">Solicitudes abiertas</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;