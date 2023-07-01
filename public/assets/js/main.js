const imageForm = document.getElementById('image-form');
const loaderContainer = document.getElementById('loader-container');

imageForm.addEventListener('submit', (e) => {
  // muestra un loader
  loaderContainer.innerHTML = '<div class="loader"></div>';
});
