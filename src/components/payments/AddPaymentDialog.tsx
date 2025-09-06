import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const paymentFormSchema = z.object({
  contractId: z.string().min(1, "Seleccione un contrato"),
  tenant: z.string().min(1, "El nombre del inquilino es requerido"),
  property: z.string().min(1, "La propiedad es requerida"),
  period: z.string().min(1, "El período es requerido"),
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
  fineAmount: z.number().optional().default(0),
  dueDate: z.date(),
  paymentDate: z.date().optional(),
  status: z.enum(["Pagado", "Pendiente", "Pagado con Mora", "Moroso"]),
  receiptNumber: z.string().optional(),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface AddPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPaymentDialog = ({ open, onOpenChange }: AddPaymentDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      contractId: "",
      tenant: "",
      property: "",
      period: "",
      amount: 0,
      fineAmount: 0,
      status: "Pendiente" as const,
      receiptNumber: "",
    },
  });

  const mockContracts = [
    { id: "CT-001", tenant: "Juan Pérez", property: "Av. Corrientes 1234" },
    { id: "CT-002", tenant: "María García", property: "San Martín 567" },
    { id: "CT-003", tenant: "Carlos López", property: "Rivadavia 890" },
    { id: "CT-004", tenant: "Ana Rodríguez", property: "Belgrano 456" },
  ];

  const handleContractChange = (contractId: string) => {
    const contract = mockContracts.find(c => c.id === contractId);
    if (contract) {
      form.setValue("tenant", contract.tenant);
      form.setValue("property", contract.property);
    }
  };

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Payment data:", data);
      toast({
        title: "Pago registrado",
        description: "El pago se ha registrado exitosamente.",
      });
      
      form.reset();
      onOpenChange(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            Registrar Nuevo Pago
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contrato</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleContractChange(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar contrato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockContracts.map((contract) => (
                          <SelectItem key={contract.id} value={contract.id}>
                            {contract.id} - {contract.tenant}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Enero 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inquilino</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del inquilino" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Propiedad</FormLabel>
                    <FormControl>
                      <Input placeholder="Dirección de la propiedad" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto Base</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fineAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto Mora (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de Vencimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Seleccionar fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pagado">Pagado</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Pagado con Mora">Pagado con Mora</SelectItem>
                        <SelectItem value="Moroso">Moroso</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("status") !== "Pendiente" && (
                <FormField
                  control={form.control}
                  name="paymentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de Pago</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Seleccionar fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("status") !== "Pendiente" && (
                <FormField
                  control={form.control}
                  name="receiptNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Recibo</FormLabel>
                      <FormControl>
                        <Input placeholder="RC-001-2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? "Registrando..." : "Registrar Pago"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;