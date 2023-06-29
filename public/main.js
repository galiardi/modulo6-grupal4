import { isHttpsUrl } from './isHttpsUrl.js';

const imageForm = document.getElementById('image-form');
const imageUrlInput = document.getElementById('image-url-input');

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
  const data = await response.json();
  console.log(data);
});
