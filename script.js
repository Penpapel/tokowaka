const map = L.map('map').setView([35.6895, 139.6917], 3); // Tokyo center

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Example image data (simulate reading from GitHub repo folder)
const imageData = [
  { name: 'tokyo.jpg', lat: 35.6895, lng: 139.6917 },
  { name: 'kyoto.jpg', lat: 35.0116, lng: 135.7681 },
  { name: 'osaka.jpg', lat: 34.6937, lng: 135.5023 }
];

imageData.forEach(photo => {
  const imagePath = `images/${photo.name}`;
  const marker = L.marker([photo.lat, photo.lng]).addTo(map);
  marker.bindPopup(`<img class="thumbnail" src="${imagePath}" alt="${photo.name}">`);
});
