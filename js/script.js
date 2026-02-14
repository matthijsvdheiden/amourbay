// script.js — Opgeschoonde en stabiele versie

// ===== Gebruiker =====
let username = localStorage.getItem('lastUser');
if (!username) {
  username = 'gast';
  localStorage.setItem('lastUser', username);
}

// ===== Winkelwagen =====
let cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];

// ===== Affiliate links =====
const affiliateLinks = {
  "Vibrator": "https://partner.example.com/vibrator",
  "Dildo": "https://partner.example.com/dildo",
  "Sexy Lingerie": "https://partner.example.com/sexy-lingerie",
  "Sexy Ondergoed Mannen": "https://partner.example.com/sexy-ondergoed-mannen",
  "Anaal Toys": "https://partner.example.com/anaal-toys",
  "Vibrerende Eitjes": "https://partner.example.com/vibrerende-eitjes",
  "Cockringen": "https://partner.example.com/cockringen",
  "Masturbators": "https://partner.example.com/masturbators",

  "Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/dutch-love-box-classic-edition?ref=MATTHIJSVANDERHEIDEN",
  "Dutch Love Box Premium Edition": "https://dutchlovebox.nl/products/dutch-love-box-premium-edition?ref=MATTHIJSVANDERHEIDEN",
  "Dutch Love Box Diamond Edition": "https://dutchlovebox.nl/products/dutch-love-box-diamond-edition?ref=MATTHIJSVANDERHEIDEN",
  "Create Your Own Box": "https://dutchlovebox.nl/products/create-your-own-box-nachtwacht-edition?ref=MATTHIJSVANDERHEIDEN",
  "Glijmiddel op waterbasis 50 ml": "https://dutchlovebox.nl/products/glijmiddel?ref=MATTHIJSVANDERHEIDEN",
  "Durex Orgasm Intense Condooms": "https://dutchlovebox.nl/products/durex-orgasm-intense-condooms?ref=MATTHIJSVANDERHEIDEN",
  "Whisper Flame Candle": "https://dutchlovebox.nl/products/whisper-flame-candle?ref=MATTHIJSVANDERHEIDEN",
  "Lovers Light": "https://dutchlovebox.nl/products/lovers-light?ref=MATTHIJSVANDERHEIDEN"
};

// ===== Helpers =====
function saveCart() {
  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
}

// ===== Voeg toe aan winkelwagen =====
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert(`${name} is toegevoegd aan je winkelwagen!`);
  showCart();
}

// ===== Toon winkelwagen =====
function showCart() {
  const cartDiv = document.getElementById('cart');
  const list = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('totalPrice') || document.getElementById('cart-subtotal');
  const emptyMessage = document.getElementById('empty-message');
  const checkoutButton = document.getElementById('checkoutButton');

  if (!cartDiv && !list) return; // Geen winkelwagen op deze pagina

  let total = 0;

  if (cartDiv) cartDiv.innerHTML = '';
  if (list) list.innerHTML = '';

  if (cart.length === 0) {
    if (cartDiv) cartDiv.innerHTML = "<p>Je winkelwagen is leeg.</p>";
    if (emptyMessage) emptyMessage.style.display = 'block';
    if (checkoutButton) checkoutButton.style.display = 'none';
    if (totalPriceElem) totalPriceElem.textContent = '';
    return;
  }

  if (emptyMessage) emptyMessage.style.display = 'none';
  if (checkoutButton) checkoutButton.style.display = 'inline-block';

  cart.forEach((item, index) => {
    total += item.price;

    const line = document.createElement('div');
    line.className = 'cart-item';
    line.innerHTML = `
      ${item.name} – €${item.price.toFixed(2)} 
      <button class="remove-btn" data-index="${index}">Verwijderen</button>
    `;

    if (cartDiv) cartDiv.appendChild(line);

    if (list) {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} – €${item.price.toFixed(2)} <button class="remove-btn" data-index="${index}">Verwijder</button>`;
      list.appendChild(li);
    }
  });

  if (totalPriceElem) totalPriceElem.textContent = `Totaal: €${total.toFixed(2)}`;

  // Verwijder-knoppen activeren
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'), 10);
      removeItem(index);
    });
  });
}

// ===== Verwijder item =====
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  showCart();
}

// ===== Leeg winkelwagen =====
function clearCart() {
  cart = [];
  saveCart();
  showCart();
}

// ===== Afrekenen =====
function checkout() {
  if (cart.length === 0) {
    alert("Je winkelwagen is leeg!");
    return;
  }

  cart.forEach(item => {
    const url = affiliateLinks[item.name];
    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn(`Geen affiliate link gevonden voor ${item.name}`);
    }
  });

  alert(`Bedankt ${username}, je wordt doorgestuurd naar onze partners!`);
  clearCart();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', function () {
  showCart();
});


