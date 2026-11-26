// ================================================
// API: CheapShark
// https://apidocs.cheapshark.com — gratis, sin key
// Endpoint: /api/1.0/deals?storeID=1&pageSize=8&sortBy=Metacritic
// storeID=1 → Steam
// ================================================
const API_URL = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=8&sortBy=Metacritic';
const PRECIO_DIA = 50;

const catalogo = document.getElementById('catalogo');

// Respaldo por si falla la API
const JUEGOS_RESPALDO = [
  { title: 'The Witcher 3', metacriticScore: '93' },
  { title: 'Portal 2', metacriticScore: '95' },
  { title: 'Half-Life 2', metacriticScore: '96' },
  { title: 'Hades', metacriticScore: '93' },
  { title: 'Celeste', metacriticScore: '92' },
  { title: 'Stardew Valley', metacriticScore: '89' },
  { title: 'Doom Eternal', metacriticScore: '87' },
  { title: 'Hollow Knight', metacriticScore: '87' }
];

function crearTarjeta(juego) {
  const card = document.createElement('div');
  card.className = 'tarjeta';

  // Imagen: Steam CDN o thumb de CheapShark
  const imagenURL = juego.steamAppID
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${juego.steamAppID}/header.jpg`
    : juego.thumb;

  const img = document.createElement('img');
  img.alt = juego.title;
  img.src = imagenURL || '';
  img.onerror = () => { if (juego.thumb && img.src !== juego.thumb) img.src = juego.thumb; };
  card.appendChild(img);

  const h3 = document.createElement('h3');
  h3.textContent = juego.title || 'Sin título';
  card.appendChild(h3);

  const score = document.createElement('p');
  score.textContent = `Metacritic: ⭐ ${juego.metacriticScore || 'N/D'}`;
  card.appendChild(score);

  const precio = document.createElement('p');
  precio.innerHTML = `Renta: <strong>$${PRECIO_DIA} MXN / día</strong>`;
  card.appendChild(precio);

  const btn = document.createElement('button');
  btn.textContent = 'Rentar ahora';
  btn.onclick = () => alert(`Agregaste "${juego.title}" a tu solicitud.`);
  card.appendChild(btn);

  return card;
}

function pintarCatalogo(juegos) {
  catalogo.innerHTML = '';
  juegos.forEach(j => catalogo.appendChild(crearTarjeta(j)));
}

async function cargarCatalogo() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);

    const res = await fetch(API_URL, { signal: ctrl.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const juegos = await res.json();
    if (!Array.isArray(juegos) || !juegos.length) throw new Error('Sin datos');

    pintarCatalogo(juegos);
  } catch (err) {
    console.warn('API de juegos falló, usando respaldo:', err);
    pintarCatalogo(JUEGOS_RESPALDO);
  }
}

cargarCatalogo();