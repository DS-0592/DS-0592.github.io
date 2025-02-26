document.addEventListener('DOMContentLoaded', function() {
  const compassImage = document.getElementById('compassImage');
  const compassData = document.getElementById('compassData');

  // Function to determine cardinal direction
  function getCardinalDirection(angle) {
      const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
      angle += 22.5; // Adjust so the split between directions is centered on the cardinal direction
      if (angle < 0) angle += 360;
      angle %= 360;
      return directions[Math.floor(angle / 45)];
  }

  // Adjust the alpha angle for magnetic declination
  const magneticDeclination = 0; // Set your location's magnetic declination in degrees here

  function updateCompass(event) {
      if (event.alpha !== null) {
          let alpha = event.alpha;
          alpha += magneticDeclination; // Adjust compass reading by adding the magnetic declination

          // Rotate the compass needle
          compassImage.style.transform = `rotate(${-alpha}deg)`;

          // Get the cardinal direction
          const cardinalDirection = getCardinalDirection(alpha);
          compassData.innerHTML = `Magnetic Heading: ${alpha.toFixed(2)}° ${cardinalDirection}`;
      }
  }

  // Check if DeviceOrientationEvent is supported
  if ('DeviceOrientationEvent' in window) {
      // Request permission for iOS devices
      if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
          DeviceMotionEvent.requestPermission()
              .then(permissionState => {
                  if (permissionState === 'granted') {
                      window.addEventListener('deviceorientation', updateCompass);
                  } else {
                      compassData.innerHTML = "Permission to access sensor was denied.";
                  }
              })
              .catch(console.error);
      } else {
          window.addEventListener('deviceorientation', updateCompass);
      }
  } else {
      compassData.innerHTML = "Your device does not support device orientation.";
  }
});
