import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const docsDirectory = path.dirname(fileURLToPath(import.meta.url));
const assetsDirectory = path.join(docsDirectory, 'user-guide-assets');
const calloutData = JSON.parse(await readFile(path.join(assetsDirectory, 'screenshot-callouts.json'), 'utf8'));

const pages = [
  {
    image: '01-storefront-home.png',
    section: 'Customer workflow · 1 of 4',
    title: 'Browse the storefront',
    intro: 'The home page opens on Special Offers. Use the category bar to browse, then choose a product to see its details.',
    steps: [
      'Use the category bar to browse departments. On smaller screens, use the ‹ and › arrows to move through the menu.',
      'Select a product card to open the product page. The product category and subcategory appear above its name.',
      'Use the cart icon in the header to review items at any time.',
    ],
    callouts: [
      'Browse categories; Special Offers is the initial view.',
      'Open a product to see its details.',
      'Open the cart to review selected items.',
    ],
  },
  {
    image: '02-category-subcategories.png',
    section: 'Customer workflow · browsing',
    title: 'Browse by category',
    intro: 'Hover over a category on desktop or tap it on a touch screen to reveal its subcategories.',
    steps: [
      'Choose a category in the top menu.',
      'Choose a subcategory in the list below it to filter products.',
      'To change the selection, choose another category and subcategory.',
    ],
    callouts: [
      'The selected category is highlighted.',
      'Choose a subcategory to filter the products.',
    ],
  },
  {
    image: '03-product-details.png',
    section: 'Customer workflow · product details',
    title: 'Review a product',
    intro: 'The product page shows its category, subcategory, description, price, and purchase actions.',
    steps: [
      'Check the category breadcrumb and product information.',
      'Adjust the quantity with − and +.',
      'Choose Add to Cart to continue shopping, or Order via WhatsApp to proceed to the cart checkout.',
    ],
    callouts: [
      'Confirm the category and subcategory.',
      'Set the quantity before adding the item.',
      'Add to cart or continue toward WhatsApp checkout.',
    ],
  },
  {
    image: '04-cart-checkout.png',
    section: 'Customer workflow · checkout',
    title: 'Review and place an order',
    intro: 'Checkout saves the order and opens WhatsApp with the order details ready to send.',
    steps: [
      'Use +/− to adjust quantity or Remove to take an item out of the cart.',
      'Enter your name and phone number. Customer numbers may use +947xxxxxxxx or 07xxxxxxxx.',
      'Choose Checkout via WhatsApp. The order is saved first, then WhatsApp opens with the order reference and item list.',
    ],
    callouts: [
      'Review items, quantities, and remove unwanted items.',
      'Enter your customer name and phone number.',
      'Save the order and open the WhatsApp conversation.',
    ],
  },
  {
    image: '05-admin-login.png',
    section: 'Admin tools · sign-in',
    title: 'Sign in to the admin area',
    intro: 'Admin pages require an authorized account. The screenshot is illustrative and contains no real credentials.',
    steps: [
      'Open Admin Login from the footer or go to /admin/login.',
      'Enter the username and password assigned to your admin account, then choose Sign In.',
      'After sign-in, use Products and Orders in the admin navigation. Log Out ends the admin session.',
    ],
    callouts: [
      'Enter your admin username and password.',
      'Sign in to open the dashboard.',
    ],
    sample: true,
  },
  {
    image: '06-admin-products.png',
    section: 'Admin tools · product management',
    title: 'Manage products',
    intro: 'The Products page lists products with their category, subcategory, price, and available actions.',
    steps: [
      'Choose + New Product to add an item. Use Edit to change an existing product or Delete to remove one.',
      'The + control at the far left expands a row to show its description; − collapses it.',
      'The table can scroll horizontally on narrower screens.',
    ],
    callouts: [
      'Edit the WhatsApp contact number.',
      'Start creating a product.',
      'Expand the product description.',
      'Review product category, subcategory, price, and actions.',
    ],
    sample: true,
  },
  {
    image: '07-admin-phone-edit.png',
    section: 'Admin tools · contact settings',
    title: 'Edit the WhatsApp contact',
    intro: 'The contact number is read-only until the pencil icon is selected.',
    steps: [
      'Select the pencil icon on the Products page.',
      'Enter a number in +947xxxxxxxx format only.',
      'Choose Save Phone Number to apply the change, or Cancel to restore the saved value.',
    ],
    callouts: [
      'Enter the admin WhatsApp number in +947xxxxxxxx format.',
      'Save the new number or cancel the edit.',
    ],
    sample: true,
  },
  {
    image: '08-admin-new-product.png',
    section: 'Admin tools · product entry',
    title: 'Add or edit a product',
    intro: 'The same form is used when creating a product or editing an existing product.',
    steps: [
      'Enter the product name and description.',
      'Select a product category, then its matching subcategory.',
      'Enter the price and choose an image file if available.',
      'Choose Save. To edit an item, return to Products and choose Edit on its row.',
    ],
    callouts: [
      'Enter the product name and description.',
      'Choose the product category and subcategory.',
      'Set the price and optional image.',
      'Save the product.',
    ],
    sample: true,
  },
  {
    image: '09-admin-orders.png',
    section: 'Admin tools · order management',
    title: 'Track and update orders',
    intro: 'Orders are grouped by status so the team can review each stage of fulfillment.',
    steps: [
      'Use Orders, Shipped, Returned, and Refund tabs to switch between statuses.',
      'Select + to inspect order line items; − closes the expanded details.',
      'Pending orders can be edited, deleted, or marked shipped. Shipped orders support delivery tracking; returned orders support receipt, reshipment, or refund actions.',
      'Confirm status-changing actions carefully; some actions cannot be undone.',
    ],
    callouts: [
      'Switch between order-status views.',
      'Expand an order to inspect its items.',
      'Open the order actions.',
    ],
    sample: true,
  },
  {
    image: '10-admin-edit-order.png',
    section: 'Admin tools · order editing',
    title: 'Edit order details',
    intro: 'The order editor lets an admin correct customer details and line items before saving.',
    steps: [
      'Review the order reference and update the customer name or phone number if needed.',
      'Adjust item quantities/prices or remove a line item. The total is recalculated from the items.',
      'Choose Save Changes to apply the update, or Cancel to close without saving.',
    ],
    callouts: [
      'Edit customer details and order line items.',
      'Save changes or cancel.',
    ],
    sample: true,
  },
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function buildArrows(page, pageIndex) {
  const metadata = calloutData.screenshots[page.image];
  const width = metadata.viewport.width;
  const height = metadata.viewport.height;
  return metadata.callouts.map((target, index) => {
    const x = target.x + target.width / 2;
    const y = target.y + target.height / 2;
    const side = x < width * 0.56 ? 1 : -1;
    const startX = Math.max(20, Math.min(width - 20, x + side * Math.min(74, width * 0.055)));
    const startY = Math.max(20, Math.min(height - 20, y - 38 - (index % 2) * 16));
    const markerId = `arrow-${pageIndex}-${target.number}`;
    return `<g class="arrow-callout">
      <defs><marker id="${markerId}" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M2,2 L10,6 L2,10" fill="none" stroke="#cd579a" stroke-width="2"/></marker></defs>
      <line x1="${startX}" y1="${startY}" x2="${x}" y2="${y}" stroke="#cd579a" stroke-width="3" marker-end="url(#${markerId})"/>
      <circle cx="${startX}" cy="${startY}" r="16" fill="#cd579a" stroke="#ffffff" stroke-width="3"/>
      <text x="${startX}" y="${startY + 5}" text-anchor="middle">${target.number}</text>
    </g>`;
  }).join('\n');
}

const pageMarkup = pages.map((page, index) => {
  const metadata = calloutData.screenshots[page.image];
  const callouts = metadata.callouts;
  return `<section class="guide-page">
    <header class="page-header">
      <div><p class="eyebrow">Baby Hub · User Guide</p><p class="section-label">${escapeHtml(page.section)}</p></div>
      <span class="page-number">${String(index + 1).padStart(2, '0')}</span>
    </header>
    <div class="page-title-row">
      <div><h1>${escapeHtml(page.title)}</h1><p class="intro">${escapeHtml(page.intro)}</p></div>
      ${page.sample ? '<span class="sample-badge">Illustrative admin data</span>' : ''}
    </div>
    <div class="page-content">
      <figure class="screenshot-frame" style="--shot-ratio: ${metadata.viewport.width} / ${metadata.viewport.height}">
        <img src="user-guide-assets/${escapeHtml(page.image)}" alt="${escapeHtml(page.title)} screenshot">
        <svg class="arrow-layer" viewBox="0 0 ${metadata.viewport.width} ${metadata.viewport.height}" preserveAspectRatio="none" aria-hidden="true">${buildArrows(page, index)}</svg>
      </figure>
      <aside class="instructions">
        <h2>Steps</h2>
        <ol>${page.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
        <h2 class="callout-title">Screenshot callouts</h2>
        <ol class="callout-list">${callouts.map((callout) => `<li><span class="callout-number">${callout.number}</span><span>${escapeHtml(callout.label)}</span></li>`).join('')}</ol>
      </aside>
    </div>
    <footer class="page-footer"><span>Use your assigned admin account for protected tools. Never share login credentials.</span><span>Baby Hub · ${String(index + 1).padStart(2, '0')} / ${pages.length}</span></footer>
  </section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Baby Hub Website User Guide</title>
<style>
@page { size: A4 landscape; margin: 7mm; }
:root { --ink: #1a1a2e; --muted: #62647a; --pink: #cd579a; --blue: #5a93c6; --border: #d6e2ec; --paper: #fff; --soft: #faf6f1; }
* { box-sizing: border-box; }
html, body { margin: 0; color: var(--ink); font-family: Arial, Helvetica, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.guide-page { width: 100%; height: 196mm; display: flex; flex-direction: column; break-after: page; page-break-after: always; overflow: hidden; }
.guide-page:last-child { break-after: auto; page-break-after: auto; }
.page-header { height: 11mm; display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--border); }
.eyebrow { margin: 0 0 1mm; color: var(--pink); font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
.section-label { margin: 0; color: var(--muted); font-size: 8pt; }
.page-number { color: var(--blue); font-size: 10pt; font-weight: 700; }
.page-title-row { min-height: 22mm; display: flex; align-items: center; justify-content: space-between; gap: 8mm; padding: 2mm 0; }
h1 { margin: 0 0 1.5mm; font-size: 19pt; line-height: 1.1; }
.intro { max-width: 220mm; margin: 0; color: var(--muted); font-size: 9pt; line-height: 1.35; }
.sample-badge { flex: 0 0 auto; padding: 2mm 3mm; border: 1px solid #efd1e0; border-radius: 2mm; background: #fff6fa; color: #9b3970; font-size: 7.5pt; font-weight: 700; }
.page-content { min-height: 0; flex: 1; display: grid; grid-template-columns: minmax(0, 2.2fr) minmax(63mm, .8fr); gap: 5mm; }
.screenshot-frame { position: relative; min-width: 0; min-height: 0; align-self: start; aspect-ratio: var(--shot-ratio); margin: 0; overflow: hidden; border: 1px solid var(--border); border-radius: 2mm; background: var(--soft); box-shadow: 0 1mm 3mm rgba(26, 26, 46, .12); }
.screenshot-frame img { display: block; width: 100%; height: 100%; object-fit: contain; }
.arrow-layer { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.arrow-layer text { fill: white; font-size: 18px; font-weight: 700; font-family: Arial, sans-serif; }
.instructions { min-width: 0; padding: 4mm; border: 1px solid var(--border); border-radius: 2mm; background: #fbfcfe; }
.instructions h2 { margin: 0 0 2mm; color: var(--blue); font-size: 11pt; }
.instructions ol { margin: 0 0 4mm; padding-left: 5mm; }
.instructions li { margin: 0 0 2.4mm; padding-left: .5mm; font-size: 8.4pt; line-height: 1.35; }
.callout-title { margin-top: 4mm !important; padding-top: 3mm; border-top: 1px solid var(--border); }
.callout-list { list-style: none; padding: 0 !important; }
.callout-list li { display: grid; grid-template-columns: 6mm 1fr; align-items: start; gap: 2mm; margin-bottom: 2mm; padding: 0; }
.callout-number { display: inline-flex; width: 5mm; height: 5mm; align-items: center; justify-content: center; border-radius: 50%; background: var(--pink); color: white; font-size: 7pt; font-weight: 700; line-height: 1; }
.page-footer { height: 7mm; display: flex; align-items: flex-end; justify-content: space-between; padding-top: 1mm; color: var(--muted); font-size: 7pt; }
@media screen {
  body { padding: 10mm; background: #e8edf3; }
  .guide-page { max-width: 283mm; margin: 0 auto 10mm; padding: 0; background: white; box-shadow: 0 2mm 8mm rgba(26, 26, 46, .16); }
}
</style>
</head>
<body>
${pageMarkup}
</body>
</html>`;

await writeFile(path.join(docsDirectory, 'user-guide.html'), html, 'utf8');
console.log(`Generated docs/user-guide.html with ${pages.length} illustrated pages.`);
