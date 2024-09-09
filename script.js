document.addEventListener('DOMContentLoaded', function() {
  const icons = [
    'src/icons/cherva.png',
    'src/icons/buba.png',
    'src/icons/pika.png',
    'src/icons/kresta.png'
  ];

  const gridItems = document.querySelectorAll('.grid-item');

  const grid = [];

  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 6; j++) {
      const item = gridItems[i * 6 + j];
      
      const img = document.createElement('img');
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      img.src = randomIcon;
      
      item.appendChild(img);

      row.push({ element: item, img: img, icon: randomIcon });

      img.addEventListener('click', () => {
        removeConnectedIcons(i, j, randomIcon);
      });

      item.addEventListener('mouseover', () => {
        highlightGroup(i, j, randomIcon, true);
      });

      item.addEventListener('mouseout', () => {
        highlightGroup(i, j, randomIcon, false);
      });
    }
    grid.push(row);
  }

  function removeConnectedIcons(x, y, icon) {
    const toRemove = [];
    findConnectedIcons(x, y, icon, toRemove);

    toRemove.forEach(({ img }) => {
      img.classList.add('hidden');
    });

    toRemove.forEach(({ img }) => {
      img.remove();
    });
  }

  function findConnectedIcons(x, y, icon, toRemove) {
    if (x < 0 || x >= 7 || y < 0 || y >= 6) return;
    
    const current = grid[x][y];
    
    if (!current.img || current.icon !== icon || toRemove.includes(current)) return;
    
    toRemove.push(current);

    findConnectedIcons(x + 1, y, icon, toRemove);
    findConnectedIcons(x - 1, y, icon, toRemove);
    findConnectedIcons(x, y + 1, icon, toRemove);
    findConnectedIcons(x, y - 1, icon, toRemove);
  }

  function highlightGroup(x, y, icon, highlight) {
    const toHighlight = [];
    findConnectedIcons(x, y, icon, toHighlight);

    toHighlight.forEach(({ element }) => {
      if (highlight) {
        element.classList.add('highlight');
      } else {
        element.classList.remove('highlight');
      }
    });
  }
});
