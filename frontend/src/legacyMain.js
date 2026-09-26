/* ================================================
   Baby Hub — Legacy interactive behaviour, ported
   from js/main.js to run inside the React app.
   Two entry points:
     initLayout()            -> call ONCE (header / cart / search / mobile menu / WA / back-to-top)
     initPageInteractions()  -> call on EVERY route change (page-specific widgets)
   ================================================ */

/* ---- Cart State (localStorage-backed, same schema as the static site) ---- */
let cart = JSON.parse(localStorage.getItem('bh_cart') || '[]');

function saveCart() {
  localStorage.setItem('bh_cart', JSON.stringify(cart));
  renderCart();
  updateCartBadge();
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id && i.size === product.size);
  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart();
  openCart();
  showToast('✓  Added to cart!', 'ok');
}

function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
}

function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id, size);
    else saveCart();
  }
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function updateCartBadge() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-msg">
        <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p>Your cart is empty</p>
        <a href="/collection?c=new-arrivals">Start Shopping</a>
      </div>`;
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0.00';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}" data-size="${item.size || ''}">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">${item.size ? 'Size: ' + item.size : ''}</div>
        <div class="cart-item-price-row">
          <span class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}.00</span>
          <div class="cart-item-qty-ctrl">
            <button class="c-qty-btn" onclick="window.bhChangeQty('${item.id}','${item.size||''}',-1)">−</button>
            <span class="c-qty-num">${item.qty}</span>
            <button class="c-qty-btn" onclick="window.bhChangeQty('${item.id}','${item.size||''}',1)">+</button>
          </div>
        </div>
        <span class="cart-item-remove" onclick="window.bhRemove('${item.id}','${item.size||''}')">Remove</span>
      </div>
    </div>`).join('');

  if (subtotalEl) subtotalEl.textContent = 'Rs. ' + cartTotal().toLocaleString() + '.00';
}

window.bhAddToCart = addToCart;
window.bhRemove = (id, size) => { removeFromCart(id, size); };
window.bhChangeQty = (id, size, d) => { changeQty(id, size, parseInt(d)); };
window.bhGetCart = () => cart;
window.bhCartTotal = cartTotal;

/* ---- Cart Sidebar ---- */
function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
window.bhOpenCart = openCart;
window.bhCloseCart = closeCart;

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const overlay = document.getElementById('mobileOverlay');
  const panel   = document.getElementById('mobilePanel');
  const open    = document.getElementById('mobileOpen');
  const close   = document.getElementById('mobileClose');
  if (!overlay) return;

  open?.addEventListener('click', () => {
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  function closeMob() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }
  close?.addEventListener('click', closeMob);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeMob(); });

  document.querySelectorAll('.mobile-nav-row').forEach(row => {
    const link = row.querySelector('.mobile-nav-link');
    const sub  = row.querySelector('.mobile-sub');
    if (link && sub) {
      link.addEventListener('click', () => {
        row.classList.toggle('open');
      });
    }
  });
}

/* ---- Search Overlay ---- */
function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  const openBtn = document.getElementById('searchOpen');
  const closeBtn= document.getElementById('searchClose');
  if (!overlay) return;
  openBtn?.addEventListener('click', () => {
    overlay.classList.add('open');
    overlay.querySelector('input')?.focus();
    document.body.style.overflow = 'hidden';
  });
  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  closeBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
}

/* ---- Cart Trigger ---- */
function initCartTrigger() {
  document.getElementById('cartOpen')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
}

/* ---- Hero Slider ---- */
let heroTimer = null;
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;
  if (heroTimer) clearInterval(heroTimer);
  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }
  function start() { heroTimer = setInterval(() => goTo(current + 1), 5000); }
  function stop()  { clearInterval(heroTimer); }

  document.getElementById('heroPrev')?.addEventListener('click', () => { stop(); goTo(current - 1); start(); });
  document.getElementById('heroNext')?.addEventListener('click', () => { stop(); goTo(current + 1); start(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); start(); }));
  start();
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ---- Tabs ---- */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.prod-tabs, .tabs-block');
      if (!container) return;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('on'));
      btn.classList.add('on');
      const target = btn.dataset.tab;
      container.querySelector(`#${target}`)?.classList.add('on');
    });
  });
}

/* ---- Product Gallery ---- */
function initGallery() {
  document.querySelectorAll('.g-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const wrap = thumb.closest('.gallery-area');
      if (!wrap) return;
      const main = wrap.querySelector('.gallery-main img');
      if (main) main.src = thumb.querySelector('img').src;
      wrap.querySelectorAll('.g-thumb').forEach(t => t.classList.remove('on'));
      thumb.classList.add('on');
    });
  });
}

/* ---- Quantity Selector ---- */
function initQtySelector() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.qty-ctrl');
      const val  = wrap?.querySelector('.qty-val');
      if (!val) return;
      let v = parseInt(val.value) || 1;
      if (btn.dataset.dir === 'up') v++;
      else v = Math.max(1, v - 1);
      val.value = v;
    });
  });
}

/* ---- Size Selector ---- */
function initSizeSelector() {
  document.querySelectorAll('.size-sel .sz').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-sel').querySelectorAll('.sz').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });
  document.querySelectorAll('.size-chips .s-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.closest('.size-chips').querySelectorAll('.s-chip').forEach(c => c.classList.remove('on'));
      chip.classList.add('on');
    });
  });
}

/* ---- Color Selector ---- */
function initColorSelector() {
  document.querySelectorAll('.color-sel .c-swatch, .swatches .swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      sw.closest('.color-sel, .swatches').querySelectorAll('.c-swatch, .swatch').forEach(s => s.classList.remove('on'));
      sw.classList.add('on');
    });
  });
}

/* ---- Add to Cart buttons ---- */
function initAddToCart() {
  document.querySelectorAll('.product-quick-add, .btn-atc').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card, .prod-info-wrap');
      const name  = card?.querySelector('.product-name, h1')?.textContent?.trim() || 'Product';
      const priceEl = card?.querySelector('.price-now, .prod-price-big');
      const price = parseInt(priceEl?.textContent?.replace(/[^\d]/g,'') || '0');
      const img   = card?.querySelector('.product-img-main, .gallery-main img')?.src || '';
      const size  = card?.querySelector('.sz.on')?.textContent?.trim() || '';
      const id    = btn.dataset.id || Math.random().toString(36).slice(2);
      addToCart({ id, name, price, img, size });
    });
  });
}

/* ---- Wishlist Toggle ---- */
function initWishlist() {
  document.querySelectorAll('.product-wishlist, .btn-wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      btn.classList.toggle('wished');
      const svg = btn.querySelector('svg');
      if (svg) {
        if (btn.classList.contains('wished')) {
          svg.style.fill = '#e84545';
          svg.style.stroke = '#e84545';
          showToast('♥ Added to wishlist');
        } else {
          svg.style.fill = 'none';
          svg.style.stroke = 'currentColor';
        }
      }
    });
  });
}

/* ---- Newsletter ---- */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form, .form-newsletter').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      if (input?.value) {
        showToast('✓ Thank you for subscribing!', 'ok');
        input.value = '';
      }
    });
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  document.querySelector('.contact-form form, .form-contact')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast("✓ Message sent! We'll be in touch.", 'ok');
    e.target.reset();
  });
}

/* ---- Filter Toggle ---- */
function initFilterToggle() {
  const btn   = document.getElementById('filterToggle');
  const panel = document.getElementById('filterPanel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    btn.textContent = panel.classList.contains('hidden') ? '⊞ Show Filters' : '⊟ Hide Filters';
  });
}

/* ---- FAQ Category Filter ---- */
function initFaqCats() {
  document.querySelectorAll('.faq-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-cat-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
}

/* ---- Toast Notifications ---- */
export function showToast(msg, type = '') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3100);
}
window.showToast = showToast;

/* ---- Sticky Header (hide announcement bar on scroll) ---- */
function initStickyHeader() {
  const ann = document.querySelector('.announcement-bar');
  if (!ann) return;
  window.addEventListener('scroll', () => {
    ann.style.display = window.scrollY > 80 ? 'none' : '';
  }, { passive: true });
}

/* ---- Smooth Scroll for anchor links ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ---- Promo Code Placeholder ---- */
function initPromo() {
  document.querySelectorAll('.promo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling?.value?.trim().toUpperCase();
      if (code === 'BABYHUB10') {
        showToast('✓ 10% discount applied!', 'ok');
      } else if (code) {
        showToast('✗ Invalid promo code', 'err');
      }
    });
  });
}

/* ---- Auth Form Validation ---- */
function initAuthForms() {
  document.querySelectorAll('form.auth-form, #loginForm, #registerForm').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showToast('✓ ' + (form.id === 'registerForm' ? 'Account created!' : 'Login successful!'), 'ok');
    });
  });
}

/* ---- Registry Form ---- */
function initRegistry() {
  document.querySelectorAll('.reg-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      showToast('🎁 Please login to create a registry', 'ok');
    });
  });
}

/* ---- WhatsApp floating button ---- */
function initWA() {
  // native <a href> already handles navigation; nothing extra needed
}

/* ---- Back to top ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Public entry points ---- */
export function initLayout() {
  updateCartBadge();
  renderCart();
  initMobileMenu();
  initSearch();
  initCartTrigger();
  initStickyHeader();
  initWA();
  initBackToTop();
}

export function initPageInteractions() {
  initHeroSlider();
  initFAQ();
  initTabs();
  initGallery();
  initQtySelector();
  initSizeSelector();
  initColorSelector();
  initAddToCart();
  initWishlist();
  initNewsletter();
  initContactForm();
  initFilterToggle();
  initFaqCats();
  initSmoothScroll();
  initPromo();
  initAuthForms();
  initRegistry();
}
