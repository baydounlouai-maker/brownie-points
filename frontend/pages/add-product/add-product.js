fetch(API + '/categories.php')
  .then(r => r.json())
  .then(cats => {
    const sel = document.getElementById('category');
    sel.innerHTML = '<option value="" disabled selected>Select Category</option>';
    cats.forEach(c => sel.append(new Option(c.name, c.id)));
  });

document.querySelector('.form').addEventListener('submit', async e => {
  e.preventDefault();
  const name  = document.getElementById('treat-name').value.trim();
  const price = document.getElementById('price').value.trim();
  const desc  = document.getElementById('description').value.trim();
  const category  = document.getElementById('category').value.trim();
  if (!name || !price || !desc || !category) { alert('Missing required fields.'); return; }
  const r = await fetch(API + '/products.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:        document.getElementById('treat-name').value,
      category_id: document.getElementById('category').value || null,
      price:       document.getElementById('price').value,
      description: document.getElementById('description').value,
      badge:       document.getElementById('badge').value || null,
      image_url:   document.getElementById('image-url').value || null,
    }),
  });
  if (r.ok) { e.target.reset(); alert('Product added!'); }
  else alert('Failed to add product.');
});
