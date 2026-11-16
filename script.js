const products = [
  {
    id: 1,
    name: 'The Sunday Shirt',
    category: 'tops',
    subtitle: 'Relaxed cotton poplin',
    price: 68,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    colors: ['Ivory', 'Sage', 'Stone'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A polished everyday shirt designed with an easy drape and a softly structured collar. Layer it over a tee or wear it tucked into trousers for an effortless, refined look.'
  },
  {
    id: 2,
    name: 'Everyday Linen Dress',
    category: 'dresses',
    subtitle: 'Soft washed linen',
    price: 112,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    colors: ['Sand', 'Berry', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An airy silhouette with an easy waist definition and a flattering midi length. The linen blend keeps it breathable and polished from day through evening.'
  },
  {
    id: 3,
    name: 'The Essential Knit',
    category: 'essentials',
    subtitle: 'A little extra cozy',
    price: 84,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    colors: ['Cream', 'Mocha', 'Charcoal'],
    sizes: ['S', 'M', 'L'],
    description: 'A soft knit with a clean neckline and a flattering relaxed fit. It is the one you reach for when you want understated comfort with a refined finish.'
  },
  {
    id: 4,
    name: 'The Weekender',
    category: 'tops',
    subtitle: 'Easy from day to night',
    price: 76,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    colors: ['Black', 'Stone', 'Oat'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A breathable, boxy top with subtle structure and a relaxed fit throughout the body. Ideal for effortless layering and comfortable styling.'
  },
  {
    id: 5,
    name: 'Soft Form Blouse',
    category: 'tops',
    subtitle: 'A touch of texture',
    price: 92,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    colors: ['Pearl', 'Rose', 'Ink'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'This blouse balances fluid movement with a subtly shaped silhouette. The texture gives it a collectible feel while still being easy to wear every day.'
  },
  {
    id: 6,
    name: 'The Daylight Dress',
    category: 'dresses',
    subtitle: 'Your go-to favorite',
    price: 128,
    badge: 'Editor pick',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    colors: ['Almond', 'Forest', 'Tobacco'],
    sizes: ['S', 'M', 'L'],
    description: 'A softly cinched midi dress that makes a statement without demanding attention. It moves beautifully and works from brunch to evening plans.'
  },
  {
    id: 7,
    name: 'Cloud Nine Cardigan',
    category: 'essentials',
    subtitle: 'Made for slower mornings',
    price: 98,
    badge: '',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    colors: ['Ivory', 'Mocha', 'Heather'],
    sizes: ['S', 'M', 'L'],
    description: 'A plush cardigan with a slightly boxy shape and a refined drape. Layer it over dresses, jeans, and knits for an elevated everyday uniform.'
  },
  {
    id: 8,
    name: 'The Little Layer',
    category: 'essentials',
    subtitle: 'The warm-weather essential',
    price: 54,
    badge: '',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    colors: ['Cream', 'Taupe', 'Sand'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A lightweight layer with a flattering open front and elevated finish. It slips on easily and brings instant polish to your look.'
  }
];

const cartKey = 'edoraCart';
const toast = document.getElementById('toast');

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  } catch (error) {
    return [];
  }
}

function setCart(items) {
  localStorage.setItem(cartKey, JSON.stringify(items));
}

function updateCartCount() {
  const countEls = document.querySelectorAll('#cartCount');
  const cartCount = getCart().length;
  countEls.forEach((el) => {
    el.textContent = String(cartCount);
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button class="quick-add" data-add="${product.id}" type="button">Add to bag</button>
      </div>
      <div class="product-body">
        <div class="product-name-row">
          <div>
            <div class="product-name">${product.name}</div>
            <p class="product-subtitle">${product.subtitle}</p>
          </div>
          <div class="price">$${product.price}</div>
        </div>
      </div>
    </article>
  `;
}

function renderHomeProducts() {
  const el = document.getElementById('homeProducts');
  if (!el) return;
  el.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
}

function renderShopProducts() {
  const el = document.getElementById('shopProducts');
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  const allButtons = document.querySelectorAll('.filter-btn');
  allButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === (category || 'all'));
  });

  let filtered = [...products];
  if (category && category !== 'all') {
    filtered = products.filter((product) => product.category === category);
  }

  const sortSelect = document.querySelector('.sort-select');
  const sortValue = sortSelect ? sortSelect.value : 'featured';
  if (sortValue === 'low-high') filtered.sort((a, b) => a.price - b.price);
  if (sortValue === 'high-low') filtered.sort((a, b) => b.price - a.price);

  const resultsText = document.getElementById('resultsCount');
  if (resultsText) {
    resultsText.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
  }

  el.innerHTML = filtered.map(renderProductCard).join('');
}

function renderProductDetail() {
  const el = document.getElementById('productDetail');
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id')) || 1;
  const product = products.find((item) => item.id === productId) || products[0];

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const relatedEl = document.getElementById('relatedProducts');
  if (relatedEl) relatedEl.innerHTML = related.map(renderProductCard).join('');

  el.innerHTML = `
    <div class="gallery-main">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail-copy">
      <p class="eyebrow">${product.category}</p>
      <h2>${product.name}</h2>
      <div class="product-price">$${product.price}</div>
      <p>${product.description}</p>

      <div class="option-group">
        <h3>Size</h3>
        <div class="size-options">
          ${product.sizes.map((size, index) => `<button class="size-option ${index === 0 ? 'active' : ''}" type="button">${size}</button>`).join('')}
        </div>
      </div>

      <div class="option-group">
        <h3>Color</h3>
        <div class="color-options">
          ${product.colors.map((color, index) => `<button class="color-option ${index === 0 ? 'active' : ''}" type="button">${color.slice(0, 2)}</button>`).join('')}
        </div>
      </div>

      <div class="product-details-actions">
        <button class="btn btn-primary" type="button" data-add="${product.id}">Add to bag</button>
        <a class="btn btn-secondary" href="shop.html">Continue shopping</a>
      </div>

      <ul class="meta-list">
        <li>Free shipping over $100</li>
        <li>Easy 30-day returns</li>
        <li>All orders packed in recycled packaging</li>
      </ul>
    </div>
  `;
}

function bindAddToCartEvents() {
  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add]');
    if (!addButton) return;

    const productId = Number(addButton.dataset.add);
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    const cart = getCart();
    cart.push(product);
    setCart(cart);
    updateCartCount();
    showToast(`${product.name} added to bag`);
  });
}

function bindFilterEvents() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const url = new URL(window.location.href);
      const nextFilter = button.dataset.filter || 'all';
      if (nextFilter === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', nextFilter);
      window.location.href = url.toString();
    });
  });
}

function bindSortEvents() {
  const sortSelect = document.querySelector('.sort-select');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', () => {
    renderShopProducts();
  });
}

function bindHeaderEvents() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const bagButtons = document.querySelectorAll('.bag-button');
  bagButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.location.href = 'shop.html';
    });
  });
}

function bindNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Thanks for joining Edora');
    form.reset();
  });
}

function bindContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Your message has been sent');
    form.reset();
  });
}

function init() {
  updateCartCount();
  renderHomeProducts();
  renderShopProducts();
  renderProductDetail();
  bindAddToCartEvents();
  bindFilterEvents();
  bindSortEvents();
  bindHeaderEvents();
  bindNewsletterForm();
  bindContactForm();
}

document.addEventListener('DOMContentLoaded', init);








































































































































































































































































`,