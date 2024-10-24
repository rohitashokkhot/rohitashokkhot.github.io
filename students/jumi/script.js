function toggleImage(imgElement) {
  console.log(imgElement.src); //this is currently displayed image
  console.log(imgElement.dataset.newSrc); // this is the image you want to change on click
  const temp = imgElement.src; // store the current image temporarily
  imgElement.src = imgElement.dataset.newSrc; // replace current image
  imgElement.dataset.newSrc = temp; // replace datasource image
}
// function toggleImage(imgElement) {
//   const currentImage = document.getElementById("snoop-dog");

//   if (currentImage.src.includes(imgElement.src)) {
//     currentImage.src = imgElement.dataset.newSrc;
//   } else {
//     currentImage.src = imgElement.src;
//   }
// }
