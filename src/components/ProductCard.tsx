import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  images: string[];
  image?: string;
  imageUrl?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc = (product.images && product.images[0]) || product.image || product.imageUrl || null;

  return (
    <Link to={`/producto/${product.id}`} className="block group h-full">
      <article className="bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col relative">
        {product.brand && (
          <span className="absolute top-2 left-2 bg-[#f88379] text-white text-[10px] font-bold uppercase px-2 py-1 z-10">
            {product.brand}
          </span>
        )}
        <div className="aspect-square p-4 flex items-center justify-center relative overflow-hidden bg-white">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={product.name} 
              loading="lazy"
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
          <h2 className="text-black font-bold text-sm leading-tight mb-1 line-clamp-2">{product.name}</h2>
          <p className="text-gray-500 text-xs mt-auto">
            {product.category}
          </p>
        </div>
      </article>
    </Link>
  );
}
