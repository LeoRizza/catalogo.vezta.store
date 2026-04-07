import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';

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

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Increased per page since cards are smaller

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category).filter(Boolean))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand).filter(Boolean))), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchSearch && matchCategory && matchBrand;
    });
  }, [products, search, selectedCategory, selectedBrand]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedBrand]);

  if (loading) {
    return <div className="container mx-auto px-4 py-32 text-center">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 mt-4">
      <Helmet>
        <title>{t('catalog', 'Catálogo')} | Vezta</title>
        <meta name="description" content="Catálogo de productos Vezta." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 pr-4">
          <div className="mb-8">
            <h2 className="text-3xl font-exo font-bold text-black mb-8">{t('catalog', 'Catálogo')}</h2>
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Filtros</h3>
            <input 
              type="text" 
              placeholder={t('search_placeholder', 'Buscar...')}
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-4">{t('categories', 'CATEGORÍAS')}</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <li>
                <button 
                  className={`text-sm text-left w-full transition-colors ${selectedCategory === '' ? 'text-black font-medium bg-gray-100 px-2 py-1 rounded' : 'text-gray-600 hover:text-black px-2 py-1'}`}
                  onClick={() => setSelectedCategory('')}
                >
                  Todas
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    className={`text-sm text-left w-full transition-colors ${selectedCategory === cat ? 'text-black font-medium bg-gray-100 px-2 py-1 rounded' : 'text-gray-600 hover:text-black px-2 py-1'}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-4">{t('brand', 'MARCA')}</h3>
            <select 
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <button 
            className="w-full py-2 text-sm text-[#f88379] border border-[#f88379] hover:bg-[#f88379] hover:text-white transition-colors"
            onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedBrand(''); }}
          >
            {t('clear_filters', 'Limpiar filtros')}
          </button>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="text-sm text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
                  >
                    {t('previous', 'Anterior')}
                  </button>
                  <span className="text-sm font-medium text-black">
                    {currentPage} / {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="text-sm text-gray-500 hover:text-black disabled:opacity-30 transition-colors"
                  >
                    {t('next', 'Siguiente')}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              {t('no_products', 'No se encontraron productos.')}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
