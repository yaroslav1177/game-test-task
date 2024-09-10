document.addEventListener('DOMContentLoaded', function() {
  class IconGrid {
    constructor(icons, rows, cols, gridSelector) {
      this.icons = icons;
      this.rows = rows;
      this.cols = cols;
      this.gridItems = document.querySelectorAll(gridSelector);
      this.grid = [];

      this.initGrid();
    }

    initGrid() {
      for (let i = 0; i < this.rows; i++) {
        const row = [];
        for (let j = 0; j < this.cols; j++) {
          const item = this.gridItems[i * this.cols + j];

          const img = document.createElement('img');
          const randomIcon = this.getRandomIcon();
          img.src = randomIcon;
          
          item.appendChild(img);

          row.push({ element: item, img: img, icon: randomIcon });

          img.addEventListener('click', () => {
            this.removeConnectedIcons(i, j, randomIcon);
          });

          item.addEventListener('mouseover', () => {
            this.highlightGroup(i, j, randomIcon, true);
          });

          item.addEventListener('mouseout', () => {
            this.highlightGroup(i, j, randomIcon, false);
          });
        }
        this.grid.push(row);
      }
    }

    getRandomIcon() {
      return this.icons[Math.floor(Math.random() * this.icons.length)];
    }

    removeConnectedIcons(x, y, icon) {
      const toRemove = [];
      this.findConnectedIcons(x, y, icon, toRemove);

      toRemove.forEach(({ img }) => {
        img.classList.add('hidden');
      });

      toRemove.forEach(({ img }) => {
        img.remove();
      });
    }

    findConnectedIcons(x, y, icon, toRemove) {
      if (x < 0 || x >= this.rows || y < 0 || y >= this.cols) return;
      
      const current = this.grid[x][y];
      
      if (!current.img || current.icon !== icon || toRemove.includes(current)) return;
      
      toRemove.push(current);

      this.findConnectedIcons(x + 1, y, icon, toRemove);
      this.findConnectedIcons(x - 1, y, icon, toRemove);
      this.findConnectedIcons(x, y + 1, icon, toRemove);
      this.findConnectedIcons(x, y - 1, icon, toRemove);
    }

    highlightGroup(x, y, icon, highlight) {
      const toHighlight = [];
      this.findConnectedIcons(x, y, icon, toHighlight);

      toHighlight.forEach(({ element }) => {
        if (highlight) {
          element.classList.add('highlight');
        } else {
          element.classList.remove('highlight');
        }
      });
    }
  }

  const icons = [
    'src/icons/cherva.png',
    'src/icons/buba.png',
    'src/icons/pika.png',
    'src/icons/kresta.png'
  ];

  const grid = new IconGrid(icons, 7, 6, '.grid-item');
});
