const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load an image
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    
    // On image load
    img.onload = () => resolve(img);
    
    // On image error
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}

// Event listener for the button click
btn.addEventListener("click", () => {
  output.innerHTML = ''; // Clear the output div

  const promises = images.map(loadImage);

  // Use Promise.all to handle all image downloads in parallel
  Promise.all(promises)
    .then((imgs) => {
      imgs.forEach(img => output.appendChild(img));
    })
    .catch((error) => {
      console.error(error);
    });
});
