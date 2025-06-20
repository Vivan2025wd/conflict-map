fetch('conflicts.json')
  .then(res => res.json())
  .then(data => {
    const points = data.map(conflict => ({
      lat: conflict.lat,
      lng: conflict.lng,
      size: conflict.severity === 'Severe' ? 0.5 :
            conflict.severity === 'Active' ? 0.3 : 0.2,
      color: conflict.severity === 'Severe' ? 'red' :
             conflict.severity === 'Active' ? 'orange' : 'yellow',
      label: conflict.name,
      image: conflict.image
    }));

    const globe = Globe()
      (document.getElementById('globeViz'))
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointLabel('label')
      .pointsData(points)
      .pointAltitude('size')
      .pointColor('color')
      .onPointClick(showPopup);

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    globe.controls().enableZoom = false;
    globe.controls().enablePan = false;

    // Optional: toggle autorotate on click
    document.getElementById('globeViz').addEventListener('click', () => {
      globe.controls().autoRotate = !globe.controls().autoRotate;
    });

    function showPopup(point) {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');

  document.getElementById('popup-title').textContent = point.label;

  // fallback image on error
  popupImg.onerror = function () {
    this.src = 'https://via.placeholder.com/400x250.png?text=Image+Unavailable';
  };

  popupImg.src = point.image;
  popup.style.display = 'flex';
}


    document.getElementById('popup-close').addEventListener('click', () => {
      document.getElementById('popup').style.display = 'none';
    });
  })
  .catch(err => console.error('Error loading conflicts data:', err));
