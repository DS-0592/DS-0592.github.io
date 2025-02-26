//dom elements
const contentX = document.getElementById("x");
const contentY = document.getElementById("y");
const contentAlpha = document.getElementById("alpha");
const contentBeta = document.getElementById("beta");
const contentGamma = document.getElementById("gamma");
const button = document.getElementById("accelPermsButton");

let px = 50; // Position x and y
let py = 50;
let vx = 0.0; // Velocity x and y
let vy = 0.0;

let updateRate = 1 / 60; // Sensor refresh rate

button.addEventListener("click", () => {
  getAccel();
});

async function getAccel() {
  DeviceMotionEvent.requestPermission().then((response) => {
    if (response == "granted") {
      // Add a listener to get smartphone orientation
      // in the alpha-beta-gamma axes (units in degrees)
      window.addEventListener("deviceorientation", (event) => {
        // Expose each orientation angle in a more readable way
        rotation_degrees = event.alpha;
        frontToBack_degrees = event.beta;
        leftToRight_degrees = event.gamma;

        // Update velocity according to how tilted the phone is
        // Since phones are narrower than they are long, double the increase to the x velocity
        vx = vx + leftToRight_degrees * updateRate * 2;
        vy = vy + frontToBack_degrees * updateRate;

        // Update position and clip it to bounds
        px = px + vx * 0.5;
        if (px > 92 || px < 0) {
          px = Math.max(0, Math.min(92, px)); // Clip px between 0-95
          vx = 0;
        }

        py = py + vy * 0.5;
        if (py > 95 || py < 0) {
          py = Math.max(0, Math.min(95, py)); // Clip py between 0-95
          vy = 0;
        }

        dot = document.getElementById("dot");
        dot.setAttribute("style", "left:" + px + "%;" + "top:" + py + "%;");
        
        contentX.innerHTML = px;
        contentY.innerHTML = py;
        contentAlpha.innerHTML = rotation_degrees;
        contentBeta.innerHTML = frontToBack_degrees;
        contentGamma.innerHTML = leftToRight_degrees;

      });
    }
  });
}
