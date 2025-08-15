import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  assunto: z.enum(["busco-ajuda", "quero-apoiar", "parcerias", "informacoes"], {
    errorMap: () => ({ message: "Selecione um assunto válido" })
  }),
  mensagem: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      assunto: undefined,
      mensagem: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Mensagem enviada!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    setIsSubmitting(true);
    mutation.mutate(data);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "contato@institutostellas.com.br",
      color: "bg-stellas-teal"
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: (
        <>
          QS 1, Rua 212, lotes 19/21 e 23, Bloco D<br />
          Sala 1102, parte 57<br />
          Águas Claras - Brasília/DF<br />
          CEP: 71.950-550
        </>
      ),
      color: "bg-stellas-orange"
    },
    {
      icon: Clock,
      title: "Atendimento",
      content: (
        <>
          Segunda à Sexta: 9h às 17h<br />
          Emergências: 24h por dia
        </>
      ),
      color: "bg-stellas-teal"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-stellas-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stellas-teal mb-6">Entre em Contato</h2>
            <div className="w-20 h-1 bg-stellas-orange mx-auto mb-8"></div>
            <p className="text-lg text-gray-600">
              Estamos aqui para apoiar você. Entre em contato conosco para saber mais ou buscar ajuda.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="text-white text-lg" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stellas-teal mb-2">{info.title}</h3>
                    <div className="text-gray-600">
                      {typeof info.content === 'string' ? info.content : info.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone (opcional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(61) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assunto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um assunto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="busco-ajuda">Busco ajuda</SelectItem>
                            <SelectItem value="quero-apoiar">Quero apoiar</SelectItem>
                            <SelectItem value="parcerias">Parcerias</SelectItem>
                            <SelectItem value="informacoes">Informações gerais</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mensagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Conte-nos como podemos ajudar..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-stellas-teal hover:bg-teal-700 text-white"
                    disabled={isSubmitting || mutation.isPending}
                  >
                    <Send className="mr-2" size={16} />
                    {mutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
