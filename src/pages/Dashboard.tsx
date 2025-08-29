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
        <Card className="shadow-card border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Inmuebles Totales
            </CardTitle>
            <Building2 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.totalProperties}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Inquilinos Activos
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.activeTenants}</div>
            <p className="text-xs text-slate-600 mt-1">
              {stats.occupancyRate}% ocupación
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Contratos Activos
            </CardTitle>
            <FileText className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.activeContracts}</div>
            <p className="text-xs text-amber-600 flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3" />
              {stats.expiringContracts} próximos a vencer
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Ingresos Mensual
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ${stats.monthlyRevenue.toLocaleString('es-AR')}
            </div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +8.2% vs mes anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card className="shadow-card border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <CreditCard className="w-5 h-5 text-primary" />
              Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{payment.tenant}</p>
                    <p className="text-sm text-slate-600">{payment.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">${payment.amount.toLocaleString('es-AR')}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={payment.status === 'paid' ? 'default' : 'secondary'}
                        className={payment.status === 'paid' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'}
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
        <Card className="shadow-card border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Calendar className="w-5 h-5 text-amber-600" />
              Contratos por Vencer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringContracts.map((contract) => (
                <div key={contract.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{contract.tenant}</p>
                    <p className="text-sm text-slate-600">{contract.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">{contract.expiryDate}</p>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
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
      <Card className="shadow-card border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-slate-900">Alertas del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{stats.pendingPayments} Pagos Pendientes</p>
                  <p className="text-sm text-slate-600">Requieren atención inmediata</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{stats.expiringContracts} Contratos Vencen</p>
                  <p className="text-sm text-slate-600">En los próximos 30 días</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{stats.maintenanceRequests} Mantenimientos</p>
                  <p className="text-sm text-slate-600">Solicitudes abiertas</p>
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