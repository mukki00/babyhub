import { mkdir, writeFile } from 'node:fs/promises';

const outputDirectory = new URL('./user-guide-assets/', import.meta.url);
const chromeDebugUrl = 'http://127.0.0.1:9229';
await mkdir(outputDirectory, { recursive: true });

const targets = await fetch(`${chromeDebugUrl}/json/list`).then((response) => response.json());
const target = targets.find((entry) => entry.type === 'page');
if (!target) throw new Error('No Chrome page is available for capture.');

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let nextId = 0;
const pending = new Map();
const screenshotCallouts = {};
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data.toString());
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result || {});
});

function cdp(method, params = {}) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const response = await cdp('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
  return response.result?.value;
}

async function waitForSelector(selector) {
  const expression = `new Promise((resolve, reject) => {
    if (document.querySelector(${JSON.stringify(selector)})) return resolve(true);
    const observer = new MutationObserver(() => {
      if (document.querySelector(${JSON.stringify(selector)})) {
        observer.disconnect();
        resolve(true);
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    setTimeout(() => { observer.disconnect(); reject(new Error('Timed out waiting for ${selector}')); }, 20000);
  })`;
  await evaluate(expression);
}

async function navigate(url, selector) {
  await cdp('Page.navigate', { url });
  if (selector) await waitForSelector(selector);
}

async function capture(name, callouts = []) {
  screenshotCallouts[name] = await evaluate(`({
    viewport: { width: innerWidth, height: innerHeight },
    callouts: (${JSON.stringify(callouts)}).map(({ number, label, selector }) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { number, label, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    }).filter(Boolean)
  })`);
  const result = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(new URL(name, outputDirectory), Buffer.from(result.data, 'base64'));
}

await cdp('Page.enable');
await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1050,
  deviceScaleFactor: 1,
  mobile: false,
});

const apiBase = 'http://localhost:3001/api';
const [products, categories] = await Promise.all([
  fetch(`${apiBase}/products`).then((response) => response.json()),
  fetch(`${apiBase}/categories`).then((response) => response.json()),
]);
const subCategories = await Promise.all(categories.map(async (category) => [
  String(category.id),
  await fetch(`${apiBase}/categories/${category.id}/sub-categories`).then((response) => response.json()),
]));
const subCategoryMap = Object.fromEntries(subCategories);

await navigate('http://localhost:5173/', '.product-card');
await capture('01-storefront-home.png', [
  { number: 1, label: 'Browse product categories', selector: '.home-category-menu-link' },
  { number: 2, label: 'Open a product', selector: '.product-card:first-child .product-name' },
  { number: 3, label: 'Open your cart', selector: '.site-header a[href="/cart"]' },
]);

await evaluate(`document.querySelectorAll('.home-category-menu-link')[3].click()`);
await waitForSelector('.home-category-dropdown');
await capture('02-category-subcategories.png', [
  { number: 1, label: 'Choose a category', selector: '.home-category-menu-link.active' },
  { number: 2, label: 'Choose a subcategory', selector: '.home-category-dropdown' },
]);

await navigate(`http://localhost:5173/product/${products[0]?.id}`, '.prod-detail');
await capture('03-product-details.png', [
  { number: 1, label: 'Review category and subcategory', selector: '.product-taxonomy-detail' },
  { number: 2, label: 'Set quantity', selector: '.qty-row' },
  { number: 3, label: 'Add to cart or order through WhatsApp', selector: '.prod-cta' },
]);

const cartItems = products.slice(0, 2).map((product, index) => ({
  id: product.id,
  name: product.name,
  price: Number(product.price),
  image: product.image_url,
  qty: index + 1,
}));
await evaluate(`localStorage.setItem('bh_cart', ${JSON.stringify(JSON.stringify(cartItems))})`);
await navigate('http://localhost:5173/cart', '.cart-summary');
await capture('04-cart-checkout.png', [
  { number: 1, label: 'Change quantity or remove an item', selector: '.cart-item-row' },
  { number: 2, label: 'Enter customer details', selector: '.cart-summary .form-grp' },
  { number: 3, label: 'Save and open WhatsApp', selector: '.cart-checkout-btn' },
]);

await cdp('Page.addScriptToEvaluateOnNewDocument', {
  source: `(() => {
    const realFetch = window.fetch.bind(window);
    const categories = ${JSON.stringify(categories)};
    const products = ${JSON.stringify(products)};
    const subCategories = ${JSON.stringify(subCategoryMap)};
    const orders = [{
      id: 9001,
      order_id: 'BH-DEMO-9001',
      created_at: '2026-09-29T08:30:00.000Z',
      customer_name: 'Sample Customer',
      customer_phone: '+94700000000',
      items: [{ productId: products[0].id, name: products[0].name, qty: 2, price: Number(products[0].price) }],
      total: Number(products[0].price) * 2,
      status: 'PENDING',
      paid: 0,
      delivered: 0,
      received: 0
    }];
    window.fetch = async (input, options) => {
      const url = new URL(typeof input === 'string' ? input : input.url, window.location.href);
      const json = (data) => new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      if (url.pathname.endsWith('/admin/settings/phone')) return json({ phoneNumber: '+94700000000' });
      if (url.pathname.endsWith('/admin/categories')) return json(categories);
      const subMatch = url.pathname.match(/\\/admin\\/categories\\/(\\d+)\\/sub-categories$/);
      if (subMatch) return json(subCategories[subMatch[1]] || []);
      if (url.pathname.endsWith('/admin/products')) return json(products);
      if (url.pathname.endsWith('/admin/orders')) return json(orders);
      return realFetch(input, options);
    };
  })();`,
});
await evaluate(`localStorage.removeItem('bh_admin_token')`);
await navigate('http://localhost:5173/admin/login', '.auth-box');
await capture('05-admin-login.png', [
  { number: 1, label: 'Enter admin credentials', selector: '.auth-box form' },
  { number: 2, label: 'Sign in', selector: '.auth-box .btn-primary' },
]);
await evaluate(`localStorage.setItem('bh_admin_token', 'guide-preview-only')`);
await navigate('http://localhost:5173/admin', '.product-admin-table');
await capture('06-admin-products.png', [
  { number: 1, label: 'Edit the WhatsApp contact number', selector: '.admin-phone-display .icon-action-btn' },
  { number: 2, label: 'Create a product', selector: '.admin-head .btn-secondary' },
  { number: 3, label: 'Expand product description', selector: '.description-expand-btn' },
  { number: 4, label: 'Review product category data', selector: '.product-admin-table th:nth-child(4)' },
]);
await evaluate(`document.querySelector('.admin-phone-display .icon-action-btn').click()`);
await waitForSelector('#admin-phone-number');
await capture('07-admin-phone-edit.png', [
  { number: 1, label: 'Edit contact phone', selector: '#admin-phone-number' },
  { number: 2, label: 'Save or cancel the change', selector: '.admin-phone-actions' },
]);
await evaluate(`document.querySelector('.admin-phone-actions .btn-secondary').click()`);
await evaluate(`document.querySelector('.admin-head button.btn-secondary').click()`);
await waitForSelector('#product-category');
await cdp('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 1200,
  deviceScaleFactor: 1,
  mobile: false,
});
await capture('08-admin-new-product.png', [
  { number: 1, label: 'Enter product name and description', selector: '.admin-form input[type="text"]' },
  { number: 2, label: 'Select category and subcategory', selector: '.admin-form select' },
  { number: 3, label: 'Set price and image', selector: '.admin-form input[type="number"]' },
  { number: 4, label: 'Save the product', selector: '.admin-form .btn-primary' },
]);

await navigate('http://localhost:5173/admin/orders', '.order-tabs');
await waitForSelector('.order-expand-btn');
await evaluate(`document.querySelector('.order-expand-btn').click()`);
await capture('09-admin-orders.png', [
  { number: 1, label: 'Switch between order statuses', selector: '.order-tabs' },
  { number: 2, label: 'Expand order items', selector: '.order-expand-btn' },
  { number: 3, label: 'Open order actions', selector: '.icon-action-btn' },
]);
await evaluate(`document.querySelector('.edit-icon-btn').click()`);
await waitForSelector('.edit-order-dialog');
await capture('10-admin-edit-order.png', [
  { number: 1, label: 'Edit customer and line-item details', selector: '.edit-order-dialog' },
  { number: 2, label: 'Save or cancel changes', selector: '.edit-order-dialog .confirm-actions' },
]);
await writeFile(new URL('screenshot-callouts.json', outputDirectory), JSON.stringify({
  screenshots: screenshotCallouts,
}, null, 2));
await socket.close();
console.log('Captured ten user-guide screenshots and target coordinates. Admin screenshots use illustrative in-memory sample data.');
