// node src/server.js listen --key 123

const http = require('http');
const yargs = require('yargs');
const app = require('./app');
const { PORT } = require('./config');

const server = http.createServer(app);

// establece el comando listen con la opcion --key 123 para levantar el servidor
// node src/server listen --key 123

const argv = yargs.command('listen', 'Levanta el servidor', (yargs) => {
  yargs.option('key', {
    alias: 'k',
    description: 'Clave para levantar el servidor',
    type: 'string',
    demandOption: true,
  });
}).argv;

const command = argv._[0];
const { key } = argv;

// el servidor inicia si se proporciona el comando listen con la clave correcta
if (command === 'listen' && key === '123') {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} else {
  console.log('Clave incorrecta');
}
