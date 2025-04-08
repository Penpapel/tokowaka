const map = L.map('map').setView([35.6895, 139.6917], 3); // Centered over Tokyo
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

async function loadImages() {
  const res = await fetch('manifest.json');
  const imageFiles = await res.json();

  for (let i = 0; i < imageFiles.length; i++) {
    const filename = imageFiles[i];
    const path = 'Images/' + filename;
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();

    try {
      const gps = await exifr.gps(arrayBuffer);
      if (gps && gps.latitude && gps.longitude) {
        const img = document.createElement('img');
        img.src = path;
        img.className = 'image-marker';
        const icon = L.divIcon({
          html: img.outerHTML,
          iconSize: [60, 60],
          className: ''
        });

        const delay = i * 1500;
        setTimeout(() => {
          L.marker([gps.latitude, gps.longitude], { icon }).addTo(map);
        }, delay);
      }
    } catch (err) {
      console.error('Error processing image:', filename, err);
    }
  }
}

loadImages();
