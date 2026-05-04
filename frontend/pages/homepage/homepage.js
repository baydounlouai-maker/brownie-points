const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function renderSpecials(products) {
  const grid = document.getElementById('specials-grid');
  const [featured, ...rest] = products.slice(0, 3);

  const sideCards = rest.map(p => `
    <div class="card specials__card-h">
      <div class="specials__card-h-body">
        <div>
          ${p.badge ? `<div class="specials__card-h-badges"><span class="badge badge-accent">${esc(p.badge)}</span></div>` : ''}
          <h3 class="card-title">${esc(p.name)}</h3>
          <p class="card-desc">${esc(p.description || '')}</p>
          <span class="card-price">$${parseFloat(p.price).toFixed(2)}</span>
        </div>
        <img src="${esc(p.image_url || '')}" alt="${esc(p.name)}" class="specials__card-h-img" />
      </div>
    </div>`).join('');

  grid.innerHTML = `
    <div class="card specials__card-featured">
      <div class="specials__card-featured-img-wrap">
        <img src="${esc(featured.image_url || '')}" alt="${esc(featured.name)}" class="card-img specials__card-featured-img" />
        <div class="specials__card-featured-badges">
          ${featured.badge ? `<span class="badge badge-accent">${esc(featured.badge)}</span>` : ''}
          <span class="badge badge-dark">$${parseFloat(featured.price).toFixed(2)}</span>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${esc(featured.name)}</h3>
        <p class="card-desc">${esc(featured.description || '')}</p>
        <a href="/menu" class="btn specials__view-menu-btn">View Menu <span>→</span></a>
      </div>
    </div>
    <div class="specials__side">${sideCards}</div>`;
}

setTimeout(() => {
  fetch(API + '/products.php')
    .then(r => r.json())
    .then(products => renderSpecials(products));
}, 2000)

document.querySelector('.newsletter__form').addEventListener('submit', async e => {
  e.preventDefault();
  if (!document.querySelector('.newsletter__input').value.trim()) { alert('Email is required.'); return; }
  const note = document.querySelector('.newsletter__note');
  const r = await fetch(API + '/newsletter.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: document.querySelector('.newsletter__input').value }),
  });
  if (r.ok)              { e.target.reset(); note.textContent = "You're in! Check your inbox soon."; }
  else if (r.status === 409) note.textContent = 'Already subscribed.';
  else                       note.textContent = 'Something went wrong. Try again.';
});
