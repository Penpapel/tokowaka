mapboxgl.accessToken = pk.eyJ1IjoiZGVyZXBlbnRlIiwiYSI6ImNtOTdkdHhzODA2ZGYyam9qNG9tb2VieWYifQ.gzi2iE--4RF0U9QEmGAOlQpk.eyJ1IjoiZGVyZXBlbnRlIiwiYSI6ImNtOTdkdHhzODA2ZGYyam9qNG9tb2VieWYifQ.gzi2iE--4RF0U9QEmGAOlQ ;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [139.6917, 35.6895], // Tokyo default
  zoom: 3
});

document.getElementById('photoInput').addEventListener('change', handleUpload);

function handleUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const exif = await getExifData(evt.target.result);
      if (exif?.lat && exif?.lng) {
        new mapboxgl.Marker()
          .setLngLat([exif.lng, exif.lat])
          .addTo(map);
      }
    };
    reader.readAsDataURL(file);
  });
}

async function getExifData(dataURL) {
  // You’ll use something like exifr.js to extract GPS
  return { lat: 35.6895, lng: 139.6917 }; // Stub for now
}
