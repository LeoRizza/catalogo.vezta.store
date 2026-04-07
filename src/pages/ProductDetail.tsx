import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import QuoteForm from '../components/QuoteForm';

interface Product {
  id: number;
  name: string;
  brand: string;
  origin: string;
  category: string;
  subcategory: string;
  description: string;
  longDescription: string;
  images: string[];
  image?: string;
  imageUrl?: string;
  specs?: any;
  videoUrl?: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.id === Number(id));
        if (found) {
          setProduct(found);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Cargando...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/')} className="text-accent hover:underline">Volver al catálogo</button>
      </div>
    );
  }

  const images = (Array.isArray(product.images) && product.images.length > 0) 
    ? product.images 
    : [product.image || product.imageUrl].filter(Boolean) as string[];

  const videoUrl = product.videoUrl ? (
    product.videoUrl.includes('youtu.be') 
      ? `https://www.youtube.com/embed/${new URL(product.videoUrl).pathname.replace('/', '')}`
      : product.videoUrl.includes('youtube.com') && new URL(product.videoUrl).searchParams.get('v')
        ? `https://www.youtube.com/embed/${new URL(product.videoUrl).searchParams.get('v')}`
        : product.videoUrl
  ) : null;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Helmet>
        <title>{product.name} | Vezta</title>
        <meta name="description" content={product.description || product.name} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <button onClick={() => navigate('/')} className="mb-6 text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Volver al catálogo
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="bg-bg-alt rounded-xl p-8 flex items-center justify-center aspect-square border border-border">
              {images.length > 0 ? (
                <img 
                  src={images[currentImageIdx]} 
                  alt={`${product.name} - ${currentImageIdx + 1}`} 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-text-muted">Sin imagen</div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 p-1 transition-all ${idx === currentImageIdx ? 'border-accent' : 'border-transparent hover:border-border bg-bg-alt'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}

            {videoUrl && (
              <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-border">
                <iframe 
                  src={videoUrl} 
                  title={product.name} 
                  className="w-full h-full"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
              {product.brand && (
                <p className="text-text-main"><span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Marca:</span> <br/>{product.brand}</p>
              )}
              {product.origin && (
                <p className="text-text-main"><span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Origen:</span> <br/>{product.origin}</p>
              )}
              {product.category && (
                <p className="text-text-main"><span className="font-semibold text-text-muted uppercase tracking-wider text-xs">Categoría:</span> <br/>{product.category}</p>
              )}
            </div>

            <p className="text-text-main text-lg mb-8 leading-relaxed opacity-90">
              {product.description}
            </p>

            <button 
              onClick={() => setShowQuoteForm(!showQuoteForm)}
              className="w-full md:w-auto self-start bg-black text-white font-bold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-primary hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
            >
              {showQuoteForm ? t('contact_form') : t('request_quote')}
            </button>

            {showQuoteForm && (
              <div className="mt-8 animate-fade-in">
                <QuoteForm product={product} />
              </div>
            )}

            {(product.longDescription || product.description) && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4 relative inline-block after:content-[''] after:block after:w-1/2 after:h-1 after:bg-accent-light after:mt-1 after:rounded-full">{t('description')}</h3>
                <p className="text-text-main leading-relaxed whitespace-pre-line opacity-80">
                  {product.longDescription || product.description}
                </p>
              </div>
            )}

            {product.specs && (
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4 relative inline-block after:content-[''] after:block after:w-1/2 after:h-1 after:bg-accent-light after:mt-1 after:rounded-full">{t('specs')}</h3>
                <pre className="bg-bg-alt p-6 rounded-xl text-sm overflow-x-auto border border-border text-text-muted font-mono whitespace-pre-wrap">
                  {typeof product.specs === 'string' ? product.specs : JSON.stringify(product.specs, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
