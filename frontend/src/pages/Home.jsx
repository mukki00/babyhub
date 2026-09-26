export default function Home() {
  return (
    <>
      {/* ========== HERO SLIDER ========== */}
      <section className="hero">
        <div className="hero-slide active">
          <div className="hero-bg-img" style={{ backgroundImage: "url('https://placehold.co/1440x600/1a2340/ffffff?text=&font=playfair-display')", backgroundColor: '#1a2340' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a2340 0%,#2d4a7a 60%,#3d6b9e 100%)' }}></div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: "url('https://placehold.co/800x600/c0b8d4/ffffff?text=👗+New+Collection') center/cover no-repeat", opacity: 0.35 }}></div>
          </div>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <span className="hero-eyebrow">New Collection 2026</span>
            <h1 className="hero-title">Where Every<br/>Little Moment<br/>Matters</h1>
            <p className="hero-desc">Discover beautifully crafted clothing, nursery essentials and thoughtful gifts — all made with love for your little one.</p>
            <div className="hero-actions">
              <a href="/collection?c=new-arrivals" className="btn-hero-primary">Shop New Arrivals</a>
              <a href="/collection?c=girls-clothing" className="btn-hero-outline">Girls Clothing</a>
            </div>
          </div>
        </div>

        <div className="hero-slide">
          <div className="hero-bg-img" style={{ background: 'linear-gradient(135deg,#2d1a40 0%,#5a3470 60%,#8a5498 100%)' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: "url('https://placehold.co/800x600/d4b8e0/ffffff?text=🎁+Gift+Sets') center/cover no-repeat", opacity: 0.3 }}></div>
          </div>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <span className="hero-eyebrow">Gifting Collection</span>
            <h1 className="hero-title">The Perfect<br/>Baby Gift,<br/>Every Time</h1>
            <p className="hero-desc">Explore our curated gift hampers, personalised keepsakes and luxury gift sets — beautifully wrapped and ready to delight.</p>
            <div className="hero-actions">
              <a href="/collection?c=gift-hampers" className="btn-hero-primary">Shop Gift Hampers</a>
              <a href="/pages/gift-registry" className="btn-hero-outline">Create a Registry</a>
            </div>
          </div>
        </div>

        <div className="hero-slide">
          <div className="hero-bg-img" style={{ background: 'linear-gradient(135deg,#1a2e20 0%,#2d5a3a 60%,#4a8a5a 100%)' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: "url('https://placehold.co/800x600/b8d4c0/ffffff?text=🛏️+Bedding') center/cover no-repeat", opacity: 0.3 }}></div>
          </div>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <span className="hero-eyebrow">Themed Bedding Collections</span>
            <h1 className="hero-title">Sweet Dreams<br/>Start with the<br/>Right Bedding</h1>
            <p className="hero-desc">From Peter Rabbit to Eden — discover our signature themed bedding collections designed to make every nursery magical.</p>
            <div className="hero-actions">
              <a href="/collection?c=all-bedding" className="btn-hero-primary">Shop Bedding</a>
              <a href="/collection?c=bedding-bundles" className="btn-hero-outline">View Bundles</a>
            </div>
          </div>
        </div>

        <div className="hero-slide">
          <div className="hero-bg-img" style={{ background: 'linear-gradient(135deg,#3d2a10 0%,#7a5420 60%,#c9973c 100%)' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', background: "url('https://placehold.co/800x600/f0d8b0/ffffff?text=⭐+Sale') center/cover no-repeat", opacity: 0.3 }}></div>
          </div>
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <span className="hero-eyebrow">Mid-Season Sale</span>
            <h1 className="hero-title">Up to 50% Off<br/>Selected<br/>Styles</h1>
            <p className="hero-desc">Limited time offers on our most loved collections. Don't miss out on incredible savings across clothing, bedding and essentials.</p>
            <div className="hero-actions">
              <a href="/collection?c=sale" className="btn-hero-primary">Shop the Sale</a>
            </div>
          </div>
        </div>

        <button className="hero-arrow hero-prev" id="heroPrev">‹</button>
        <button className="hero-arrow hero-next" id="heroNext">›</button>
        <div className="hero-dots">
          <button className="hero-dot active"></button>
          <button className="hero-dot"></button>
          <button className="hero-dot"></button>
          <button className="hero-dot"></button>
        </div>
      </section>

      {/* ========== SHOP BY CATEGORY ========== */}
      <section className="section">
        <div className="section-hd">
          <span className="section-eyebrow">Explore</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-sub">Everything your little one needs, beautifully curated in one place</p>
        </div>
        <div className="cat-grid">
          <a href="/collection?c=girls-clothing" className="cat-card">
            <img src="https://placehold.co/400x533/f5e6ef/5a2040?text=Girls+Clothing" alt="Girls Clothing" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Girls Clothing</div><div className="cat-count">Dresses, Tops, Rompers &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=boys-clothing" className="cat-card">
            <img src="https://placehold.co/400x533/e0ecf8/1a3560?text=Boys+Clothing" alt="Boys Clothing" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Boys Clothing</div><div className="cat-count">T-Shirts, Shorts, Sets &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=baby-essentials" className="cat-card">
            <img src="https://placehold.co/400x533/e8f5e8/1a4030?text=Baby+Essentials" alt="Baby Essentials" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Baby Essentials</div><div className="cat-count">Feeding, Bathing, Diapering &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=bedding" className="cat-card">
            <img src="https://placehold.co/400x533/f8f0e0/503010?text=Bedding" alt="Bedding" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Bedding</div><div className="cat-count">Themed Collections, Bundles &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=gifting" className="cat-card">
            <img src="https://placehold.co/400x533/fef0f8/502040?text=Gifting" alt="Gifting" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Gifting</div><div className="cat-count">Hampers, Vouchers &amp; Personalised</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=baby-gear" className="cat-card">
            <img src="https://placehold.co/400x533/e8e0f8/201050?text=Baby+Gear" alt="Baby Gear" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Baby Gear</div><div className="cat-count">Strollers, Car Seats &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=maternity" className="cat-card">
            <img src="https://placehold.co/400x533/f0f8e8/204010?text=Maternity" alt="Maternity" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Maternity</div><div className="cat-count">Clothing, Nursing &amp; Care</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=furniture" className="cat-card">
            <img src="https://placehold.co/400x533/e8f0f8/102050?text=Furniture" alt="Furniture" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Furniture</div><div className="cat-count">Cots, Bassinets, Wardrobes &amp; More</div><span className="cat-btn">Shop Now →</span></div>
          </a>
        </div>
      </section>

      {/* ========== NEW ARRIVALS ========== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-hd">
          <span className="section-eyebrow">Just In</span>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-sub">Fresh styles added every week — be the first to discover</p>
        </div>
        <div className="products-grid">

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/f5e8ef/8b2252?text=Girls+Dress" alt="Fairy Garden Smocked Dress" className="product-img-main"/>
              <img src="https://placehold.co/400x533/ffe0f0/8b2252?text=Girls+Dress+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod001">Add to Cart</button>
              <div className="img-dots"><span className="img-dot on"></span><span className="img-dot"></span></div>
            </div>
            <div className="product-info">
              <div className="product-name">Fairy Garden Pastel Smocked Girls Dress</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 2,500.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 833.33</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/fff0f5/6b1a3a?text=Rose+Dress" alt="Enchanted Rose Garden Dress" className="product-img-main"/>
              <img src="https://placehold.co/400x533/ffe8f2/6b1a3a?text=Rose+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod002">Add to Cart</button>
              <div className="img-dots"><span className="img-dot on"></span><span className="img-dot"></span><span className="img-dot"></span></div>
            </div>
            <div className="product-info">
              <div className="product-name">Enchanted Rose Garden Smocked Girls Dress</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 3,300.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 1,100.00</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/e8f4ff/1a3a6b?text=Blue+Dress" alt="Cloudline Classic Dress" className="product-img-main"/>
              <img src="https://placehold.co/400x533/d0eaff/1a3a6b?text=Blue+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod003">Add to Cart</button>
              <div className="img-dots"><span className="img-dot on"></span><span className="img-dot"></span></div>
            </div>
            <div className="product-info">
              <div className="product-name">Cloudline Classic Smocked Girls Dress</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 2,750.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 916.66</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/eefaee/1a5030?text=Mint+Dress" alt="Summer Sun Mint Dress" className="product-img-main"/>
              <img src="https://placehold.co/400x533/d0f5d0/1a5030?text=Mint+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod004">Add to Cart</button>
              <div className="img-dots"><span className="img-dot on"></span><span className="img-dot"></span></div>
            </div>
            <div className="product-info">
              <div className="product-name">Summer Sun Mint Green Stripe Smocked Dress</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 2,500.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 833.33</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/fdf0e0/60300a?text=Boys+Set" alt="Little Adventure Boys Set" className="product-img-main"/>
              <img src="https://placehold.co/400x533/f5e0c0/60300a?text=Boys+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod005">Add to Cart</button>
            </div>
            <div className="product-info">
              <div className="product-name">Little Adventure Boys Bloomer Set</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 1,950.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 650.00</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/f8f0ff/3a1060?text=Baby+Gift" alt="Luxury Baby Gift Hamper" className="product-img-main"/>
              <img src="https://placehold.co/400x533/f0e0ff/3a1060?text=Hamper+Alt" alt="" className="product-img-alt"/>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod006">Add to Cart</button>
            </div>
            <div className="product-info">
              <div className="product-name">Luxury New Baby Gift Hamper — Premium Set</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 8,500.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 2,833.33</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/fff8e8/604010?text=Bedding+Set" alt="Eden Pink Bedding Set" className="product-img-main"/>
              <img src="https://placehold.co/400x533/fff0d0/604010?text=Bedding+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-new">New Arrival</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod007">Add to Cart</button>
            </div>
            <div className="product-info">
              <div className="product-name">Eden Pink Cot Bedding Bundle — 5 Piece Set</div>
              <div className="product-price"><span className="price-from">From</span><span className="price-now">Rs. 12,500.00</span></div>
              <div className="price-installment">3 × <strong>Rs. 4,166.66</strong> with MintPay</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-img-wrap">
              <img src="https://placehold.co/400x533/e8fff0/0a4020?text=Baby+Care" alt="Newborn Essentials Kit" className="product-img-main"/>
              <img src="https://placehold.co/400x533/d0ffe0/0a4020?text=Kit+Alt" alt="" className="product-img-alt"/>
              <span className="product-badge badge-sale">Sale</span>
              <button className="product-wishlist" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
              <button className="product-quick-add" data-id="prod008">Add to Cart</button>
            </div>
            <div className="product-info">
              <div className="product-name">Newborn Essentials Baby Care Starter Kit</div>
              <div className="product-price">
                <span className="price-now">Rs. 3,200.00</span>
                <span className="price-was">Rs. 4,500.00</span>
              </div>
              <div className="price-installment">3 × <strong>Rs. 1,066.66</strong> with MintPay</div>
            </div>
          </div>

        </div>
        <div className="section-more-center">
          <a href="/collection?c=new-arrivals" className="section-more">View All New Arrivals →</a>
        </div>
      </section>

      {/* ========== FEATURE BANNERS ========== */}
      <div className="banners-2">
        <a href="/collection?c=smocked-dresses" className="banner-block">
          <div className="banner-bg" style={{ background: 'linear-gradient(135deg,#4a1a3a,#8a3060,#c06090)' }}></div>
          <div className="banner-grad"></div>
          <div className="banner-txt">
            <div className="banner-txt-tag">Girls Collection</div>
            <h3 className="banner-txt-title">Smocked Dresses<br/>— Handcrafted Beauty</h3>
            <span className="btn-banner-sm">Shop Now</span>
          </div>
        </a>
        <a href="/collection?c=bedding-bundles" className="banner-block">
          <div className="banner-bg" style={{ background: 'linear-gradient(135deg,#1a3a6a,#2d5a9a,#5080c0)' }}></div>
          <div className="banner-grad"></div>
          <div className="banner-txt">
            <div className="banner-txt-tag">Nursery</div>
            <h3 className="banner-txt-title">Themed Bedding<br/>Bundles — Save More</h3>
            <span className="btn-banner-sm">Shop Bundles</span>
          </div>
        </a>
      </div>

      {/* ========== THEMED COLLECTIONS ========== */}
      <div className="themes-section" style={{ padding: '64px 0' }}>
        <div className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="section-hd">
            <span className="section-eyebrow">Bedding</span>
            <h2 className="section-title">Themed Collections</h2>
            <p className="section-sub">Each themed collection tells a story — find the one that speaks to your nursery</p>
          </div>
          <div className="themes-grid">
            <a href="/collection?c=peter-rabbit-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/f0efe8/3a3020?text=Peter+Rabbit" alt="Peter Rabbit"/></div>
              <span className="theme-label">Peter Rabbit</span>
            </a>
            <a href="/collection?c=pooh-and-friends-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/fff8e0/806010?text=Pooh+%26+Friends" alt="Pooh & Friends"/></div>
              <span className="theme-label">Pooh &amp; Friends</span>
            </a>
            <a href="/collection?c=eden-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/e8f5e0/204010?text=Eden" alt="Eden Theme"/></div>
              <span className="theme-label">Eden</span>
            </a>
            <a href="/collection?c=eden-pink-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/ffe8f5/8b1a5a?text=Eden+Pink" alt="Eden Pink"/></div>
              <span className="theme-label">Eden Pink</span>
            </a>
            <a href="/collection?c=mr_rabbit_theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/f5f5f5/3a3a3a?text=Mr.+Rabbit" alt="Mr Rabbit"/></div>
              <span className="theme-label">Mr. Rabbit</span>
            </a>
            <a href="/collection?c=regal-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/eae0f8/3a1060?text=Regal" alt="Regal Theme"/></div>
              <span className="theme-label">Regal</span>
            </a>
            <a href="/collection?c=meadow-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/eef8e0/204800?text=Meadow" alt="Meadow Theme"/></div>
              <span className="theme-label">Meadow</span>
            </a>
            <a href="/collection?c=classic-white-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/f8f8f8/555555?text=Classic+White" alt="Classic White"/></div>
              <span className="theme-label">Classic White</span>
            </a>
            <a href="/collection?c=dandelion-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/fff8d0/706000?text=Dandelion" alt="Dandelion"/></div>
              <span className="theme-label">Dandelion</span>
            </a>
            <a href="/collection?c=savannah-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/f8e8d0/503010?text=Savannah" alt="Savannah"/></div>
              <span className="theme-label">Savannah</span>
            </a>
            <a href="/collection?c=farmyard-friends-theme" className="theme-card">
              <div className="theme-img-box"><img src="https://placehold.co/200x200/f0f8e0/304010?text=Farmyard" alt="Farmyard Friends"/></div>
              <span className="theme-label">Farmyard Friends</span>
            </a>
            <a href="/collection?c=all-bedding" className="theme-card">
              <div className="theme-img-box" style={{ background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 26 }}>🛏️</div>
              <span className="theme-label">View All Themes</span>
            </a>
          </div>
          <div className="section-more-center">
            <a href="/collection?c=all-bedding" className="section-more">Explore All Themes →</a>
          </div>
        </div>
      </div>

      {/* ========== FEATURES STRIP ========== */}
      <div className="features-bar">
        <div className="features-inner">
          <div className="feat-item">
            <span className="feat-icon">🚀</span>
            <div>
              <div className="feat-title">Island-Wide Delivery</div>
              <div className="feat-text">Free shipping on orders above Rs. 15,000</div>
            </div>
          </div>
          <div className="feat-item">
            <span className="feat-icon">🏪</span>
            <div>
              <div className="feat-title">3 Physical Stores</div>
              <div className="feat-text">Colombo &amp; Kandy — visit us in person</div>
            </div>
          </div>
          <div className="feat-item">
            <span className="feat-icon">🌍</span>
            <div>
              <div className="feat-title">International Shipping</div>
              <div className="feat-text">Delivering to 10+ countries worldwide</div>
            </div>
          </div>
          <div className="feat-item">
            <span className="feat-icon">💎</span>
            <div>
              <div className="feat-title">BH Magic Loyalty</div>
              <div className="feat-text">Earn points on every purchase</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SHOP BY BRAND ========== */}
      <div className="brands-bar">
        <div className="brands-inner">
          <div className="brands-label">Shop by Brand</div>
          <div className="brands-logos">
            <a href="/collection?c=tommee-tippee-products" className="brand-chip">Tommee Tippee</a>
            <a href="/collection?c=phillips-avent" className="brand-chip">Philips Avent</a>
            <a href="/collection?c=chicco" className="brand-chip">Chicco</a>
            <a href="/collection?c=aptamil-baby-products" className="brand-chip">Aptamil</a>
            <a href="/collection?c=johnsons-baby-products" className="brand-chip">Johnson's</a>
            <a href="/collection?c=bamboo-dreams-baby-products" className="brand-chip">Bamboo Dreams</a>
            <a href="/collection?c=cetaphil-baby-products" className="brand-chip">Cetaphil Baby</a>
            <a href="/collection?c=aveeno" className="brand-chip">Aveeno</a>
            <a href="/collection?c=farlin-products" className="brand-chip">Farlin</a>
            <a href="/collection?c=mamaearth-baby-products" className="brand-chip">Mamaearth</a>
            <a href="/collection?c=hipp-organic-baby-products" className="brand-chip">HiPP Organic</a>
            <a href="/collection?c=seba-med" className="brand-chip">Sebamed</a>
            <a href="/collection?c=velona-products" className="brand-chip">Velona</a>
            <a href="/collection?c=sudocrem-baby-products" className="brand-chip">Sudocrem</a>
            <a href="/collection?c=shop-by-brand" className="brand-chip" style={{ background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }}>View All Brands →</a>
          </div>
        </div>
      </div>

      {/* ========== SIGNATURE COLLECTIONS ========== */}
      <section className="section">
        <div className="section-hd">
          <span className="section-eyebrow">Baby Hub Signature</span>
          <h2 className="section-title">Our Exclusive Collections</h2>
          <p className="section-sub">Specially curated, lovingly crafted — only at Baby Hub</p>
        </div>
        <div className="products-grid">
          <a href="/collection?c=pastel-bliss-collection" className="cat-card" style={{ aspectRatio: '3/4' }}>
            <img src="https://placehold.co/400x533/f5e8ff/4a2060?text=Pastel+Bliss" alt="Pastel Bliss" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Pastel Bliss</div><div className="cat-count">New Collection</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=tiny-tropics-collection" className="cat-card" style={{ aspectRatio: '3/4' }}>
            <img src="https://placehold.co/400x533/e8fff0/0a5020?text=Tiny+Tropics" alt="Tiny Tropics" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">Tiny Tropics</div><div className="cat-count">Summer Collection</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=the-wildflower-edit" className="cat-card" style={{ aspectRatio: '3/4' }}>
            <img src="https://placehold.co/400x533/fff0e8/6a3010?text=Wildflower+Edit" alt="Wildflower Edit" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">The Wildflower Edit</div><div className="cat-count">Spring Collection</div><span className="cat-btn">Shop Now →</span></div>
          </a>
          <a href="/collection?c=the-blue-edit" className="cat-card" style={{ aspectRatio: '3/4' }}>
            <img src="https://placehold.co/400x533/e0f0ff/0a2060?text=Blue+Edit" alt="The Blue Edit" className="cat-img"/>
            <div className="cat-overlay"></div>
            <div className="cat-info"><div className="cat-name">The Blue Edit</div><div className="cat-count">Boys Special</div><span className="cat-btn">Shop Now →</span></div>
          </a>
        </div>
      </section>

      {/* ========== GIFTING BANNER ========== */}
      <div className="banners-2" style={{ paddingTop: 0 }}>
        <a href="/pages/gift-registry" className="banner-block">
          <div className="banner-bg" style={{ background: 'linear-gradient(135deg,#4a3060,#8a5090,#c080b0)' }}></div>
          <div className="banner-grad"></div>
          <div className="banner-txt">
            <div className="banner-txt-tag">Gift Registry</div>
            <h3 className="banner-txt-title">Create Your Baby<br/>Gift Registry</h3>
            <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 14px' }}>Let family &amp; friends know exactly what you need</p>
            <span className="btn-banner-sm">Create Registry</span>
          </div>
        </a>
        <a href="/pages/loyalty" className="banner-block">
          <div className="banner-bg" style={{ background: 'linear-gradient(135deg,#1a2340,#2d4080,#4060c0)' }}></div>
          <div className="banner-grad"></div>
          <div className="banner-txt">
            <div className="banner-txt-tag">BH Magic Loyalty</div>
            <h3 className="banner-txt-title">Earn Points,<br/>Unlock Rewards</h3>
            <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 14px' }}>Join thousands of happy Baby Hub families</p>
            <span className="btn-banner-sm">Join Now</span>
          </div>
        </a>
      </div>

      {/* ========== BLOG SECTION ========== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-hd">
          <span className="section-eyebrow">From the Blog</span>
          <h2 className="section-title">Tips, Guides &amp; News</h2>
          <p className="section-sub">Expert advice and inspiration for new and growing families</p>
        </div>
        <div className="blog-grid">
          <a href="/blog" className="blog-card">
            <div className="blog-img-wrap">
              <img src="https://placehold.co/600x375/f5efe8/5a3010?text=Newborn+Guide" alt="How to Bath Your Newborn"/>
            </div>
            <div className="blog-body">
              <div className="blog-cat">Baby Care</div>
              <h3 className="blog-title">How to Bath Your Newborn in 7 Easy Steps</h3>
              <p className="blog-excerpt">Bathing a newborn for the first time can feel daunting. Our step-by-step guide walks you through everything you need to know to keep your baby safe and calm.</p>
              <div className="blog-meta"><span>February 21, 2024</span><span className="blog-read">Read More →</span></div>
            </div>
          </a>
          <a href="/blog" className="blog-card">
            <div className="blog-img-wrap">
              <img src="https://placehold.co/600x375/e8f5f0/0a4020?text=Nursery+Setup" alt="Nursery Setup Guide"/>
            </div>
            <div className="blog-body">
              <div className="blog-cat">Nursery</div>
              <h3 className="blog-title">The Complete Nursery Setup Checklist for New Parents</h3>
              <p className="blog-excerpt">Everything you need to create the perfect nursery — from cot selection to bedding themes, lighting and storage solutions.</p>
              <div className="blog-meta"><span>January 10, 2025</span><span className="blog-read">Read More →</span></div>
            </div>
          </a>
          <a href="/blog" className="blog-card">
            <div className="blog-img-wrap">
              <img src="https://placehold.co/600x375/f8eef8/401840?text=Gift+Guide" alt="Baby Gift Guide"/>
            </div>
            <div className="blog-body">
              <div className="blog-cat">Gifting</div>
              <h3 className="blog-title">Best Baby Shower Gifts in Sri Lanka — 2026 Guide</h3>
              <p className="blog-excerpt">Looking for the perfect baby shower gift? Our expert picks range from personalised keepsakes to practical essentials and luxury hampers.</p>
              <div className="blog-meta"><span>March 5, 2026</span><span className="blog-read">Read More →</span></div>
            </div>
          </a>
        </div>
        <div className="section-more-center">
          <a href="/blog" className="section-more">Read All Articles →</a>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <div className="newsletter-bar">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Join the Baby Hub Family</h2>
          <p className="newsletter-sub">Sign up and be the first to hear about exclusive offers, new arrivals and events.</p>
          <form className="newsletter-form form-newsletter">
            <input type="email" placeholder="Enter your email address…" required/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </>
  );
}
