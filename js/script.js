// script.js — Universele en foutvrije versie

let username = localStorage.getItem('lastUser') || prompt("Wat is je naam?");
if (!username) username = 'gast';
localStorage.setItem('lastUser', username);

let cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];

// Affiliate links (voeg hier later meer toe)
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
  "Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/create-your-own-box-nachtwacht-edition?ref=MATTHIJSVANDERHEIDEN",
  "Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/glijmiddel?ref=MATTHIJSVANDERHEIDEN",
   "Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/durex-orgasm-intense-condooms?ref=MATTHIJSVANDERHEIDEN",
"Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/whisper-flame-candle?ref=MATTHIJSVANDERHEIDEN",
"Dutch Love Box Classic Edition": "https://dutchlovebox.nl/products/lovers-light?ref=MATTHIJSVANDERHEIDEN"

};

// Voeg item toe aan winkelwagen
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  alert(`${name} is toegevoegd aan je winkelwagen!`);
  showCart();
}

// Toon winkelwagen (werkt met beide layouts)
function showCart() {
  const cartDiv = document.getElementById('cart');
  const list = document.getElementById('cart-items');
  const totalPriceElem = document.getElementById('totalPrice') || document.getElementById('cart-subtotal');
  const emptyMessage = document.getElementById('empty-message');
  const checkoutButton = document.getElementById('checkoutButton');

  if (!cartDiv && !list) return; // Geen winkelwagen op deze pagina

  let total = 0;

  // Leegmaken oude inhoud
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

  // Items tonen
  cart.forEach((item, index) => {
    total += item.price;

    const line = document.createElement('div');
    line.className = 'cart-item';
    line.innerHTML = `
      ${item.name} – €${item.price.toFixed(2)} 
      <button onclick="removeItem(${index})" class="remove-btn">Verwijderen</button>
    `;

    if (cartDiv) cartDiv.appendChild(line);

    // Ondersteuning voor UL-layout (winkelwagen met <li>)
    if (list) {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} – €${item.price.toFixed(2)} <button class="remove-btn" onclick="removeItem(${index})">Verwijder</button>`;
      list.appendChild(li);
    }
  });

  if (totalPriceElem) totalPriceElem.textContent = `Totaal: €${total.toFixed(2)}`;
}

// Verwijder item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  showCart();
}

// Winkelwagen leegmaken
function clearCart() {
  cart = [];
  saveCart();
  showCart();
}

// Afrekenen
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

// Opslaan
function saveCart() {
  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
}

// Winkelwagen tonen bij laden
document.addEventListener('DOMContentLoaded', showCart);



