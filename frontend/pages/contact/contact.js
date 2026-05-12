document.querySelector('.form').addEventListener('submit', async e => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) { alert('All fields are required.'); return; }
  const r = await fetch(API + '/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:    document.getElementById('name').value,
      email:   document.getElementById('email').value,
      message: document.getElementById('message').value,
    }),
  });
  if (r.ok) { e.target.reset(); alert('Message sent!'); }
  else alert('Failed to send message.');
});
