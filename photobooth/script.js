const videoStream = document.querySelector("#videoStream");
const filterSelect = document.querySelector("#filterSelect");

const liveButton = document.querySelector("#live-button");
liveButton.addEventListener("click", toggleCamera);

const snapButton = document.querySelector("#snap-button");
snapButton.addEventListener("click", takePhoto);

const canvas = document.querySelector("#canvasOutput");
const ctx = canvas.getContext("2d");

const imgContainer = document.querySelector("#img-container");

function toggleCamera() {
  if (videoStream.paused || videoStream.ended) {
    startCamera();
    videoStream.play();
  } else {
    videoStream.pause();
    //stopCamera();
  }
}

function stopCamera() {
  // A video's MediaStream object is available through its srcObject attribute
  const mediaStream = videoStream.srcObject;

  // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
  const tracks = mediaStream.getTracks();

  // Tracks are returned as an array, so if you know you only have one, you can stop it with:
  //tracks[0].stop();

  // Or stop all like so:
  tracks.forEach((track) => track.stop());
}

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoStream.srcObject = stream;
  } catch (error) {
    console.error("Error accessing webcam:", error);
  }

  // navigator.mediaDevices
  //   .getUserMedia({ video: true })
  //   .then(function (stream) {
  //     videoStream.srcObject = stream;
  //   })
  //   .catch(function (error) {
  //     console.error("Error accessing webcam:", error);
  //   });
}

filterSelect.addEventListener("change", function () {
  videoStream.style.filter = filterSelect.value;
});

function takePhoto() {
  // canvas.width = videoStream.videoWidth;
  // canvas.height = videoStream.videoHeight;

  canvas.width = 200;
  canvas.height = 200;
  // Apply selected filter to canvas context
  ctx.filter = filterSelect.value;

  // Draw video frame onto canvas
  ctx.drawImage(videoStream, 0, 0, canvas.width, canvas.height);

  // Get the data URL of the canvas
  const dataURL = canvas.toDataURL("image/png");
  console.log(dataURL);
  displayPhoto(dataURL);
  //return dataURL;
}

function displayPhoto(src) {
  imgContainer.innerHTML += `<img src="${src}" />`;
}
