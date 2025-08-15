import { useState } from "react";
import { Star, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-stellas-teal rounded-full flex items-center justify-center">
              <Star className="text-white text-lg" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stellas-teal">Instituto Stellas</h1>
              <p className="text-xs text-gray-600">Do trauma à transformação</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('atuacao')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium"
            >
              Atuação
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium"
            >
              Contato
            </button>
          </nav>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="text-stellas-teal text-xl" />
            ) : (
              <Menu className="text-stellas-teal text-xl" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 md:hidden">
          <nav className="flex flex-col space-y-4 px-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium py-2 text-left"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium py-2 text-left"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('atuacao')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium py-2 text-left"
            >
              Atuação
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-stellas-dark hover:text-stellas-teal transition-colors font-medium py-2 text-left"
            >
              Contato
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
