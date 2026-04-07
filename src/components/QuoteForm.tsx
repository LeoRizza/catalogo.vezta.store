import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface QuoteFormProps {
  product: any;
}

export default function QuoteForm({ product }: QuoteFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = t('required_field');
    if (!formData.empresa.trim()) newErrors.empresa = t('required_field');
    if (!formData.email.trim()) {
      newErrors.email = t('required_field');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalid_email');
    }
    if (formData.telefono && formData.telefono.length < 8) {
      newErrors.telefono = t('invalid_phone');
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = t('required_field');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    // Armamos los identificadores del producto igual que en el código viejo
    const productId = product?.id || product?.code || product?.sku || product?.name || "unknown";

    // Preparamos el payload combinando el formulario y la data del producto
    const payload = {
      ...formData,
      productId,
      productName: product?.name,
      productBrand: product?.brand,
      productCategory: product?.category,
      productSubcategory: product?.subcategory,
    };

    try {
      const response = await fetch(
        "https://hook.us2.make.com/8m65w7rnn87qxmt1q5gxmc6jdlhkteaw",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Error en el servidor al enviar la cotización");

      setStatus('success');
      // Limpiamos el form después de un envío exitoso
      setFormData({ nombre: '', empresa: '', email: '', telefono: '', mensaje: '' });
    } catch (error) {
      console.error("Error enviando al webhook de Make:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white border border-border rounded-xl shadow-lg p-6 relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-text-main mb-1">{t('your_name')} *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.nombre ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-accent-light focus:border-accent'} focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-text-main mb-1">{t('company_name')} *</label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.empresa ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-accent-light focus:border-accent'} focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.empresa && <p className="text-red-500 text-xs mt-1">{errors.empresa}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">{t('email')} *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-accent-light focus:border-accent'} focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-text-main mb-1">{t('phone')}</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.telefono ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-accent-light focus:border-accent'} focus:outline-none focus:ring-2 transition-all`}
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-text-main mb-1">{t('your_message')} *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            placeholder={`Consulta por: ${product?.name || ''}`}
            className={`w-full px-4 py-2 rounded-lg border ${errors.mensaje ? 'border-red-500 focus:ring-red-200' : 'border-border focus:ring-accent-light focus:border-accent'} focus:outline-none focus:ring-2 transition-all resize-y`}
          />
          {errors.mensaje && <p className="text-red-500 text-xs mt-1">{errors.mensaje}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? t('sending') : t('send')}
        </button>

        {status === 'success' && (
          <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm text-center border border-green-200">
            {t('quote_success')}
          </div>
        )}
        {status === 'error' && (
          <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm text-center border border-red-200">
            {t('quote_error')}
          </div>
        )}
      </form>
    </div>
  );
}
