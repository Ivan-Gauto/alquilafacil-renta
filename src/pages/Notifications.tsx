import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Search, 
  Settings,
  AlertTriangle,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  Check,
  Download,
  Archive
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "payment_overdue",
      title: "Pago Vencido",
      message: "Ana Rodríguez - Belgrano 456 - Mora de 65 días",
      tenant: "Ana Rodríguez", 
      property: "Belgrano 456",
      amount: 53300,
      daysOverdue: 65,
      date: "2024-01-20",
      priority: "high",
      status: "unread",
      category: "Morosos"
    },
    {
      id: 2,
      type: "contract_expiring",
      title: "Contrato por Vencer",
      message: "Carlos López - Rivadavia 890 - Vence en 120 días",
      tenant: "Carlos López",
      property: "Rivadavia 890", 
      daysToExpire: 120,
      date: "2024-01-19",
      priority: "medium",
      status: "unread",
      category: "Contratos"
    },
    {
      id: 3,
      type: "payment_pending",
      title: "Pago Pendiente",
      message: "María García - San Martín 567 - Alquiler Enero 2024",
      tenant: "María García",
      property: "San Martín 567",
      amount: 38000,
      period: "Enero 2024",
      date: "2024-01-18",
      priority: "medium",
      status: "read",
      category: "Pagos"
    },
    {
      id: 4,
      type: "contract_expiring",
      title: "Contrato por Vencer",
      message: "Luis Morales - Santa Fe 234 - Vence en 60 días", 
      tenant: "Luis Morales",
      property: "Santa Fe 234",
      daysToExpire: 60,
      date: "2024-01-17",
      priority: "high",
      status: "read",
      category: "Contratos"
    }
  ];

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.tenant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNotificationIcon = (type: string) => {
    const icons = {
      "payment_overdue": AlertTriangle,
      "payment_pending": DollarSign,
      "contract_expiring": Calendar,
      "system": Bell
    } as const;
    
    return icons[type as keyof typeof icons] || Bell;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      "high": { className: "bg-destructive text-destructive-foreground", label: "Alta" },
      "medium": { className: "bg-warning text-warning-foreground", label: "Media" },
      "low": { className: "bg-muted text-muted-foreground", label: "Baja" }
    } as const;
    
    const config = variants[priority as keyof typeof variants];
    
    return (
      <Badge className={config?.className || "bg-muted text-muted-foreground"}>
        {config?.label || "Baja"}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    return status === "unread" ? 
      <div className="w-2 h-2 bg-primary rounded-full"></div> : 
      <Check className="w-4 h-4 text-success" />;
  };

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-primary-foreground" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs text-destructive-foreground font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notificaciones</h1>
            <p className="text-muted-foreground">Centro de alertas y notificaciones del sistema</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Archive className="w-4 h-4 mr-2" />
            Archivar Leídas
          </Button>
          <Button variant="outline" className="border-border">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
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
              <Bell className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{notifications.length}</div>
                <p className="text-sm text-muted-foreground">Total Notificaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-foreground">{notifications.filter(n => n.priority === "high").length}</div>
                <p className="text-sm text-muted-foreground">Alta Prioridad</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <div className="text-2xl font-bold text-foreground">{unreadCount}</div>
                <p className="text-sm text-muted-foreground">Sin Leer</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-foreground">{notifications.filter(n => n.status === "read").length}</div>
                <p className="text-sm text-muted-foreground">Leídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Notificaciones</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Marcar Todas como Leídas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar notificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Sin Leer ({unreadCount})</TabsTrigger>
              <TabsTrigger value="high">Alta Prioridad ({notifications.filter(n => n.priority === "high").length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                        notification.status === "unread" 
                          ? "bg-primary/5 border-primary/20" 
                          : "bg-card border-border"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(notification.status)}
                          <div className={`p-2 rounded-lg ${
                            notification.priority === "high" 
                              ? "bg-destructive/10" 
                              : notification.priority === "medium" 
                              ? "bg-warning/10" 
                              : "bg-muted"
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              notification.priority === "high" 
                                ? "text-destructive" 
                                : notification.priority === "medium" 
                                ? "text-warning" 
                                : "text-muted-foreground"
                            }`} />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-foreground">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              
                              {notification.amount && (
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <span className="text-destructive font-medium">
                                    ${notification.amount.toLocaleString('es-AR')}
                                  </span>
                                  {notification.daysOverdue && (
                                    <span className="text-muted-foreground">
                                      {notification.daysOverdue} días de atraso
                                    </span>
                                  )}
                                </div>
                              )}
                              
                              {notification.daysToExpire && (
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Vence en {notification.daysToExpire} días
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              {getPriorityBadge(notification.priority)}
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="unread">
              <div className="space-y-3">
                {filteredNotifications
                  .filter(n => n.status === "unread")
                  .map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <div 
                        key={notification.id} 
                        className="p-4 rounded-lg border bg-primary/5 border-primary/20 transition-all hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                {getPriorityBadge(notification.priority)}
                                <span className="text-xs text-muted-foreground">{notification.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>

            <TabsContent value="high">
              <div className="space-y-3">
                {filteredNotifications
                  .filter(n => n.priority === "high")
                  .map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <div 
                        key={notification.id} 
                        className="p-4 rounded-lg border bg-destructive/5 border-destructive/20 transition-all hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(notification.status)}
                            <div className="p-2 rounded-lg bg-destructive/10">
                              <Icon className="w-4 h-4 text-destructive" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-foreground">{notification.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              </div>
                              
                              <div className="flex flex-col items-end gap-2">
                                {getPriorityBadge(notification.priority)}
                                <span className="text-xs text-muted-foreground">{notification.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </TabsContent>
          </Tabs>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron notificaciones</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;