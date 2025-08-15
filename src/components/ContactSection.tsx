'use client'

import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from './ContactForm';

export default function ContactSection() {

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "institutostellas@gmail.com",
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
    <section id="contato" className="py-20" style={{backgroundColor: '#FAF4DA'}}>
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
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
