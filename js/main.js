/* ============ Kopi Nusantara — Interactions ============ */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Navbar scroll shadow ---------- */
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---------- Mobile menu ---------- */
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$('section[id]');
  const setActive = () => {
    const pos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop, bottom = top + sec.offsetHeight;
      const link = $(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', pos >= top && pos < bottom);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = $$('.section-head, .menu-card, .product-card, .testimonial-card, .about-image, .about-content, .contact-info, .contact-form');
  revealTargets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => io.observe(el));

  /* ---------- Currency format ---------- */
  const rupiah = n => 'Rp' + n.toLocaleString('id-ID');

  /* ---------- Cart ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('kn_cart')) || []; } catch (_) { cart = []; }

  const cartBtn = $('#cartBtn');
  const cartDrawer = $('#cartDrawer');
  const cartClose = $('#cartClose');
  const overlay = $('#overlay');
  const cartItemsEl = $('#cartItems');
  const cartCountEl = $('#cartCount');
  const cartTotalEl = $('#cartTotal');

  const saveCart = () => localStorage.setItem('kn_cart', JSON.stringify(cart));

  const renderCart = () => {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    cartCountEl.textContent = totalQty;
    if (!cart.length) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Keranjang masih kosong ☕</p>';
    } else {
      cartItemsEl.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
          <div>
            <div class="ci-name">${item.name}</div>
            <div class="ci-price">${rupiah(item.price)} × ${item.qty}</div>
          </div>
          <div class="ci-controls">
            <button class="ci-btn" data-act="dec" data-idx="${idx}" aria-label="Kurangi">−</button>
            <span>${item.qty}</span>
            <button class="ci-btn" data-act="inc" data-idx="${idx}" aria-label="Tambah">+</button>
            <button class="ci-remove" data-act="rm" data-idx="${idx}" aria-label="Hapus">🗑</button>
          </div>
        </div>`).join('');
    }
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartTotalEl.textContent = rupiah(total);
    saveCart();
  };

  const addToCart = (name, price) => {
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price: Number(price), qty: 1 });
    renderCart();
    showToast(`✔ "${name}" ditambahkan ke keranjang`);
  };

  cartItemsEl.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const idx = Number(btn.dataset.idx);
    const act = btn.dataset.act;
    if (act === 'inc') cart[idx].qty += 1;
    if (act === 'dec') { cart[idx].qty -= 1; if (cart[idx].qty <= 0) cart.splice(idx, 1); }
    if (act === 'rm') cart.splice(idx, 1);
    renderCart();
  });

  $$('[data-name][data-price]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.name, btn.dataset.price));
  });

  const openCart = () => { cartDrawer.classList.add('open'); overlay.classList.add('show'); };
  const closeCart = () => { cartDrawer.classList.remove('open'); overlay.classList.remove('show'); };
  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  $('#checkoutBtn').addEventListener('click', () => {
    if (!cart.length) { showToast('Keranjang masih kosong 😅'); return; }
    showToast('🎉 Terima kasih! Pesanan Anda sedang diproses.');
    cart = [];
    renderCart();
    closeCart();
  });

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  /* ---------- Forms ---------- */
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('✉️ Berhasil berlangganan! Cek email Anda.');
    e.target.reset();
  });
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('📨 Pesan terkirim! Kami akan segera menghubungi Anda.');
    e.target.reset();
  });

  renderCart();
})();
