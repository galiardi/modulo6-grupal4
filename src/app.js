const path = require('path');
const express = require('express');
const Jimp = require('jimp');

const app = express();

// *************settings*****************

// configura el modulo hbs como motor de vistas
app.set('view engine', 'hbs');

// ************middlewares***************

// Parsea el body enviado en formato urlencoded desde el form del html y los disponibiliza en la propiedad req.body
app.use(express.urlencoded());

// Sirve archivos estáticos desde la carpeta public.
app.use(express.static(path.join(__dirname, '..', 'public')));

// **************routes********************

app.get('/', (req, res) => {
  // renderiza la vista home en la ruta principal utilizando el layout definido en la carpeta views
  res.render('home', { layout: 'layout' });
});

app.post('/black-and-white', async (req, res) => {
  try {
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

    // transforma la imagen con jimp y la guarda en public/assets/img/imageName
    const image = await Jimp.read(imageUrl);
    await image
      .resize(350, Jimp.AUTO)
      .quality(60)
      .grayscale()
      .writeAsync(imagePath);

    // renderiza la vista processed-image y le pasa el nombre de la imagen recién creada. Se define el layout.
    res.render('black-and-white', { imageName, layout: 'layout' });
  } catch (error) {
    console.log(error);
    res.render('black-and-white', { error: error.code, layout: 'layout' });
  }
});

module.exports = app;
