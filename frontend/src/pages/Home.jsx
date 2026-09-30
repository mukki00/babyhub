import { useEffect, useRef, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('loading');
  const [categories, setCategories] = useState([]);
  const [categoriesStatus, setCategoriesStatus] = useState('loading');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategoriesByCategory, setSubCategoriesByCategory] = useState({});
  const [subCategoryStatuses, setSubCategoryStatuses] = useState({});
  const [openCategoryId, setOpenCategoryId] = useState('');
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [categoryScroll, setCategoryScroll] = useState({ canScrollLeft: false, canScrollRight: false });
  const categoryMenuViewport = useRef(null);
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
    const viewport = categoryMenuViewport.current;
    if (!viewport) return undefined;

    function updateScrollState() {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      setCategoryScroll({
        canScrollLeft: viewport.scrollLeft > 1,
        canScrollRight: maxScroll - viewport.scrollLeft > 1,
      });
    }

    updateScrollState();
    viewport.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild);

    return () => {
      viewport.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [categories.length, categoriesStatus]);

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

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesSearch = !normalizedSearchQuery || [
      product.name,
      product.description,
      product.category_name,
      product.sub_category_name,
    ].some((value) => String(value || '').toLowerCase().includes(normalizedSearchQuery));
    const matchesCategory = String(product.category_id) === selectedCategoryId &&
      (!selectedSubCategoryId || String(product.sub_category_id) === selectedSubCategoryId);
    return matchesSearch && (normalizedSearchQuery ? true : matchesCategory);
  });

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

  function openCategoryDropdown(categoryId, element) {
    const menu = element.closest('.home-category-menu');
    const group = element.closest('.home-category-menu-group');
    if (menu && group) {
      const menuBounds = menu.getBoundingClientRect();
      const groupBounds = group.getBoundingClientRect();
      const dropdownWidth = Math.min(240, menuBounds.width - 16);
      setDropdownLeft(Math.max(8, Math.min(groupBounds.left - menuBounds.left, menuBounds.width - dropdownWidth - 8)));
    }
    setOpenCategoryId(categoryId);
    loadSubCategories(categoryId);
  }

  function scrollCategoryMenu(direction) {
    const viewport = categoryMenuViewport.current;
    if (!viewport) return;
    viewport.scrollBy({ left: viewport.clientWidth * 0.75 * direction, behavior: 'smooth' });
  }

  const selectedCategory = categories.find((category) => String(category.id) === selectedCategoryId);
  const selectedSubCategory = (subCategoriesByCategory[selectedCategoryId] || [])
    .find((subCategory) => String(subCategory.id) === selectedSubCategoryId);
  const selectedCategoryLabel = selectedCategory?.product_category.trim().toLowerCase() === 'sale'
    ? 'Special Offers'
    : selectedCategory?.product_category;
  const productListTitle = normalizedSearchQuery
    ? `Search results for “${searchQuery.trim()}”`
    : selectedSubCategory?.sub_category || selectedCategoryLabel || 'Our Products';
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
          <nav
            className="home-category-menu"
            aria-label="Product categories"
            onMouseLeave={() => setOpenCategoryId('')}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setOpenCategoryId('');
            }}
          >
            <button
              type="button"
              className="category-carousel-arrow"
              aria-label="Scroll categories left"
              onClick={() => scrollCategoryMenu(-1)}
              disabled={!categoryScroll.canScrollLeft}
            >
              ‹
            </button>
            <div className="home-category-menu-viewport" ref={categoryMenuViewport}>
              <div className="home-category-menu-inner">
                {orderedCategories.map((category) => {
                  const categoryId = String(category.id);
                  const isOpen = openCategoryId === categoryId;
                  return (
                    <div
                      className="home-category-menu-group"
                      key={category.id}
                      onMouseEnter={(event) => openCategoryDropdown(categoryId, event.currentTarget)}
                      onFocus={(event) => openCategoryDropdown(categoryId, event.currentTarget)}
                    >
                      <button
                        type="button"
                        className={`home-category-menu-link${selectedCategoryId === categoryId ? ' active' : ''}${category.product_category.trim().toLowerCase() === 'sale' ? ' special-offers-link' : ''}`}
                        aria-pressed={selectedCategoryId === categoryId}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={(event) => {
                          selectCategory(categoryId);
                          openCategoryDropdown(categoryId, event.currentTarget);
                        }}
                      >
                        {category.product_category.trim().toLowerCase() === 'sale' ? 'Special Offers' : category.product_category}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="category-carousel-arrow"
              aria-label="Scroll categories right"
              onClick={() => scrollCategoryMenu(1)}
              disabled={!categoryScroll.canScrollRight}
            >
              ›
            </button>
            {openCategoryId && (() => {
              const subCategories = subCategoriesByCategory[openCategoryId] || [];
              const subCategoryStatus = subCategoryStatuses[openCategoryId] || 'loading';
              return (
                <div className="home-category-dropdown" style={{ left: `${dropdownLeft}px` }}>
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
                              selectCategory(openCategoryId);
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
              );
            })()}
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
          <form className="product-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="product-search-input">Search products</label>
            <input
              id="product-search-input"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="what are you looking for?"
            />
            <button type="submit" aria-label="Search products">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m16.5 16.5 4 4" />
              </svg>
            </button>
          </form>
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
          <p className="status-msg">
            {normalizedSearchQuery ? 'No products matched your search.' : 'No products in this selection yet.'}
          </p>
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
