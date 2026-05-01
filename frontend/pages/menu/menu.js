const grid = document.querySelector('.menu-grid');
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

let all = [];

function render(products) {
  grid.innerHTML = products.map(p => `
    <div class="card menu-card">
      <div class="menu-card__img-wrap">
        <img src="${esc(p.image_url || '/frontend/assets/product-placeholder.png')}" alt="${esc(p.name)}" class="menu-card__img ${p.image_url ? '' : 'menu-card__img--placeholder'}" />
        ${p.badge ? `<span class="badge menu-card__badge badge-accent">${esc(p.badge)}</span>` : ''}
      </div>
      <div class="menu-card__body">
        ${p.category ? `<span class="menu-card__category">${esc(p.category)}</span>` : ''}
        <div class="menu-card__row">
          <h3 class="menu-card__name">${esc(p.name)}</h3>
          <span class="menu-card__price">$${parseFloat(p.price).toFixed(2)}</span>
        </div>
        <p class="menu-card__desc">${esc(p.description || '')}</p>
        <button class="btn btn-outline menu-card__btn">Add to Bag</button>
      </div>
    </div>`).join('');
}

function sorted(products) {
  const val = document.getElementById('sort').value;
  const list = [...products];
  if (val === 'Price: Low to High')  list.sort((a, b) => a.price - b.price);
  if (val === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
  return list;
}

function filtered() {
  const active = document.querySelector('.menu-filter--active').textContent;
  return active === 'All Treats' ? all : all.filter(p => p.category === active);
}

function update() { render(sorted(filtered())); }

function initFilters(categories) {
  const container = document.querySelector('.menu-filters');
  container.innerHTML = ['All Treats', ...categories.map(c => c.name)]
    .map((name, i) => `<button class="menu-filter${i === 0 ? ' menu-filter--active' : ''}">${esc(name)}</button>`)
    .join('');
  container.querySelectorAll('.menu-filter').forEach(btn =>
    btn.addEventListener('click', () => {
      container.querySelectorAll('.menu-filter').forEach(b => b.classList.remove('menu-filter--active'));
      btn.classList.add('menu-filter--active');
      update();
    })
  );
}

Promise.all([
  fetch(API + '/products.php').then(r => r.json()),
  fetch(API + '/categories.php').then(r => r.json()),
]).then(([products, categories]) => {
  all = products;
  initFilters(categories);
  update();
});

document.getElementById('sort').addEventListener('change', update);
