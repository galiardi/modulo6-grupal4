const path = require('path');
const express = require('express');
const Jimp = require('jimp');

const app = express();

// middlewares

// Parsea el body y los disponibiliza en la propiedad req.body
app.use(express.json());
// Sirve archivos estáticos desde la carpeta public.
app.use(express.static(path.join(__dirname, '..', 'public')));
// Con el código anterior es suficiente. La siguiente ruta podría omitirse pero la dejamos para ser explícitos.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/black-and-white', async (req, res) => {
  // extrae la url de la imagen enviada en el body
  const { imageUrl } = req.body;
  // crea un nombre unico para la imagen que guardaremos
  const imageName = `image${Date.now()}.png`;
  // establece la ruta donde guardaremos la imagen
  const imagePath = path.join(
    __dirname,
    '..',
    'public',
    'assets',
    'img',
    imageName
  );
  try {
    // trnasforma la imagen con jimp y la guarda en public/assets/img/imageName
    const image = await Jimp.read(imageUrl);
    await image
      .resize(350, Jimp.AUTO)
      .quality(60)
      .grayscale()
      .writeAsync(imagePath);
    // envia al cliente el nombre de la imagen para que él la agrege en el atributo src del tag img (ver public/assets/js/main.js)
    res.json({ imageName, error: null });
  } catch (error) {
    console.log(error);
    res.json({ imageName: null, error: error.code });
  }
});

module.exports = app;
