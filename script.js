/* ==========================================================================
   ZENVORA SHOOP - Main Script (Pure Vanilla JS)
   Brand: ZENVORA SHOOP | WhatsApp: 03232974451
   ========================================================================== */

/* ==========================================================================
   PERMANENT STOCK SYSTEM REMOVAL & DEFENSIVE GUARDS
   - Completely removes all Out of Stock checks, validations, and messages.
   - All products are unconditionally available with unrestricted quantities.
   - Intercepts and suppresses any legacy or external out-of-stock messages.
   ========================================================================== */
(function initializeStockRemovalGuards() {
  // 1. Purge any legacy stock keys or cache flags from localStorage/sessionStorage
  try {
    const removeKeys = (storage) => {
      if (!storage) return;
      const toDelete = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && /stock|inventory|outofstock/i.test(key)) {
          toDelete.push(key);
        }
      }
      toDelete.forEach(k => storage.removeItem(k));
    };
    removeKeys(window.localStorage);
    removeKeys(window.sessionStorage);
  } catch (e) {}

  // 2. Intercept and suppress window.alert if any legacy script attempts to show out-of-stock
  if (typeof window !== 'undefined' && typeof window.alert === 'function') {
    const nativeAlert = window.alert;
    window.alert = function (message) {
      if (typeof message === 'string' && /out of stock|outofstock|stock limit|sorry/i.test(message)) {
        console.warn('Suppressed out-of-stock alert:', message);
        return;
      }
      return nativeAlert.apply(this, arguments);
    };
  }

  // 3. Proactively clean up any legacy Service Worker registrations or caches
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => reg.unregister().catch(() => {}));
    }).catch(() => {});
  }
  if (typeof window !== 'undefined' && 'caches' in window) {
    caches.keys().then(keys => {
      keys.forEach(key => caches.delete(key).catch(() => {}));
    }).catch(() => {});
  }
})();

/* ==========================================================================
   FEATURE 1: SOCIAL PROOF NOTIFICATIONS (EDITABLE DEMO DATA)
   Instructions: You can freely add, edit, or remove items in this array.
   Notifications rotate every 6-8 seconds automatically on the homepage.
   ========================================================================== */
const socialProofNotifications = [
  {
    name: "Muskan",
    location: "Karachi",
    product: "Turquoise Block Printed 3Pcs Maxi Set",
    image: "arabic-lawn.png.jpeg",
    time: "4 minutes ago"
  },
  {
    name: "Nimra",
    location: "DHA Phase 6, Karachi",
    product: "Wash & Wear Men's Plain Suit (Brown)",
    image: "men-wash-&-wear-plain-suit-brown.png.jpeg",
    time: "8 minutes ago"
  },
  {
    name: "Laiba",
    location: "PECHS, Karachi",
    product: "Girl's Leather Textured Hand Bag",
    image: "girl-leather-textured-hand-bag.png.jpeg",
    time: "14 minutes ago"
  },
  {
    name: "Bilal",
    location: "Bahria Town, Karachi",
    product: "Men's Grey Wash & Wear Kurta Suit",
    image: "mens-grey.png.jpeg",
    time: "19 minutes ago"
  },
  {
    name: "Eman",
    location: "Gulshan-e-Iqbal, Karachi",
    product: "Printed Lawn 3-Piece Suit (Multicolor)",
    image: "printed-lawn-3.png.jpeg",
    time: "26 minutes ago"
  },
  {
    name: "Kinza",
    location: "Clifton, Karachi",
    product: "Orange Cross-Strap Rexine Slides",
    image: "orange-cross-strap-rexine-slides-for-women.png",
    time: "33 minutes ago"
  },
  {
    name: "Anika",
    location: "North Nazimabad, Karachi",
    product: "Women White Rexine Fancy Slippers",
    image: "women-white-rexine-fancy-slippers.jpeg",
    time: "41 minutes ago"
  }
];

/* ==========================================================================
   FEATURE 2: HAPPY CUSTOMERS REVIEWS (EDITABLE CUSTOMER REVIEWS)
   Instructions: You can easily update this array with your real reviews.
   Review cards display on desktop (3-4 at a time) and mobile (slider).
   ========================================================================== */
const customerReviews = [
  {
    name: "Ayesha Khan",
    location: "Clifton, Karachi",
    rating: 5,
    review: "Amazing quality and exactly as shown in the pictures. The Arabic Lawn fabric is so soft, breathable, and gracefully draped. Really satisfied with my order.",
    image: "arabic-lawn.png.jpeg"
  },
  {
    name: "Hamza Tariq",
    location: "DHA Phase 6, Karachi",
    rating: 5,
    review: "Ordered the Wash & Wear men's suit fabric for office wear. Wrinkle-resistant, elegant drape, and top-tier texture. Cash on delivery was swift and seamless.",
    image: "men-wash-&-wear-plain-suit-brown.png.jpeg"
  },
  {
    name: "Fatima Zahra",
    location: "PECHS, Karachi",
    rating: 5,
    review: "The textured leather shoulder bag looks even more luxurious in person! Sturdy gold hardware, roomy compartments, and meticulous stitching. 100% recommended!",
    image: "girl-leather-textured-shoulder-bag.jpeg"
  },
  {
    name: "Bilal Ahmed",
    location: "Gulshan-e-Iqbal, Karachi",
    rating: 5,
    review: "The cotton unstitched suit is ideal for summer heat. Light, premium finish, and prompt dispatch right to my doorstep. Smooth ordering via WhatsApp.",
    image: "men-cotton-unstitched-suit-light-brown-summer.png.jpeg"
  },
  {
    name: "Mahnoor Siddiqui",
    location: "Bahria Town, Karachi",
    rating: 5,
    review: "The cotton lawn colors remained completely vibrant after washing. Authentic Pakistani craftsmanship and highly responsive WhatsApp customer care.",
    image: "cotton-lawn.png.jpeg"
  },
  {
    name: "Zainab Malik",
    location: "North Nazimabad, Karachi",
    rating: 5,
    review: "Super comfortable footwear and slides! Pure rexine material with soft cushion soles. Perfect fitting, exactly as ordered and great value for money.",
    image: "orange-cross-strap-rexine-slides-for-women.png"
  },
  {
    name: "Usman Ghani",
    location: "Tariq Road, Karachi",
    rating: 5,
    review: "Outstanding quality men's kurta suit SW-2. Crisp wash-and-wear fabric that looks sharp all day. Cash on delivery courier was polite and fast.",
    image: "mens-grey.png.jpeg"
  },
  {
    name: "Hira Farooq",
    location: "Gulistan-e-Johar, Karachi",
    rating: 5,
    review: "I received the printed lawn 3-piece set today. The dupatta and print border are even prettier than the photos! Thank you ZENVORA SHOOP for genuine service.",
    image: "printed-lawn-3.png.jpeg"
  }
];

// --- Global Toast Notification Helper ---
function showToast(message, type = 'success') {
  // Never display any out-of-stock messages or stock-related alerts
  if (typeof message === 'string' && /out of stock|outofstock|stock/i.test(message)) {
    return;
  }

  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✓';
  if (type === 'danger') icon = '✕';
  if (type === 'warning') icon = '⚠';

  toast.innerHTML = `<span style="font-size: 1.1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// --- Mobile Hamburger Menu & Drawer ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.querySelector('.navbar');

  if (hamburger && navMenu) {
    // Ensure .mobile-nav-header with close button exists
    if (!navMenu.querySelector('.mobile-nav-header')) {
      const headerLi = document.createElement('li');
      headerLi.className = 'mobile-nav-header';
      headerLi.innerHTML = `
        <span class="mobile-nav-title">ZENVORA <span>SHOOP</span></span>
        <button type="button" class="mobile-nav-close" id="mobile-nav-close" aria-label="Close navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      navMenu.insertBefore(headerLi, navMenu.firstChild);
    }

    const openMenu = () => {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close navigation menu');
    };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open navigation menu');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button (X) inside top-right of mobile menu
    navMenu.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.mobile-nav-close');
      if (closeBtn) {
        e.stopPropagation();
        closeMenu();
      }
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close when clicking outside menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu if window is resized to laptop/desktop breakpoint (1024px+)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && navMenu.classList.contains('active')) {
        closeMenu();
      }
    }, { passive: true });
  }

  // Sticky Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // --- Category Filtering (on index.html) ---
  initCategoryFilter();

  // --- Product Quick Add Buttons on Grid ---
  initQuickAddButtons();

  // --- Original Testimonials Slider ("What Our Customers Say") ---
  initTestimonialsSlider();

  // --- Happy Customers Reviews Slider ("HAPPY CUSTOMERS ❤️") ---
  initHappyCustomersReviews();

  // --- Recent Activity / Purchase Notification Popup ---
  initSocialProofNotifications();

  // --- Customer Review Photo Lightbox ---
  initReviewLightbox();

  // --- FAQ Accordion ---
  initFaqAccordion();
});

// Category filtering logic
function initCategoryFilter() {
  const filterButtons = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterButtons.length || !productCards.length) return;

  const normalize = (value) =>
    String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');

  function applyCategory(category, updateHash = false) {
    const selected = normalize(category);

    filterButtons.forEach((button) => {
      button.classList.toggle(
        'active',
        normalize(button.dataset.category) === selected
      );
    });

    productCards.forEach((card) => {
      const cardCategory = normalize(card.getAttribute('data-category'));
      const isNew = normalize(card.getAttribute('data-new')) === 'true';

      let show = false;

      switch (selected) {
        case 'all':
          show = true;
          break;
        case 'new-arrivals':
          show = isNew;
          break;
        case 'ladies suits':
          show = cardCategory === 'ladies suits';
          break;
        case 'gents suits':
          show = cardCategory === 'gents suits';
          break;
        case 'shoes':
          show = cardCategory === 'shoes';
          break;
        case 'sandals':
          show = cardCategory === 'sandals';
          break;
        default:
          show = cardCategory === selected;
      }

      card.hidden = !show;
      card.style.display = show ? '' : 'none';
      card.classList.toggle('category-hidden', !show);
    });

    if (updateHash) {
      history.replaceState(
        null,
        '',
        '#products?category=' + encodeURIComponent(category)
      );
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      applyCategory(button.dataset.category || 'all', true);
    });
  });

  // Support direct links such as:
  // index.html?category=ladies%20suits
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  const hashParams = hash.includes('?')
    ? new URLSearchParams(hash.split('?')[1])
    : null;

  const requested =
    params.get('category') ||
    (hashParams ? hashParams.get('category') : null);

  if (requested) {
    const match = Array.from(filterButtons).find(
      (button) =>
        normalize(button.dataset.category) === normalize(requested)
    );

    if (match) {
      applyCategory(match.dataset.category, false);
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);
      return;
    }
  }

  // Initial state
  applyCategory('all', false);
}
// Quick Add to Cart button from Index Grid cards
function initQuickAddButtons() {
  const quickAddButtons = document.querySelectorAll('.btn-quick-add');
  quickAddButtons.forEach(btn => {
    if (btn.dataset.quickAddBound) return;
    btn.dataset.quickAddBound = 'true';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = Number(btn.getAttribute('data-price'));
      const image = btn.getAttribute('data-image');
      const category = btn.getAttribute('data-category');
      const url = btn.getAttribute('data-url');

      if (typeof window.addToCart !== 'function') {
        console.error('ZENVORA: cart.js did not load. Check cart.js path/deployment.');
        showToast('Cart system could not load. Please refresh the page.', 'danger');
        return;
      }

      window.addToCart({
        id,
        name,
        price,
        image,
        category,
        url,
        size: 'Standard',
        color: 'Standard'
      }, 1);
    });
  });
}

// --- Product Detail Page Initializer ---
function initProductDetailPage(config) {
  const {
    id,
    name,
    price,
    originalPrice,
    category,
    images = [],
    sizes = [],
    colors = [],
    description = '',
    url = window.location.pathname.split('/').pop() || 'product.html'
  } = config;

  let selectedSize = sizes.length > 0 ? sizes[0] : 'Standard';
  let selectedColor = colors.length > 0 ? colors[0].name : 'Standard';
  let selectedColorImage = colors.length > 0 && colors[0].image ? colors[0].image : (images[0] || '');
  let selectedQty = 1;

  // Cache product controls before attaching handlers.
  // These were previously referenced without being declared, which stopped
  // product-page initialization before the Add to Cart handler was attached.
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyInput = document.getElementById('product-qty-input') || document.getElementById('quantity-input');
  const addToCartBtn = document.getElementById('btn-add-to-cart');
  const buyNowBtn = document.getElementById('btn-buy-now');

  // 1. Populate UI text
  const titleEl = document.getElementById('product-title');
  if (titleEl) titleEl.textContent = name;

  const categoryEl = document.getElementById('product-category');
  if (categoryEl) categoryEl.textContent = category;

  const priceEl = document.getElementById('product-price');
  if (priceEl) priceEl.textContent = 'Rs. ' + Number(price).toLocaleString('en-PK');

  const oldPriceEl = document.getElementById('product-old-price');
  if (oldPriceEl) {
    if (originalPrice && originalPrice > price) {
      oldPriceEl.textContent = 'Rs. ' + Number(originalPrice).toLocaleString('en-PK');
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  const descEl = document.getElementById('product-description');
  if (descEl) descEl.textContent = description;

  // 2. Image Gallery Setup
  const mainImage = document.getElementById('gallery-main-img');
  const thumbnailsContainer = document.getElementById('gallery-thumbnails');

  if (mainImage && images.length > 0) {
    mainImage.src = images[0];
    mainImage.alt = name;
  }

  if (thumbnailsContainer && images.length > 0) {
    thumbnailsContainer.innerHTML = '';
    images.forEach((imgSrc, index) => {
      const thumbBtn = document.createElement('button');
      thumbBtn.className = `thumbnail-btn ${index === 0 ? 'active' : ''}`;
      thumbBtn.type = 'button';
      thumbBtn.innerHTML = `<img src="${imgSrc}" alt="${name} view ${index + 1}" onerror="this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80'">`;
      
      thumbBtn.addEventListener('click', () => {
        document.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('active'));
        thumbBtn.classList.add('active');
        if (mainImage) {
          mainImage.style.opacity = '0.4';
          setTimeout(() => {
            mainImage.src = imgSrc;
            mainImage.style.opacity = '1';
          }, 150);
        }
      });

      thumbnailsContainer.appendChild(thumbBtn);
    });
  }

  // 4. Size Selector Setup
  const sizeContainer = document.getElementById('size-selector-container');
  const selectedSizeLabel = document.getElementById('selected-size-label');
  if (sizeContainer && sizes.length > 0) {
    sizeContainer.innerHTML = '';
    sizes.forEach((sizeOption, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `size-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = sizeOption;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = sizeOption;
        if (selectedSizeLabel) selectedSizeLabel.textContent = sizeOption;
      });

      sizeContainer.appendChild(btn);
    });
    if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
  }

  // 5. Color Selector Setup
  const colorContainer = document.getElementById('color-selector-container');
  const selectedColorLabel = document.getElementById('selected-color-label');
  if (colorContainer && colors.length > 0) {
    colorContainer.innerHTML = '';
    colors.forEach((col, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `color-swatch-btn ${idx === 0 ? 'active' : ''}`;
      btn.style.backgroundColor = col.hex || '#000000';
      btn.title = col.name;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = col.name;
        selectedColorImage = col.image || images[0] || '';
        if (selectedColorLabel) selectedColorLabel.textContent = col.name;

        // If a color has its own product image (e.g. handbags), show it immediately.
        if (mainImage && col.image) {
          mainImage.style.opacity = '0.4';
          setTimeout(() => {
            mainImage.src = col.image;
            mainImage.alt = `${name} - ${col.name}`;
            mainImage.style.opacity = '1';
          }, 120);
        }
      });

      colorContainer.appendChild(btn);
    });
    if (selectedColorLabel) selectedColorLabel.textContent = selectedColor;
  }
  // 6. Quantity Handler (Supports any quantity without stock limitation or maximum restrictions)
  if (qtyMinus && qtyPlus && qtyInput) {
    qtyInput.removeAttribute('readonly');
    qtyInput.setAttribute('type', 'number');
    qtyInput.setAttribute('min', '1');
    qtyInput.removeAttribute('max');

    const syncQtyFromInput = () => {
      let val = parseInt(qtyInput.value, 10);
      if (!isNaN(val) && val >= 1) {
        selectedQty = val;
      }
    };

    qtyMinus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value, 10) || selectedQty || 1;
      if (currentVal > 1) {
        selectedQty = currentVal - 1;
        qtyInput.value = selectedQty;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let currentVal = parseInt(qtyInput.value, 10) || selectedQty || 1;
      selectedQty = currentVal + 1;
      qtyInput.value = selectedQty;
    });

    qtyInput.addEventListener('input', syncQtyFromInput);
    qtyInput.addEventListener('change', () => {
      syncQtyFromInput();
      let val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) {
        selectedQty = 1;
        qtyInput.value = '1';
      }
    });
  }

  // 7. Add to Cart Handler (Zero stock limitations)
  if (addToCartBtn && !addToCartBtn.dataset.bound) {
    addToCartBtn.dataset.bound = 'true';
    addToCartBtn.addEventListener('click', () => {
      // Ensure latest quantity is read from input if customer typed directly
      if (qtyInput) {
        let typedVal = parseInt(qtyInput.value, 10);
        if (!isNaN(typedVal) && typedVal >= 1) selectedQty = typedVal;
      }

      const productPayload = {
        id,
        name,
        price: Number(price),
        image: selectedColorImage || (images.length > 0 ? images[0] : ''),
        category,
        size: selectedSize,
        color: selectedColor,
        url
      };

      addToCart(productPayload, selectedQty);
    });
  }

  // 8. Buy Now Handler (Zero stock limitations; saves to localStorage and redirects to cart.html)
  if (buyNowBtn && !buyNowBtn.dataset.bound) {
    buyNowBtn.dataset.bound = 'true';
    buyNowBtn.addEventListener('click', () => {
      if (typeof addToCart !== 'function') {
        showToast('Cart system could not be loaded. Please refresh the page.', 'danger');
        console.error('addToCart() is not available. Make sure cart.js is loaded before script.js.');
        return;
      }

      // Ensure latest quantity is read from input if customer typed directly
      if (qtyInput) {
        let typedVal = parseInt(qtyInput.value, 10);
        if (!isNaN(typedVal) && typedVal >= 1) selectedQty = typedVal;
      }

      const productPayload = {
        id: String(id),
        name: String(name),
        price: Number(price),
        image: selectedColorImage || (images.length > 0 ? images[0] : ''),
        category: String(category || 'Fashion'),
        size: selectedSize || 'Standard',
        color: selectedColor || 'Standard',
        url: url || (window.location.pathname.split('/').pop() || 'index.html')
      };

      const success = addToCart(productPayload, selectedQty);

      if (success) {
        window.location.href = 'cart.html';
      }
    });
  }

  // 9. Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${target}`);
      if (activePane) activePane.classList.add('active');
    });
  });
}

// Utility function to escape HTML
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ==========================================================================
// 1. EXISTING SECTION: WHAT OUR CUSTOMERS SAY (ORIGINAL TESTIMONIALS SLIDER)
// ==========================================================================
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev-btn');
  const nextBtn = document.getElementById('testimonial-next-btn');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  // Build pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
      dot.addEventListener('click', () => {
        const targetCard = cards[idx];
        if (targetCard) {
          track.scrollTo({
            left: targetCard.offsetLeft - track.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  const updateControls = () => {
    const scrollLeft = track.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const distance = Math.abs((card.offsetLeft - track.offsetLeft) - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIndex);
      });
    }

    if (prevBtn) {
      prevBtn.disabled = track.scrollLeft <= 10;
    }
    if (nextBtn) {
      const maxScroll = track.scrollWidth - track.clientWidth - 10;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    }
  };

  let scrollTimeout = null;
  track.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(updateControls);
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const card = cards[0];
      const step = card ? card.offsetWidth + 20 : 300;
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const card = cards[0];
      const step = card ? card.offsetWidth + 20 : 300;
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  updateControls();
  window.addEventListener('resize', updateControls, { passive: true });
}

// ==========================================================================
// 2. NEW SECTION: HAPPY CUSTOMERS ❤️ (CUSTOMER REVIEWS & SCREENSHOTS)
// ==========================================================================
function initHappyCustomersReviews() {
  const track = document.getElementById('reviews-track');
  const prevBtn = document.getElementById('review-prev-btn');
  const nextBtn = document.getElementById('review-next-btn');
  const dotsContainer = document.getElementById('review-dots');

  if (!track) return;

  // Render review cards dynamically from the customerReviews array
  if (Array.isArray(customerReviews) && customerReviews.length > 0) {
    track.innerHTML = customerReviews.map((item, idx) => {
      // Calculate initials (e.g., "Ayesha Khan" -> "AK")
      const nameParts = (item.name || 'Customer').trim().split(/\s+/);
      const initials = nameParts.length > 1
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : (nameParts[0] ? nameParts[0].slice(0, 2).toUpperCase() : 'CU');

      const ratingCount = Math.max(1, Math.min(5, Number(item.rating) || 5));
      const stars = '★'.repeat(ratingCount);

      // Photo block if an image is provided
      const photoHtml = item.image ? `
        <div class="review-photo-wrap" data-img="${escapeHtml(item.image)}" data-caption="Review from ${escapeHtml(item.name)}, ${escapeHtml(item.location)}" title="Click to enlarge customer photo">
          <img src="${escapeHtml(item.image)}" alt="Review Photo from ${escapeHtml(item.name)}" class="review-photo-img" loading="lazy" onerror="this.parentElement.style.display='none'">
          <span class="review-photo-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Customer Photo
          </span>
        </div>
      ` : '';

      return `
        <article class="review-card" data-index="${idx}">
          <div class="review-card-content">
            <div class="review-card-header">
              <div class="review-rating" aria-label="${ratingCount} out of 5 stars">
                ${stars}
              </div>
              <span class="review-verified-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified Buyer
              </span>
            </div>
            <p class="review-text">"${escapeHtml(item.review)}"</p>
            ${photoHtml}
          </div>
          <div class="review-author-footer">
            <div class="review-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
            <div class="review-author-meta">
              <h3 class="review-author-name">${escapeHtml(item.name)}</h3>
              <span class="review-author-location">📍 ${escapeHtml(item.location)}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  const cards = track.querySelectorAll('.review-card');
  if (!cards.length) return;

  // Build pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `review-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('type', 'button');
      dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
      dot.addEventListener('click', () => {
        const targetCard = cards[idx];
        if (targetCard) {
          track.scrollTo({
            left: targetCard.offsetLeft - track.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Update button states & active dot indicator
  const updateControls = () => {
    const scrollLeft = track.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const distance = Math.abs((card.offsetLeft - track.offsetLeft) - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.review-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === closestIndex);
      });
    }

    if (prevBtn) {
      prevBtn.disabled = track.scrollLeft <= 10;
    }
    if (nextBtn) {
      const maxScroll = track.scrollWidth - track.clientWidth - 10;
      nextBtn.disabled = track.scrollLeft >= maxScroll;
    }
  };

  let scrollTimeout = null;
  track.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(updateControls);
  }, { passive: true });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const card = cards[0];
      const step = card ? card.offsetWidth + 20 : 320;
      track.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const card = cards[0];
      const step = card ? card.offsetWidth + 20 : 320;
      track.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  // Attach lightbox preview click to review photos
  track.querySelectorAll('.review-photo-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const imgSrc = wrap.getAttribute('data-img');
      const caption = wrap.getAttribute('data-caption') || 'Customer Review Photo';
      if (imgSrc && typeof openReviewLightbox === 'function') {
        openReviewLightbox(imgSrc, caption);
      }
    });
  });

  updateControls();
  window.addEventListener('resize', updateControls, { passive: true });
}

// ==========================================================================
// FEATURE 1: SOCIAL PROOF NOTIFICATIONS FLOATING POPUP
// ==========================================================================
function initSocialProofNotifications() {
  const container = document.getElementById('social-proof-toast');
  if (!container) return;
  if (!Array.isArray(socialProofNotifications) || socialProofNotifications.length === 0) return;

  let availableIndices = [];
  let lastIndex = -1;
  let rotationTimer = null;
  let hideTimer = null;
  let isHovered = false;
  let isDismissed = false;

  // Non-repeating randomized shuffle bag
  function getNextNotification() {
    if (socialProofNotifications.length === 1) {
      return socialProofNotifications[0];
    }

    if (availableIndices.length === 0) {
      availableIndices = Array.from({ length: socialProofNotifications.length }, (_, i) => i);
      // Fisher-Yates shuffle
      for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
      }
      // Ensure the first item in the new bag isn't the same as the last shown
      if (availableIndices[0] === lastIndex && availableIndices.length > 1) {
        const temp = availableIndices[0];
        availableIndices[0] = availableIndices[availableIndices.length - 1];
        availableIndices[availableIndices.length - 1] = temp;
      }
    }

    const nextIndex = availableIndices.shift();
    lastIndex = nextIndex;
    return socialProofNotifications[nextIndex];
  }

  function hideNotification(callback) {
    container.classList.remove('visible');
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    // Wait for the slide-down / fade-out transition (400ms)
    setTimeout(() => {
      if (callback) callback();
    }, 400);
  }

  function showNextNotification() {
    if (isDismissed || isHovered) return;

    hideNotification(() => {
      if (isDismissed || isHovered) return;

      const item = getNextNotification();
      if (!item) return;

      const buyerLocation = item.location ? escapeHtml(item.location) : 'Karachi';
      const productName = item.product ? escapeHtml(item.product) : 'Product';
      const timeText = item.time ? escapeHtml(item.time) : 'A few minutes ago';
      const imgSrc = item.image ? escapeHtml(item.image) : 'arabic-lawn.png.jpeg';

      container.innerHTML = `
        <div class="sp-toast-card">
          <button type="button" class="sp-toast-close" id="sp-toast-close-btn" aria-label="Dismiss notification">&times;</button>
          <div class="sp-toast-thumb-wrap">
            <img src="${imgSrc}" alt="${productName}" class="sp-toast-thumb" loading="lazy" onerror="this.src='icon-192.png'">
          </div>
          <div class="sp-toast-body">
            <div class="sp-toast-top">
              <span>🛍️</span>
              <span>Customer from ${buyerLocation}</span>
            </div>
            <div class="sp-toast-action">Recently purchased</div>
            <div class="sp-toast-product" title="${productName}">${productName}</div>
            <div class="sp-toast-meta">
              <span>${timeText}</span>
              <span class="sp-toast-verified">• Verified Order</span>
            </div>
          </div>
        </div>
      `;

      // Wire close X button
      const closeBtn = container.querySelector('#sp-toast-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          hideNotification();
          isDismissed = true;
          // Temporarily pause notifications for 45s after user dismisses
          setTimeout(() => {
            isDismissed = false;
          }, 45000);
        });
      }

      // Smooth slide-in and fade-in
      container.classList.add('visible');

      // Stay visible for 4.2 seconds, then fade out
      hideTimer = setTimeout(() => {
        if (!isHovered) {
          hideNotification();
        }
      }, 4200);
    });
  }

  // Desktop hover pause & resume
  container.addEventListener('mouseenter', () => {
    isHovered = true;
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    // Resume hiding after 2.5s on mouseleave
    if (container.classList.contains('visible')) {
      hideTimer = setTimeout(() => {
        hideNotification();
      }, 2500);
    }
  });

  // Initial delay of 3 seconds before first notification appears
  setTimeout(() => {
    showNextNotification();
    // Rotate every 7 seconds (within the 6-8 second requirement)
    rotationTimer = setInterval(() => {
      if (!isDismissed && !isHovered) {
        showNextNotification();
      }
    }, 7000);
  }, 3000);
}

// ==========================================================================
// CUSTOMER REVIEW PHOTO LIGHTBOX PREVIEW
// ==========================================================================
let openReviewLightbox = null;

function initReviewLightbox() {
  const modal = document.getElementById('review-lightbox');
  const img = document.getElementById('review-lightbox-img');
  const caption = document.getElementById('review-lightbox-caption');
  const backdrop = document.getElementById('review-lightbox-backdrop');
  const closeBtn = document.getElementById('review-lightbox-close');

  if (!modal || !img) return;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openReviewLightbox = function(src, captionText) {
    img.src = src;
    img.alt = captionText || 'Customer Review Photo';
    if (caption) caption.textContent = captionText || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

// FAQ Accordion functionality
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close all other items (only one open at a time)
      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');

          otherItem.classList.remove('active');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) {
            otherAns.style.maxHeight = '0px';
            otherAns.style.opacity = '0';
          }
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      // Toggle current item
      if (isCurrentlyActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        if (icon) icon.textContent = '+';
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
        if (icon) icon.textContent = '−';
      }
    });
  });

  // Responsive: dynamically adjust maxHeight on window resize if an item is active
  window.addEventListener('resize', () => {
    const activeItem = accordion.querySelector('.faq-item.active');
    if (activeItem) {
      const activeAns = activeItem.querySelector('.faq-answer');
      if (activeAns) {
        activeAns.style.maxHeight = activeAns.scrollHeight + 'px';
      }
    }
  }, { passive: true });
}


