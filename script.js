// Drag-and-drop functionality
let icons = document.querySelectorAll('.draggable');
let circle = document.getElementById('circle');

icons.forEach(icon => {
  icon.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', icon.src);
  });
});

circle.addEventListener('dragover', (e) => {
  e.preventDefault();
});

circle.addEventListener('drop', (e) => {
  e.preventDefault();
  let data = e.dataTransfer.getData('text');
  let icon = document.createElement('img');
  icon.src = data;
  icon.classList.add('dropped-icon');
  icon.style.position = 'absolute';
  icon.style.left = `${e.offsetX - 25}px`;
  icon.style.top = `${e.offsetY - 25}px`;
  circle.appendChild(icon);
});

function saveMap() {
  const participantId = localStorage.getItem('participantId');
  const iconsData = [];

  // Collect the positions of the icons inside the circle
  document.querySelectorAll('.dropped-icon').forEach(icon => {
    const rect = icon.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    iconsData.push({
      icon: icon.src.split('/').pop(), // Extract the icon name (e.g., 'apple.png')
      x: rect.left - circleRect.left + rect.width / 2,
      y: rect.top - circleRect.top + rect.height / 2
    });
  });

  // Store the data in localStorage or send it to a backend (for GitHub Actions)
  localStorage.setItem('mapData', JSON.stringify({ participantId, iconsData }));

  // Redirect to a confirmation page or send the data to a backend (in future steps)
  alert('Map saved! Your data has been saved successfully.');
}
