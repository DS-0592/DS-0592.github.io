window.addEventListener('DOMContentLoaded', (event) => {
  let audioContext, analyzer, microphone;

  const canvas = document.getElementById('visualizer');
  const canvasContext = canvas.getContext('2d');

  // Access the microphone
  async function getMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      analyzer = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyzer);
      analyzer.fftSize = 2048;
      draw();
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  }

  // Draw the audio data
  function draw() {
    requestAnimationFrame(draw);
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyzer.getByteFrequencyData(dataArray);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      canvasContext.fillStyle = 'red';
      canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
      if(barHeight > 100) {

      }
    }
  }

  document.getElementById('start').addEventListener('click', getMicrophoneAccess);
});