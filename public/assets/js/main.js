import { isHttpsUrl } from './utils/isHttpsUrl.js';

const imageForm = document.getElementById('image-form');
const imageUrlInput = document.getElementById('image-url-input');
const renderDiv = document.getElementById('render-div');

imageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const imageUrl = imageUrlInput.value;
  if (!isHttpsUrl(imageUrl)) {
    return alert('Ingrese una url que empiece con https://');
  }
  const response = await fetch('/black-and-white', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });
  const { imageName, error } = await response.json();

  if (error) return alert(error.code);
  renderDiv.innerHTML = `<img src="assets/img/${imageName}" alt="imagen transformada">`;
});
