"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CreateClinic } from "@/actions/create-clinic";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
});

const ClinicForm = () => {
  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
    try {
      await CreateClinic(data.name);
      toast.success("Clínica criada com sucesso!");
    } catch (error) {
      if (isRedirectError(error)) {
        return;
      }
      console.error("Erro ao criar clínica:", error);
      toast.error("Erro ao criar clínica. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Clínica</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome da clínica" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}
              {form.formState.isSubmitting ? "Criando..." : "Criar Clínica"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;
