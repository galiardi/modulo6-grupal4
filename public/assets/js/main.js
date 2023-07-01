import { isHttpsUrl } from './utils/isHttpsUrl.js';

const imageForm = document.getElementById('image-form');
const imageUrlInput = document.getElementById('image-url-input');
const renderDiv = document.getElementById('render-div');
const loaderContainer = document.getElementById('loader-container');

imageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const imageUrl = imageUrlInput.value;

  // valida si la url proporcionada empieza con https://
  if (!isHttpsUrl(imageUrl)) {
    return alert('Ingrese una url que empiece con https://');
  }

  // muestra un loader
  loaderContainer.innerHTML = '<div class="loader"></div>';

  // envia la url de la imagen al servidor en el body
  const response = await fetch('/black-and-white', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });

  // extrae el nombre de la imagen creada en el servidor, el cual ha sido enviado en el body
  const { imageName, error } = await response.json();

  // elimina el loader
  loaderContainer.innerHTML = '';

  // si hubo error en la solicitud termina la función y alerta el error
  if (error) return alert(error.code);

  // limpia el formulario
  imageUrlInput.value = '';

  // renderiza un elemento img cuyo src apunta hacia la imagen creada en el servidor
  renderDiv.innerHTML = `<img src="assets/img/${imageName}" alt="imagen transformada">`;
});
