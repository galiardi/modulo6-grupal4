const path = require('path');
const express = require('express');
const Jimp = require('jimp');

const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/black-and-white', async (req, res) => {
  const { imageUrl } = req.body;
  const imageName = `image${Date.now()}.png`;
  const imagePath = path.join(
    __dirname,
    '..',
    'public',
    'assets',
    'img',
    imageName
  );
  try {
    const image = await Jimp.read(imageUrl);
    await image
      .resize(350, Jimp.AUTO)
      .quality(60)
      .grayscale()
      .writeAsync(imagePath);
    res.json({ imageName, error: null });
  } catch (error) {
    console.log(error);
    res.json({ imageName: null, error: error.code });
  }
});

module.exports = app;
