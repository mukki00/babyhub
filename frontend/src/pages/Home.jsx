import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProductCategories,
  getProductSubCategories,
  getProducts,
  prefetchProductSubCategories,
} from '../api.js';
import { useCart } from '../context/CartContext.jsx';

const CATEGORY_MENU_ORDER = [
  'sale',
  'new arrivals',
  'baby essentials',
  'baby gear',
  'girls clothing',
  'boys clothing',
  'nursery & bedding',
  'furniture',
  'gifting',
  'gifts & registry',
  'brands',
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState({});
  const [subCategoryStatuses, setSubCategoryStatuses] = useState({});
  const [openCategoryId, setOpenCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => {
    getProductCategories()
      .then((data) => {
        setCategories(data);
        setCategoriesStatus('ready');
        prefetchProductSubCategories(data.map((category) => category.id));
        const specialOffers = data.find((category) => {
          const name = category.product_category.trim().toLowerCase();
          return name === 'sale' || name === 'special offers';
        });
        setSelectedCategoryId(String((specialOffers || data[0])?.id || ''));
      })
      .catch(() => setCategoriesStatus('error'));
  }, []);

  const visibleProducts = products.filter((product) => (
    String(product.category_id) === selectedCategoryId &&
    (!selectedSubCategoryId || String(product.sub_category_id) === selectedSubCategoryId)
  ));

  function selectCategory(categoryId) {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId('');
  }

  function loadSubCategories(categoryId) {
    if (Object.hasOwn(subCategoriesByCategory, categoryId) || subCategoryStatuses[categoryId] === 'loading') return;

    setSubCategoryStatuses((current) => ({ ...current, [categoryId]: 'loading' }));
    getProductSubCategories(categoryId)
      .then((data) => {
        setSubCategoriesByCategory((current) => ({ ...current, [categoryId]: data }));
        setSubCategoryStatuses((current) => ({ ...current, [categoryId]: 'ready' }));
      })
      .catch(() => setSubCategoryStatuses((current) => ({ ...current, [categoryId]: 'error' })));
  }

  const selectedCategory = categories.find((category) => String(category.id) === selectedCategoryId);
  const selectedSubCategory = (subCategoriesByCategory[selectedCategoryId] || [])
    .find((subCategory) => String(subCategory.id) === selectedSubCategoryId);
  const selectedCategoryLabel = selectedCategory?.product_category.trim().toLowerCase() === 'sale'
    ? 'Special Offers'
    : selectedCategory?.product_category;
  const productListTitle = selectedSubCategory?.sub_category || selectedCategoryLabel || 'Our Products';
  const orderedCategories = [...categories].sort((first, second) => {
    const firstIndex = CATEGORY_MENU_ORDER.indexOf(first.product_category.trim().toLowerCase());
    const secondIndex = CATEGORY_MENU_ORDER.indexOf(second.product_category.trim().toLowerCase());
    return (firstIndex < 0 ? CATEGORY_MENU_ORDER.length : firstIndex) -
      (secondIndex < 0 ? CATEGORY_MENU_ORDER.length : secondIndex) ||
      first.product_category.localeCompare(second.product_category);
  });

  return (
    <>
      {categoriesStatus === 'ready' && categories.length > 0 && (
        <>
          <nav className="home-category-menu" aria-label="Product categories">
            <div className="home-category-menu-inner">
              {orderedCategories.map((category) => {
                const categoryId = String(category.id);
                const isOpen = openCategoryId === categoryId;
                const subCategories = subCategoriesByCategory[categoryId] || [];
                const subCategoryStatus = subCategoryStatuses[categoryId] || 'loading';
                return (
                  <div
                    className={`home-category-menu-group${isOpen ? ' is-open' : ''}`}
                    key={category.id}
                    onMouseEnter={() => {
                      setOpenCategoryId(categoryId);
                      loadSubCategories(categoryId);
                    }}
                    onMouseLeave={() => setOpenCategoryId('')}
                    onFocus={() => {
                      setOpenCategoryId(categoryId);
                      loadSubCategories(categoryId);
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) setOpenCategoryId('');
                    }}
                  >
                    <button
                      type="button"
                      className={`home-category-menu-link${selectedCategoryId === categoryId ? ' active' : ''}${category.product_category.trim().toLowerCase() === 'sale' ? ' special-offers-link' : ''}`}
                      aria-pressed={selectedCategoryId === categoryId}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => {
                        selectCategory(categoryId);
                        setOpenCategoryId(categoryId);
                        loadSubCategories(categoryId);
                      }}
                    >
                      {category.product_category.trim().toLowerCase() === 'sale' ? 'Special Offers' : category.product_category}
                    </button>
                    <div className="home-category-dropdown">
                      {subCategoryStatus === 'loading' && <span className="home-subcategory-message">Loading…</span>}
                      {subCategoryStatus === 'error' && <span className="home-subcategory-message">Could not load subcategories.</span>}
                      {subCategoryStatus === 'ready' && subCategories.length === 0 && (
                        <span className="home-subcategory-message">No subcategories</span>
                      )}
                      {subCategoryStatus === 'ready' && subCategories.length > 0 && (
                        <ul>
                          {subCategories.map((subCategory) => (
                            <li key={subCategory.id}>
                              <button
                                type="button"
                                className={`home-subcategory-link${selectedSubCategoryId === String(subCategory.id) ? ' active' : ''}`}
                                aria-pressed={selectedSubCategoryId === String(subCategory.id)}
                                onClick={() => {
                                  selectCategory(categoryId);
                                  setSelectedSubCategoryId(String(subCategory.id));
                                  setOpenCategoryId('');
                                }}
                              >
                                {subCategory.sub_category}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </>
      )}

      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">Baby Hub Sri Lanka</span>
          <h1 className="hero-title">Everything Your Little One Needs</h1>
          <p className="hero-desc">Browse our collection and order online — we'll confirm your order over WhatsApp.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-hd product-list-heading">
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <span>Home</span>
            {selectedCategoryLabel && (
              <>
                <span aria-hidden="true">›</span>
                <span>{selectedCategoryLabel}</span>
              </>
            )}
            {selectedSubCategory && (
              <>
                <span aria-hidden="true">›</span>
                <span aria-current="page">{selectedSubCategory.sub_category}</span>
              </>
            )}
          </nav>
          <h2 className="section-title">{productListTitle}</h2>
        </div>

        {categoriesStatus === 'error' && <p className="status-msg">Could not load product categories.</p>}

        {status === 'loading' && <p className="status-msg">Loading products…</p>}
        {status === 'error' && <p className="status-msg">Could not load products. Please try again later.</p>}
        {status === 'ready' && products.length === 0 && <p className="status-msg">No products available yet.</p>}
        {status === 'ready' && products.length > 0 && visibleProducts.length === 0 && (
          <p className="status-msg">No products in this selection yet.</p>
        )}

        <div className="products-grid">
          {visibleProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <Link to={`/product/${p.id}`} className="product-img-wrap">
                <img src={p.image_url || 'https://placehold.co/400x533/f5e6ef/5a2040?text=Baby+Hub'} alt={p.name} className="product-img-main"/>
              </Link>
              <div className="product-info">
                {(p.category_name || p.sub_category_name) && (
                  <div className="product-taxonomy" aria-label="Product category">
                    {p.category_name && <span>{p.category_name}</span>}
                    {p.category_name && p.sub_category_name && <span aria-hidden="true">›</span>}
                    {p.sub_category_name && <span>{p.sub_category_name}</span>}
                  </div>
                )}
                <Link to={`/product/${p.id}`} className="product-name">{p.name}</Link>
                <div className="product-price">Rs. {Number(p.price).toLocaleString()}.00</div>
                <button className="btn-add-cart" onClick={() => addItem(p, 1)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
