// Solo registra clic para feedback visual
document.querySelectorAll('.recuadro').forEach(card => {
  card.addEventListener('click', () => {
    const nombre = card.querySelector('h3').textContent;
    document.getElementById('mensaje').textContent = `Abriendo: ${nombre}...`;
  });
});