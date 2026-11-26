// ================================================
// API: Open Library
// Búsqueda:  https://openlibrary.org/search.json?q={texto}&limit=12
// Portadas:  https://covers.openlibrary.org/b/id/{COVER_ID}-M.jpg
// → gratis, sin API key
// ================================================
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar     = document.getElementById('btnBuscar');
const contenedor    = document.getElementById('resultados');

// Placeholder SVG para libros sin portada
const SIN_PORTADA = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="220" viewBox="0 0 150 220">
    <rect width="150" height="220" fill="#d1d5db"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          fill="#4b5563" font-family="sans-serif" font-size="14">Sin portada</text>
  </svg>
`);

async function buscarLibros() {
  const texto = inputBusqueda.value.trim();
  if (!texto) return;

  contenedor.innerHTML = '<p>Buscando libros...</p>';

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(texto)}&limit=12`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const datos = await res.json();
    mostrarLibros(datos.docs || []);
  } catch (err) {
    console.error('Error Open Library:', err);
    contenedor.innerHTML = '<p>Ocurrió un error al conectar con el servidor.</p>';
  }
}

function mostrarLibros(lista) {
  contenedor.innerHTML = '';

  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron libros con ese nombre.</p>';
    return;
  }

  lista.forEach(libro => {
    const titulo = libro.title || 'Título no disponible';
    const autor  = libro.author_name ? libro.author_name[0] : 'Autor desconocido';
    const anio   = libro.first_publish_year || 'Año N/D';
    const portada = libro.cover_i
      ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
      : SIN_PORTADA;

    const card = document.createElement('div');
    card.className = 'tarjeta';
    card.innerHTML = `
      <img src="${portada}" alt="${titulo}" onerror="this.src='${SIN_PORTADA}'">
      <h3>${titulo}</h3>
      <p>${autor}</p>
      <small>${anio}</small>
    `;
    contenedor.appendChild(card);
  });
}

// Eventos
btnBuscar.addEventListener('click', buscarLibros);
inputBusqueda.addEventListener('keydown', e => {
  if (e.key === 'Enter') buscarLibros();
});