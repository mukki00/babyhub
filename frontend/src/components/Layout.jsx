import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { initLayout, initPageInteractions } from '../legacyMain.js';

export default function Layout() {
  const location = useLocation();

  // Run once: header/cart/search/mobile-menu wiring
  useEffect(() => {
    initLayout();
  }, []);

  // Run on every navigation: page-specific widgets (tabs, gallery, faq, etc.)
  useEffect(() => {
    initPageInteractions();
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <div className="announcement-slider">
          <span>🚀 Enjoy island-wide delivery when you shop online! *T&amp;C Apply &nbsp;&nbsp;|&nbsp;&nbsp; 🎁 Free shipping on orders above Rs. 15,000 &nbsp;&nbsp;|&nbsp;&nbsp; 💌 New arrivals every week — Shop Now &nbsp;&nbsp;|&nbsp;&nbsp; 🌍 International shipping available to 10+ countries &nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span>🚀 Enjoy island-wide delivery when you shop online! *T&amp;C Apply &nbsp;&nbsp;|&nbsp;&nbsp; 🎁 Free shipping on orders above Rs. 15,000 &nbsp;&nbsp;|&nbsp;&nbsp; 💌 New arrivals every week — Shop Now &nbsp;&nbsp;|&nbsp;&nbsp; 🌍 International shipping available to 10+ countries &nbsp;&nbsp;|&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-icons">
            <button className="hamburger icon-btn" id="mobileOpen" aria-label="Menu">
              <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <button className="icon-btn" id="searchOpen" aria-label="Search">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>

          <div className="site-logo">
            <Link to="/" className="logo-link">
              <span className="logo-script">Baby Hub</span>
              <span className="logo-sub">Made for Baby &amp; You</span>
            </Link>
          </div>

          <div className="header-icons">
            <Link to="/account/login" className="icon-btn" aria-label="Account">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>
            <button className="icon-btn" id="cartOpen" aria-label="Cart">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <span className="cart-badge" style={{ display: 'none' }}>0</span>
            </button>
          </div>
        </div>

        <nav className="main-nav">
          <div className="nav-inner">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/collection?c=sale" className="nav-link sale">Sale</Link></li>
              <li className="nav-item"><Link to="/collection?c=new-arrivals" className="nav-link">New Arrivals</Link></li>

              <li className="nav-item">
                <Link to="/collection?c=baby-essentials" className="nav-link has-dropdown">Baby Essentials</Link>
                <div className="mega-menu">
                  <div className="mega-col">
                    <h5>Feeding</h5>
                    <Link to="/collection?c=feeding-bottles">Feeding Bottles</Link>
                    <Link to="/collection?c=bibs">Bibs &amp; Burp Cloths</Link>
                    <Link to="/collection?c=nursing-pillows">Nursing Pillows</Link>
                    <Link to="/collection?c=tableware">Tableware</Link>
                    <Link to="/collection?c=nursing-cover">Nursing Covers</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Bathing</h5>
                    <Link to="/collection?c=bathtubs-bathers">Bathtubs &amp; Bathers</Link>
                    <Link to="/collection?c=hooded-towels">Hooded Towels</Link>
                    <Link to="/collection?c=bath-towels">Bath Towels</Link>
                    <Link to="/collection?c=washcloths">Washcloths</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Diapering</h5>
                    <Link to="/collection?c=baby-diapers">Disposable Diapers</Link>
                    <Link to="/collection?c=nappies-pins">Nappies &amp; Pins</Link>
                    <Link to="/collection?c=changing-mat">Changing Mat</Link>
                    <Link to="/collection?c=diaper-bags">Diaper Bags</Link>
                    <Link to="/collection?c=baby-wipes">Baby Wipes</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Blankets</h5>
                    <Link to="/collection?c=hooded-blankets">Hooded Blankets</Link>
                    <Link to="/collection?c=swaddling-blanket">Swaddling Blankets</Link>
                    <Link to="/collection?c=fleece-blanket">Fleece Blankets</Link>
                    <Link to="/collection?c=baby-carry-quilts">Carry Quilts</Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=baby-gear" className="nav-link has-dropdown">Baby Gear</Link>
                <div className="dropdown">
                  <Link to="/collection?c=strollers">Strollers</Link>
                  <Link to="/collection?c=car-seats">Car Seats</Link>
                  <Link to="/collection?c=baby-carriers">Baby Carriers</Link>
                  <Link to="/collection?c=activity-gyms">Activity Gyms</Link>
                  <Link to="/collection?c=play-mats">Play Mats</Link>
                  <Link to="/collection?c=baby-monitors">Baby Monitors</Link>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=girls-clothing" className="nav-link has-dropdown">Girls Clothing</Link>
                <div className="mega-menu">
                  <div className="mega-col">
                    <h5>Tops &amp; Dresses</h5>
                    <Link to="/collection?c=dresses">All Dresses</Link>
                    <Link to="/collection?c=smocked-dresses">Smocked Dresses</Link>
                    <Link to="/collection?c=short-sleeve-dresses">Short Sleeve</Link>
                    <Link to="/collection?c=long-sleeved-dresses">Long Sleeve</Link>
                    <Link to="/collection?c=sleeveless-dresses">Sleeveless</Link>
                    <Link to="/collection?c=tops-girl">Tops</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Bottoms</h5>
                    <Link to="/collection?c=girls-leggings">Leggings</Link>
                    <Link to="/collection?c=girls-skirts">Skirts</Link>
                    <Link to="/collection?c=bloomers">Bloomers</Link>
                    <Link to="/collection?c=rompers-girl">Rompers</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Special</h5>
                    <Link to="/collection?c=special-occasions-girl">Special Occasions</Link>
                    <Link to="/collection?c=christening-robes-girl">Christening Robes</Link>
                    <Link to="/collection?c=partywear-girl">Party Wear</Link>
                    <Link to="/collection?c=take-me-home-outfits-girl">Take Me Home</Link>
                    <Link to="/collection?c=girls-pyjamas">Pyjamas</Link>
                    <Link to="/collection?c=sleepsuits-girl">Sleepsuits</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Accessories</h5>
                    <Link to="/collection?c=girls-shoes">Shoes</Link>
                    <Link to="/collection?c=girls-headbands">Headbands</Link>
                    <Link to="/collection?c=girls-hair-clips">Hair Clips</Link>
                    <Link to="/collection?c=girls-jackets">Jackets</Link>
                    <Link to="/collection?c=girls-underwear">Underwear</Link>
                    <Link to="/collection?c=swimwear">Swimwear</Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=boys-clothing" className="nav-link has-dropdown">Boys Clothing</Link>
                <div className="mega-menu">
                  <div className="mega-col">
                    <h5>Tops</h5>
                    <Link to="/collection?c=t-shirts-boy">T-Shirts</Link>
                    <Link to="/collection?c=shirts-boy">Shirts</Link>
                    <Link to="/collection?c=tops-boy">All Tops</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Bottoms</h5>
                    <Link to="/collection?c=shorts-boy">Shorts</Link>
                    <Link to="/collection?c=pants-boy">Pants</Link>
                    <Link to="/collection?c=dungarees-boy">Dungarees</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Sets &amp; Others</h5>
                    <Link to="/collection?c=bloomer-sets">Bloomer Sets</Link>
                    <Link to="/collection?c=boys-rompers">Rompers</Link>
                    <Link to="/collection?c=rompers-and-others">Others</Link>
                    <Link to="/collection?c=sleepsuits-boy">Sleepsuits</Link>
                    <Link to="/collection?c=pajamas-boy">Pyjamas</Link>
                  </div>
                  <div className="mega-col">
                    <h5>Special</h5>
                    <Link to="/collection?c=special-occasions-boy">Special Occasions</Link>
                    <Link to="/collection?c=christening-robes-boy">Christening Robes</Link>
                    <Link to="/collection?c=take-me-home-outfits-boy">Take Me Home</Link>
                    <Link to="/collection?c=boys-shoes">Shoes</Link>
                    <Link to="/collection?c=boys-jackets">Jackets</Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=bedding" className="nav-link has-dropdown">Bedding</Link>
                <div className="dropdown">
                  <Link to="/collection?c=bedding-bundles">Bedding Bundles</Link>
                  <Link to="/collection?c=cot-sheet">Cot Sheets</Link>
                  <Link to="/collection?c=pillows-bumpers">Pillows &amp; Bumpers</Link>
                  <Link to="/collection?c=comforter-quilt">Comforter / Quilt</Link>
                  <Link to="/collection?c=girls-bedding">Girls Bedding</Link>
                  <Link to="/collection?c=boys-bedding-collections">Boys Bedding</Link>
                  <Link to="/collection?c=neutral-bedding-collections">Neutral Bedding</Link>
                  <Link to="/collection?c=all-bedding">View All Bedding</Link>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=furniture" className="nav-link has-dropdown">Furniture</Link>
                <div className="dropdown">
                  <Link to="/collection?c=baby-cots">Baby Cots</Link>
                  <Link to="/collection?c=bassinets">Bassinets</Link>
                  <Link to="/collection?c=baby-dressers">Baby Dressers</Link>
                  <Link to="/collection?c=baby-wardrobes">Baby Wardrobes</Link>
                  <Link to="/collection?c=nursing-chairs">Nursing Chairs</Link>
                  <Link to="/collection?c=feeding-chairs">Feeding Chairs</Link>
                  <Link to="/collection?c=wall-shelves">Wall Shelves</Link>
                </div>
              </li>

              <li className="nav-item">
                <Link to="/collection?c=gifting" className="nav-link has-dropdown">Gifting</Link>
                <div className="dropdown">
                  <Link to="/collection?c=gift-hampers">Gift Hampers</Link>
                  <Link to="/collection?c=gift-vouchers">Gift Vouchers</Link>
                  <Link to="/collection?c=personalised-gifts">Personalised Gifts</Link>
                  <Link to="/collection?c=greeting-cards">Greeting Cards</Link>
                  <Link to="/collection?c=gift-wrapping">Gift Wrapping</Link>
                  <Link to="/collection?c=hospital-packs">Hospital Packs</Link>
                  <Link to="/collection?c=corporate-baby-gifting-sri-lanka">Corporate Gifting</Link>
                </div>
              </li>

              <li className="nav-item"><Link to="/pages/gift-registry" className="nav-link">Gift Registry</Link></li>
              <li className="nav-item"><Link to="/collection?c=shop-by-brand" className="nav-link">Shop By Brand</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <div className="mobile-overlay" id="mobileOverlay">
        <div className="mobile-panel" id="mobilePanel">
          <div className="mobile-head">
            <span className="logo-script" style={{ color: 'white' }}>Baby Hub</span>
            <button className="mobile-close" id="mobileClose">✕</button>
          </div>
          <nav className="mobile-nav">
            <div className="mobile-nav-row"><Link className="mobile-nav-link sale" to="/collection?c=sale">Sale</Link></div>
            <div className="mobile-nav-row"><Link className="mobile-nav-link" to="/collection?c=new-arrivals">New Arrivals</Link></div>
            <div className="mobile-nav-row">
              <div className="mobile-nav-link">Baby Essentials <span className="chevron">›</span></div>
              <div className="mobile-sub">
                <Link to="/collection?c=feeding">Feeding</Link>
                <Link to="/collection?c=bathing">Bathing</Link>
                <Link to="/collection?c=diapering">Diapering</Link>
                <Link to="/collection?c=blankets">Blankets</Link>
                <Link to="/collection?c=baby-care">Baby Care</Link>
                <Link to="/collection?c=health-safety">Health &amp; Safety</Link>
              </div>
            </div>
            <div className="mobile-nav-row">
              <div className="mobile-nav-link">Girls Clothing <span className="chevron">›</span></div>
              <div className="mobile-sub">
                <Link to="/collection?c=dresses">Dresses</Link>
                <Link to="/collection?c=smocked-dresses">Smocked Dresses</Link>
                <Link to="/collection?c=tops-girl">Tops</Link>
                <Link to="/collection?c=rompers-girl">Rompers</Link>
                <Link to="/collection?c=special-occasions-girl">Special Occasions</Link>
                <Link to="/collection?c=girls-shoes">Shoes</Link>
              </div>
            </div>
            <div className="mobile-nav-row">
              <div className="mobile-nav-link">Boys Clothing <span className="chevron">›</span></div>
              <div className="mobile-sub">
                <Link to="/collection?c=t-shirts-boy">T-Shirts</Link>
                <Link to="/collection?c=shorts-boy">Shorts</Link>
                <Link to="/collection?c=boys-rompers">Rompers</Link>
                <Link to="/collection?c=special-occasions-boy">Special Occasions</Link>
                <Link to="/collection?c=boys-shoes">Shoes</Link>
              </div>
            </div>
            <div className="mobile-nav-row"><Link className="mobile-nav-link" to="/collection?c=bedding">Bedding</Link></div>
            <div className="mobile-nav-row"><Link className="mobile-nav-link" to="/collection?c=furniture">Furniture</Link></div>
            <div className="mobile-nav-row"><Link className="mobile-nav-link" to="/pages/gift-registry">Gift Registry</Link></div>
            <div className="mobile-nav-row"><Link className="mobile-nav-link" to="/collection?c=shop-by-brand">Shop By Brand</Link></div>
          </nav>
          <div className="mobile-footer">
            <Link to="/pages/about">About Us</Link>
            <Link to="/pages/contact">Contact Us</Link>
            <Link to="/pages/locations">Store Locations</Link>
            <Link to="/pages/loyalty">BH Magic Loyalty</Link>
            <Link to="/pages/faq">FAQ</Link>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <div className="search-overlay" id="searchOverlay">
        <div className="search-wrap">
          <button className="search-close-btn" id="searchClose">✕</button>
          <div className="search-input-row">
            <input type="text" placeholder="Search for products, brands, themes…" />
            <button>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" fill="none" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
          <p className="search-hint">Popular: Smocked Dresses &nbsp;·&nbsp; Baby Cots &nbsp;·&nbsp; Gift Hampers &nbsp;·&nbsp; Feeding Bottles</p>
        </div>
      </div>

      {/* CART SIDEBAR */}
      <div className="cart-overlay" id="cartOverlay"></div>
      <div className="cart-sidebar" id="cartSidebar">
        <div className="cart-head">
          <h3>Your Cart</h3>
          <span className="cart-head-close" id="cartClose">✕</span>
        </div>
        <div className="cart-body" id="cartBody"></div>
        <div className="cart-foot">
          <div className="cart-subtotal-row">
            <span>Subtotal</span>
            <span id="cartSubtotal">Rs. 0.00</span>
          </div>
          <p className="cart-note">Shipping &amp; taxes calculated at checkout</p>
          <button className="btn-checkout-main" onClick={() => (window.location.href = '/cart')}>Proceed to Checkout</button>
          <Link to="/cart" className="btn-view-cart-main">View Cart</Link>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="logo-script">Baby Hub</span>
            <span className="logo-sub" style={{ display: 'block', marginBottom: 14 }}>Made for Baby &amp; You</span>
            <p>We are a homegrown, specialist retailer of premium quality products for babies, kids and new parents across Sri Lanka.</p>
            <div className="footer-social">
              <a href="#" className="soc-btn" title="Facebook">f</a>
              <a href="#" className="soc-btn" title="Instagram">📷</a>
              <a href="#" className="soc-btn" title="YouTube">▶</a>
              <a href="#" className="soc-btn" title="TikTok">♪</a>
              <a href="#" className="soc-btn" title="Pinterest">P</a>
              <a href="#" className="soc-btn" title="WhatsApp">💬</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/collection?c=sale">Sale</Link></li>
              <li><Link to="/collection?c=new-arrivals">New Arrivals</Link></li>
              <li><Link to="/collection?c=baby-essentials">Baby Essentials</Link></li>
              <li><Link to="/collection?c=baby-gear">Baby Gear</Link></li>
              <li><Link to="/collection?c=girls-clothing">Girls Clothing</Link></li>
              <li><Link to="/collection?c=boys-clothing">Boys Clothing</Link></li>
              <li><Link to="/collection?c=bedding">Bedding</Link></li>
              <li><Link to="/collection?c=furniture">Furniture</Link></li>
              <li><Link to="/collection?c=gifting">Gifting</Link></li>
              <li><Link to="/pages/gift-registry">Gift Registry</Link></li>
              <li><Link to="/collection?c=shop-by-brand">Shop By Brand</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li><Link to="/pages/about">About Us</Link></li>
              <li><Link to="/pages/contact">Contact Us</Link></li>
              <li><Link to="/pages/locations">Store Locations</Link></li>
              <li><Link to="/pages/faq">FAQ</Link></li>
              <li><Link to="/pages/shipping">Shipping Information</Link></li>
              <li><Link to="/pages/returns">Returns &amp; Exchanges</Link></li>
              <li><Link to="/pages/international-shipping">International Shipping</Link></li>
              <li><Link to="/account/login">My Account</Link></li>
              <li><Link to="/pages/loyalty">BH Magic Loyalty</Link></li>
              <li><Link to="/collection?c=corporate-baby-gifting-sri-lanka">Corporate Gifting</Link></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item"><span className="footer-contact-icon">📍</span><span>137 Bauddhaloka Mw,<br/>Colombo 04, Sri Lanka</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">📞</span><span>011-255-2829</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">📱</span><span>+94 72 226 4444</span></div>
            <div className="footer-contact-item"><span className="footer-contact-icon">✉️</span><span>online@shopbabyhub.lk</span></div>
            <br/>
            <h4>Store Hours</h4>
            <div className="footer-contact-item"><span className="footer-contact-icon">🕐</span><span>Open Every Day<br/>9:30 AM – 9:00 PM</span></div>
          </div>
        </div>
        <div className="footer-bot">
          <p>© 2026 Baby Hub (Pvt) Ltd. All rights reserved. | shopbabyhub.lk</p>
          <div className="payment-methods">
            <span className="pay-icon">Visa</span>
            <span className="pay-icon">Master</span>
            <span className="pay-icon">AmEx</span>
            <span className="pay-icon">MintPay</span>
            <span className="pay-icon">COD</span>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/94XXXXXXXXXX" className="wa-btn" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>

      {/* Toast container */}
      <div className="toast-wrap"></div>
    </>
  );
}
