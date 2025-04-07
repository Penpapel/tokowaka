const map = L.map('map').setView([35.6895, 139.6917], 3); // Tokyo center

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

document.getElementById('photoInput').addEventListener('change', handleUpload);

function handleUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const exif = await exifr.gps(evt.target.result);
        if (exif?.latitude && exif?.longitude) {
          L.marker([exif.latitude, exif.longitude]).addTo(map);
        } else {
          alert('No GPS data found in ' + file.name);
        }
      } catch (err) {
        console.error('Error reading EXIF data', err);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
