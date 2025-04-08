const map = L.map('map').setView([35.6895, 139.6917], 3); // Default center

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

const imageFilenames = [
  'photo1.jpg',
  'photo2.jpg',
  'photo3.jpg'
];

imageFilenames.forEach(filename => {
  const imagePath = `Images/${filename}`;
  fetch(imagePath)
    .then(res => res.blob())
    .then(blob => exifr.gps(blob))
    .then(gps => {
      if (gps && gps.latitude && gps.longitude) {
        const marker = L.marker([gps.latitude, gps.longitude]).addTo(map);
        marker.bindPopup(`<img class="thumbnail" src="${imagePath}" alt="${filename}">`);
      } else {
        console.warn('No GPS data found for', filename);
      }
    })
    .catch(err => console.error('Error loading image or EXIF:', err));
});
