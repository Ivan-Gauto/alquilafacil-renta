import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  HardDrive, 
  Search, 
  Plus, 
  Download,
  Upload,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Database,
  Shield,
  Calendar,
  FileArchive
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Backups = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app, this would come from Supabase
  const backups = [
    {
      id: "BK-001",
      name: "backup_completo_2024_01_20",
      type: "Completo",
      date: "2024-01-20 03:00:00",
      size: "45.2 MB",
      status: "Completado",
      duration: "00:02:34",
      description: "Backup automático programado",
      tables: ["users", "tenants", "owners", "properties", "contracts", "payments"]
    },
    {
      id: "BK-002", 
      name: "backup_incremental_2024_01_19",
      type: "Incremental",
      date: "2024-01-19 15:30:00",
      size: "8.7 MB",
      status: "Completado",
      duration: "00:00:45",
      description: "Backup incremental manual",
      tables: ["payments", "contracts"]
    },
    {
      id: "BK-003",
      name: "backup_completo_2024_01_15",
      type: "Completo", 
      date: "2024-01-15 03:00:00",
      size: "43.8 MB",
      status: "Completado",
      duration: "00:02:28",
      description: "Backup automático programado",
      tables: ["users", "tenants", "owners", "properties", "contracts", "payments"]
    },
    {
      id: "BK-004",
      name: "backup_manual_2024_01_12", 
      type: "Manual",
      date: "2024-01-12 16:45:00",
      size: "41.1 MB",
      status: "Error",
      duration: "00:01:12",
      description: "Error al acceder a tabla de contratos",
      tables: ["users", "tenants", "owners", "properties"]
    }
  ];

  const filteredBackups = backups.filter(backup =>
    backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backup.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backup.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Completado": { variant: "default", icon: CheckCircle, className: "bg-success text-success-foreground" },
      "En Progreso": { variant: "secondary", icon: Clock, className: "bg-warning text-warning-foreground" },
      "Error": { variant: "destructive", icon: AlertTriangle, className: "bg-destructive text-destructive-foreground" }
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

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      "Completo": "bg-primary text-primary-foreground",
      "Incremental": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Manual": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    } as const;
    
    return (
      <Badge className={typeConfig[type as keyof typeof typeConfig] || "bg-muted text-muted-foreground"}>
        {type}
      </Badge>
    );
  };

  const totalSize = backups.reduce((sum, backup) => {
    const sizeInMB = parseFloat(backup.size.replace(' MB', ''));
    return sum + sizeInMB;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <HardDrive className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Backups</h1>
            <p className="text-muted-foreground">Respaldo y restauración de datos del sistema</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border">
            <Upload className="w-4 h-4 mr-2" />
            Restaurar
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
            <Plus className="w-4 h-4 mr-2" />
            Crear Backup
          </Button>
        </div>
      </div>

      {/* Warning Alert */}
      <Alert className="border-warning bg-warning/10">
        <Shield className="h-4 w-4 text-warning" />
        <AlertDescription className="text-warning-foreground">
          <strong>Importante:</strong> Solo los administradores pueden crear, restaurar y eliminar backups. 
          Los backups se realizan automáticamente cada día a las 03:00 AM.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{backups.length}</div>
                <p className="text-sm text-muted-foreground">Total Backups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <div className="text-2xl font-bold text-foreground">{backups.filter(b => b.status === "Completado").length}</div>
                <p className="text-sm text-muted-foreground">Exitosos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileArchive className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-foreground">{totalSize.toFixed(1)} MB</div>
                <p className="text-sm text-muted-foreground">Espacio Usado</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-foreground">{backups.filter(b => b.status === "Error").length}</div>
                <p className="text-sm text-muted-foreground">Con Error</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Configuración de Backups Automáticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Backup Completo Diario</p>
                <p className="text-sm text-muted-foreground">Todos los días a las 03:00 AM</p>
              </div>
              <Badge className="bg-success text-success-foreground">Activo</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Retención de Backups</p>
                <p className="text-sm text-muted-foreground">Mantener últimos 30 días</p>
              </div>
              <Badge variant="outline">30 días</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Ubicación de Almacenamiento</p>
                <p className="text-sm text-muted-foreground">Servidor seguro cifrado</p>
              </div>
              <Badge className="bg-primary text-primary-foreground">Seguro</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Último Backup Exitoso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {backups.filter(b => b.status === "Completado")[0] && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fecha:</span>
                  <span className="font-medium">{backups.filter(b => b.status === "Completado")[0].date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tamaño:</span>
                  <span className="font-medium">{backups.filter(b => b.status === "Completado")[0].size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duración:</span>
                  <span className="font-medium">{backups.filter(b => b.status === "Completado")[0].duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tablas:</span>
                  <span className="font-medium">{backups.filter(b => b.status === "Completado")[0].tables.length} tablas</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Backups List */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle>Historial de Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar backups por nombre, tipo o descripción..."
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
                  <TableHead>Backup</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha / Hora</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tablas</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBackups.map((backup) => (
                  <TableRow key={backup.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{backup.name}</p>
                        <p className="text-sm text-muted-foreground">{backup.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(backup.type)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{backup.date}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{backup.size}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{backup.duration}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(backup.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {backup.tables.length} tablas
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        {backup.status === "Completado" && (
                          <>
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-primary hover:text-primary">
                              <Upload className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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

          {filteredBackups.length === 0 && (
            <div className="text-center py-12">
              <HardDrive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No se encontraron backups</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Backups;