// Drag-and-drop functionality for the icons
let icons = document.querySelectorAll('.draggable');
let circle = document.getElementById('circle');

icons.forEach(icon => {
  // Allow the icon to be dragged
  icon.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.src); // Store the image source for later use
  });
});

circle.addEventListener('dragover', (e) => {
  e.preventDefault(); // Prevent the default action (required for dropping)
});

circle.addEventListener('drop', (e) => {
  e.preventDefault();
  
  let data = e.dataTransfer.getData('text'); // Get the image source
  let icon = document.createElement('img');
  icon.src = data; // Set the icon's source to the dragged image
  icon.classList.add('dropped-icon'); // Add a class for styling
  icon.style.position = 'absolute';
  icon.style.left = `${e.offsetX - 25}px`; // Offset the icon for positioning
  icon.style.top = `${e.offsetY - 25}px`;
  circle.appendChild(icon); // Append the icon to the circle
});

// Save the cognitive map data
function saveMap() {
  const participantId = localStorage.getItem('participantId');
  const iconsData = [];

  // Collect the positions of the dropped icons inside the circle
  document.querySelectorAll('.dropped-icon').forEach(icon => {
    const rect = icon.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    iconsData.push({
      icon: icon.src.split('/').pop(), // Extract the icon name (e.g., 'apple.png')
      x: rect.left - circleRect.left + rect.width / 2, // X position
      y: rect.top - circleRect.top + rect.height / 2  // Y position
    });
  });

  // Store the data in localStorage or send it to a backend (for GitHub Actions)
  localStorage.setItem('mapData', JSON.stringify({ participantId, iconsData }));

  // Redirect to a confirmation page or send the data to a backend (in future steps)
  alert('Map saved! Your data has been saved successfully.');
}
