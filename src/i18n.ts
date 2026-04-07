import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      "about": "Nosotros",
      "catalog": "Catálogo",
      "industries": "Industrias",
      "contact": "Contacto",
      "search_placeholder": "Buscar...",
      "categories": "Categorías",
      "brand": "Marca",
      "clear_filters": "Limpiar filtros",
      "no_products": "No se encontraron productos.",
      "request_quote": "Solicitar Cotización",
      "contact_form": "Formulario de contacto",
      "description": "Descripción",
      "specs": "Especificaciones",
      "your_name": "Tu Nombre",
      "company_name": "Nombre de tu empresa",
      "email": "Email",
      "phone": "Teléfono",
      "your_message": "Tu mensaje",
      "send": "Enviar",
      "sending": "Enviando...",
      "quote_success": "¡Gracias! En breve será contactado por un asesor comercial.",
      "quote_error": "Ocurrió un error al enviar. Por favor, probá de nuevo.",
      "required_field": "Este campo es obligatorio",
      "invalid_email": "Formato de email inválido",
      "invalid_phone": "El teléfono debe tener al menos 8 caracteres",
      "previous": "Anterior",
      "next": "Siguiente"
    }
  },
  en: {
    translation: {
      "about": "About Us",
      "catalog": "Catalog",
      "industries": "Industries",
      "contact": "Contact",
      "search_placeholder": "Search...",
      "categories": "Categories",
      "brand": "Brand",
      "clear_filters": "Clear filters",
      "no_products": "No products found.",
      "request_quote": "Request Quote",
      "contact_form": "Contact Form",
      "description": "Description",
      "specs": "Specifications",
      "your_name": "Your Name",
      "company_name": "Company Name",
      "email": "Email",
      "phone": "Phone",
      "your_message": "Your message",
      "send": "Send",
      "sending": "Sending...",
      "quote_success": "Thank you! A sales representative will contact you shortly.",
      "quote_error": "An error occurred while sending. Please try again.",
      "required_field": "This field is required",
      "invalid_email": "Invalid email format",
      "invalid_phone": "Phone must be at least 8 characters",
      "previous": "Previous",
      "next": "Next"
    }
  },
  pt: {
    translation: {
      "about": "Sobre Nós",
      "catalog": "Catálogo",
      "industries": "Indústrias",
      "contact": "Contato",
      "search_placeholder": "Buscar...",
      "categories": "Categorias",
      "brand": "Marca",
      "clear_filters": "Limpar filtros",
      "no_products": "Nenhum produto encontrado.",
      "request_quote": "Solicitar Cotação",
      "contact_form": "Formulário de contato",
      "description": "Descrição",
      "specs": "Especificações",
      "your_name": "Seu Nome",
      "company_name": "Nome da sua empresa",
      "email": "Email",
      "phone": "Telefone",
      "your_message": "Sua mensagem",
      "send": "Enviar",
      "sending": "Enviando...",
      "quote_success": "Obrigado! Um consultor comercial entrará em contato em breve.",
      "quote_error": "Ocorreu um erro ao enviar. Por favor, tente novamente.",
      "required_field": "Este campo é obrigatório",
      "invalid_email": "Formato de email inválido",
      "invalid_phone": "O telefone deve ter pelo menos 8 caracteres",
      "previous": "Anterior",
      "next": "Próximo"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
