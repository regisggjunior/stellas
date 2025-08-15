import { Star } from "lucide-react";
import { socialLinks } from "@/data/social";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { label: "Sobre Nós", section: "sobre" },
    { label: "Áreas de Atuação", section: "atuacao" },
    { label: "Contato", section: "contato" },
  ];

  return (
    <footer className="bg-stellas-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-stellas-teal rounded-full flex items-center justify-center">
                <Star className="text-white text-lg" fill="currentColor" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Instituto Stellas</h3>
                <p className="text-gray-400 text-sm">Do trauma à transformação</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Transformando luto em luta, oferecendo apoio integral a famílias de vítimas de violência de gênero.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Úteis</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.section)}
                    className="text-gray-400 hover:text-stellas-orange transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="#" className="text-gray-400 hover:text-stellas-orange transition-colors">
                  Transparência
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Redes Sociais</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="w-10 h-10 bg-gray-700 hover:bg-stellas-teal rounded-full flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="text-white" size={16} />
                </a>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="text-gray-400 text-sm">Emergência 24h:</p>
              <p className="text-stellas-orange font-semibold">Central de Atendimento à Mulher</p>
              <p className="text-stellas-orange font-bold text-lg">180</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Instituto Stellas. Todos os direitos reservados. | 
            <span className="text-stellas-orange ml-1">CNPJ: Em processo de regularização</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
