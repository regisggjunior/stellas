import { Star, Heart, Phone } from "lucide-react";

export default function Hero() {
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

  return (
    <section id="home" className="hero-gradient text-white pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Star className="text-4xl text-white" fill="currentColor" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Do trauma à <span className="text-stellas-orange">transformação</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white text-opacity-90 leading-relaxed">
              Um caminho possível com apoio. Acolhemos famílias de vítimas de violência de gênero com suporte psicológico, jurídico e social.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('sobre')}
              className="bg-stellas-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Heart className="mr-2" size={20} />
              Conheça o Instituto
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="border-2 border-white text-white hover:bg-white hover:text-stellas-teal px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              <Phone className="mr-2" size={20} />
              Busco Ajuda
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white" style={{clipPath: 'polygon(0 100%, 100% 100%, 100% 0)'}}></div>
    </section>
  );
}
