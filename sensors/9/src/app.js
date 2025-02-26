window.addEventListener("DOMContentLoaded", (event) => {
  let audioContext, analyzer, microphone;

  // Access the microphone
  async function getMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Create an AudioContext and connect the microphone to an analyzer
      audioContext = new AudioContext();
      // Create an AnalyserNode to get the audio data
      analyzer = audioContext.createAnalyser();
      // Create a MediaStreamAudioSourceNode to connect the microphone to the analyzer
      microphone = audioContext.createMediaStreamSource(stream);
      // Connect the microphone to the analyzer
      microphone.connect(analyzer);
      // Set the FFT size to 2048
      // This is the number of samples used to calculate the frequency domain
      analyzer.fftSize = 2048;
      // Start updating the volume
      updateVolume();
    } catch (error) {
      console.error("Error accessing the microphone:", error);
      document.getElementById("volume").textContent =
        "Error accessing the microphone.";
    }
  }

  // Update the displayed volume
  function updateVolume() {
    // Request the next animation frame
    requestAnimationFrame(updateVolume);
    // Create a Uint8Array to store the audio data
    const bufferLength = analyzer.fftSize;
    // Get the audio data
    const dataArray = new Uint8Array(bufferLength);
    // Get the time domain data
    analyzer.getByteTimeDomainData(dataArray);
    // Calculate the average volume
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      let value = dataArray[i] - 128; // Centering the value around 0
      sum += value * value;
    }
    const average = Math.sqrt(sum / bufferLength);
    document.getElementById("volume").textContent =
      "Current Volume: " + average.toFixed(2);
    if (average > 2) {
      document.body.style.backgroundColor = "red";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }

  document
    .getElementById("start")
    .addEventListener("click", getMicrophoneAccess);
});
