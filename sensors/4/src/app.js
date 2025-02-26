const fingers = ['1 👆','2 🤙','3 🤟', '4 🤘🤘', '5 🖐']

document.body.addEventListener("touchstart", function(e) {
  var count = e.touches.length;
  document.body.textContent = fingers[count - 1];
})

document.body.addEventListener("touchend", function(e) {
  document.body.textContent = "0 👊";
});

