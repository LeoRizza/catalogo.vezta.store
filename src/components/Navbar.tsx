import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinkClass = "text-[15px] font-semibold uppercase text-black hover:text-[#f88379] transition-colors tracking-[.35em]";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
      {/* 1. Contenedor principal: Se agregó 'relative' y se ajustó la justificación para mobile */}
      <div className="w-full px-6 md:px-12 h-20 flex justify-end lg:justify-between items-center relative">

        {/* 2. Logo: Centrado absoluto en mobile (left-1/2 -translate-x-1/2), estático en desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:w-1/4 flex justify-center md:justify-start">
          <Link to="https://vezta.store" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dxmydmsjl/image/upload/q_auto/f_auto/v1775516829/vezta_wqbvdi.svg"
              alt="Logo"
              className="h-16 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-center space-x-10">
          <a href="https://vezta.store/#about" rel="noopener noreferrer" className={navLinkClass}>{t('about', 'EMPRESA')}</a>
          <Link to="/" rel="noopener noreferrer" className={navLinkClass}>{t('catalog', 'CATÁLOGO')}</Link>
          <a href="https://vezta.store/#industries" rel="noopener noreferrer" className={navLinkClass}>{t('industries', 'TRABAJOS')}</a>
          <a href="https://vezta.store/#contact" rel="noopener noreferrer" className={navLinkClass}>{t('contact', 'CONTACTO')}</a>
        </nav>

        {/* Right: Agrupamos idiomas y menú hamburguesa en el mismo contenedor */}
        <div className="lg:w-1/4 flex justify-end items-center">
          {/* Languages (Desktop) */}
          <div className="hidden lg:flex space-x-3 text-[13px] font-medium text-black">
            <button onClick={() => changeLanguage('es')} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'es' || !i18n.language ? 'text-[#f88379]' : ''}`}>ES</button>
            <span className="text-gray-500 font-normal">|</span>
            <button onClick={() => changeLanguage('en')} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'en' ? 'text-[#f88379]' : ''}`}>EN</button>
            <span className="text-gray-500 font-normal">|</span>
            <button onClick={() => changeLanguage('pt')} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'pt' ? 'text-[#f88379]' : ''}`}>PT</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-800 absolute top-full left-0 w-full shadow-lg">
          {/* 3. Dropdown: Se agregaron 'items-center' y 'text-center' */}
          <nav className="flex flex-col items-center p-6 space-y-6 text-center">
            <a href="#about" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>{t('about', 'EMPRESA')}</a>
            <Link to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>{t('catalog', 'CATÁLOGO')}</Link>
            <a href="#industries" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>{t('industries', 'TRABAJOS')}</a>
            <a href="#contact" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>{t('contact', 'CONTACTO')}</a>
            
            {/* 4. Selector de idiomas mobile: Se agregó 'justify-center', 'w-full' y un 'max-w' para acotar la línea divisoria */}
            <div className="flex justify-center items-center space-x-4 pt-6 border-t border-gray-800 text-[13px] font-medium text-black w-full max-w-[200px]">
              <button onClick={() => { changeLanguage('es'); setIsMenuOpen(false); }} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'es' || !i18n.language ? 'text-[#f88379]' : ''}`}>ES</button>
              <span className="text-gray-500">|</span>
              <button onClick={() => { changeLanguage('en'); setIsMenuOpen(false); }} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'en' ? 'text-[#f88379]' : ''}`}>EN</button>
              <span className="text-gray-500">|</span>
              <button onClick={() => { changeLanguage('pt'); setIsMenuOpen(false); }} className={`hover:text-[#f88379] transition-colors ${i18n.language === 'pt' ? 'text-[#f88379]' : ''}`}>PT</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}