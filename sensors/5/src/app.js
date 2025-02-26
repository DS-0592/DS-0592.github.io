document.body.addEventListener("touchstart", function (e) {
  var count = e.touches.length;
  
  if (count == 1) {
    document.body.innerHTML = `<img src='https://thumbs.dreamstime.com/b/one-finger-20482985.jpg'>`;
  } else if (count == 2) {
    document.body.innerHTML = `<img src='https://img.freepik.com/free-photo/counting-fingers-five-inner-palm_628469-493.jpg'>`;
  }
  else if (count == 3) {
    document.body.innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/3/3b/Three_finger_salute.jpg'>`;
  }
});

document.body.addEventListener("touchend", function (e) {
  document.body.innerHTML = "";
});
