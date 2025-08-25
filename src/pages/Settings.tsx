import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Save,
  Bell,
  Shield,
  Database,
  Mail,
  DollarSign,
  Calendar,
  FileText,
  Users,
  Building2
} from "lucide-react";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "InmoGestor",
    companyAddress: "Av. Corrientes 1234, CABA",
    companyPhone: "+54 11 1234-5678",
    companyEmail: "contacto@inmogestor.com",
    cuit: "30-12345678-9",
    logo: "",
    timezone: "America/Argentina/Buenos_Aires",
    language: "es",
    currency: "ARS"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    contractExpirations: true,
    overduePayments: true,
    reminderDays: [30, 15, 7, 1],
    workingHours: { start: "09:00", end: "18:00" }
  });

  const [financialSettings, setFinancialSettings] = useState({
    defaultCommission: 10,
    latePaymentFee: 5,
    gracePeriodDays: 10,
    interestRate: 3,
    taxRate: 21,
    receiptTemplate: "template_1",
    bankingDetails: {
      bankName: "Banco Nación",
      accountNumber: "1234567890123456789012",
      cbu: "0110123456789012345678"
    }
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 3,
    backupFrequency: "daily",
    dataRetention: 365
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
            <p className="text-muted-foreground">Configuración general del sistema</p>
          </div>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Información de la Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Dirección</Label>
                  <Textarea
                    id="companyAddress"
                    value={generalSettings.companyAddress}
                    onChange={(e) => setGeneralSettings({...generalSettings, companyAddress: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Teléfono</Label>
                  <Input
                    id="companyPhone"
                    value={generalSettings.companyPhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, companyPhone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={generalSettings.companyEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, companyEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuit">CUIT</Label>
                  <Input
                    id="cuit"
                    value={generalSettings.cuit}
                    onChange={(e) => setGeneralSettings({...generalSettings, cuit: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Configuration */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  Configuración del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select value={generalSettings.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                      <SelectItem value="America/Argentina/Cordoba">Córdoba (GMT-3)</SelectItem>
                      <SelectItem value="America/Argentina/Mendoza">Mendoza (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={generalSettings.language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select value={generalSettings.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ARS">Peso Argentino (ARS)</SelectItem>
                      <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Preferences */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferencias de Notificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificaciones SMS</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones por mensaje de texto</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Recordatorios de Pago</Label>
                    <p className="text-sm text-muted-foreground">Alertas automáticas de pagos pendientes</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.paymentReminders}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentReminders: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vencimiento de Contratos</Label>
                    <p className="text-sm text-muted-foreground">Alertas de contratos próximos a vencer</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.contractExpirations}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, contractExpirations: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Timing Settings */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Configuración de Horarios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Horario de Trabajo</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="time" 
                      value={notificationSettings.workingHours.start}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings, 
                        workingHours: {...notificationSettings.workingHours, start: e.target.value}
                      })}
                    />
                    <Input 
                      type="time" 
                      value={notificationSettings.workingHours.end}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings, 
                        workingHours: {...notificationSettings.workingHours, end: e.target.value}
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Días de Recordatorio</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar recordatorios {notificationSettings.reminderDays.join(', ')} días antes del vencimiento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Configuration */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Configuración Financiera
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultCommission">Comisión por Defecto (%)</Label>
                  <Input
                    id="defaultCommission"
                    type="number"
                    value={financialSettings.defaultCommission}
                    onChange={(e) => setFinancialSettings({...financialSettings, defaultCommission: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latePaymentFee">Interés por Mora (%)</Label>
                  <Input
                    id="latePaymentFee"
                    type="number"
                    value={financialSettings.latePaymentFee}
                    onChange={(e) => setFinancialSettings({...financialSettings, latePaymentFee: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriodDays">Días de Gracia</Label>
                  <Input
                    id="gracePeriodDays"
                    type="number"
                    value={financialSettings.gracePeriodDays}
                    onChange={(e) => setFinancialSettings({...financialSettings, gracePeriodDays: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tasa de Impuestos (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={financialSettings.taxRate}
                    onChange={(e) => setFinancialSettings({...financialSettings, taxRate: Number(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banking Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Información Bancaria
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Banco</Label>
                  <Input
                    id="bankName"
                    value={financialSettings.bankingDetails.bankName}
                    onChange={(e) => setFinancialSettings({
                      ...financialSettings,
                      bankingDetails: {...financialSettings.bankingDetails, bankName: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Número de Cuenta</Label>
                  <Input
                    id="accountNumber"
                    value={financialSettings.bankingDetails.accountNumber}
                    onChange={(e) => setFinancialSettings({
                      ...financialSettings,
                      bankingDetails: {...financialSettings.bankingDetails, accountNumber: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cbu">CBU</Label>
                  <Input
                    id="cbu"
                    value={financialSettings.bankingDetails.cbu}
                    onChange={(e) => setFinancialSettings({
                      ...financialSettings,
                      bankingDetails: {...financialSettings.bankingDetails, cbu: e.target.value}
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Configuración de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-muted-foreground">Seguridad adicional para el acceso</p>
                  </div>
                  <Switch 
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Vencimiento de Contraseña (días)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Máximo Intentos de Login</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: Number(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Gestión de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Frecuencia de Backup</Label>
                  <Select value={securitySettings.backupFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Retención de Datos (días)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={securitySettings.dataRetention}
                    onChange={(e) => setSecuritySettings({...securitySettings, dataRetention: Number(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;