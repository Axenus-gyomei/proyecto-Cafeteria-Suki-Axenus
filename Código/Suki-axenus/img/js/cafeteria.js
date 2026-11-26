function pintarMenu() {
  contenedorMenu.innerHTML = '';
  selectBebida.innerHTML = '';

  MENU_CAFE.forEach(p => {
    // Select
    const op = document.createElement('option');
    op.value = p.nombre;
    op.textContent = `${p.nombre} — $${p.precio}`;
    selectBebida.appendChild(op);

    // Tarjeta Kawaii
    const card = document.createElement('div');
    card.className = 'item-menu';
    card.innerHTML = `
      <h3><span>${p.ico}</span> ${p.nombre}</h3>
      <p>${p.cat}</p>
      <span class="precio">$${p.precio} MXN</span>
    `;
    contenedorMenu.appendChild(card);
  });
}
