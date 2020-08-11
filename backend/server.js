const http = require('http');
const app = require('./app');
//const app = require('./test');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('     GGGGGGGGGGGGG');
  console.log('    GGG::::::::::::G');
  console.log('   GG:::::::::::::::G');
  console.log('  G:::::GGGGGGGG::::G');
  console.log(' G:::::G       GGGGGGrrrrr   rrrrrrrrr      ooooooooooo   uuuuuu    uuuuuu ppppp   ppppppppp      ooooooooooo      mmmmmmm    mmmmmmm     aaaaaaaaaaaaa  nnnn  nnnnnnnn    iiiiiii   aaaaaaaaaaaaa');
  console.log('G:::::G              r::::rrr:::::::::r   oo:::::::::::oo u::::u    u::::u p::::ppp:::::::::p   oo:::::::::::oo  mm:::::::m  m:::::::mm   a::::::::::::a n:::nn::::::::nn  i:::::i   a::::::::::::a');
  console.log('G:::::G              r:::::::::::::::::r o:::::::::::::::ou::::u    u::::u p:::::::::::::::::p o:::::::::::::::om::::::::::mm::::::::::m  aaaaaaaaa:::::an::::::::::::::nn  i::::i   aaaaaaaaa:::::a');
  console.log('G:::::G    GGGGGGGGGGrr::::::rrrrr::::::ro:::::ooooo:::::ou::::u    u::::u pp::::::ppppp::::::po:::::ooooo:::::om::::::::::::::::::::::m           a::::ann:::::::::::::::n i::::i            a::::a');
  console.log('G:::::G    G::::::::G r:::::r     r:::::ro::::o     o::::ou::::u    u::::u  p:::::p     p:::::po::::o     o::::om:::::mmm::::::mmm:::::m    aaaaaaa:::::a  n:::::nnnn:::::n i::::i     aaaaaaa:::::a');
  console.log('G:::::G    GGGGG::::G r:::::r     rrrrrrro::::o     o::::ou::::u    u::::u  p:::::p     p:::::po::::o     o::::om::::m   m::::m   m::::m  aa::::::::::::a  n::::n    n::::n i::::i   aa::::::::::::a');
  console.log('G:::::G        G::::G r:::::r            o::::o     o::::ou::::u    u::::u  p:::::p     p:::::po::::o     o::::om::::m   m::::m   m::::m a::::aaaa::::::a  n::::n    n::::n i::::i  a::::aaaa::::::a');
  console.log(' G:::::G       G::::G r:::::r            o::::o     o::::ou:::::uuuu:::::u  p:::::p    p::::::po::::o     o::::om::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n i::::i a::::a    a:::::a');
  console.log('  G:::::GGGGGGGG::::G r:::::r            o:::::ooooo:::::ou:::::::::::::::uup:::::ppppp:::::::po:::::ooooo:::::om::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::ni::::::ia::::a    a:::::a');
  console.log('   GG:::::::::::::::G r:::::r            o:::::::::::::::o u:::::::::::::::up::::::::::::::::p o:::::::::::::::om::::m   m::::m   m::::ma:::::aaaa::::::a  n::::n    n::::ni::::::ia:::::aaaa::::::a');
  console.log('    GGG::::::GGG:::G r:::::r             oo:::::::::::oo   uu::::::::uu:::up::::::::::::::pp   oo:::::::::::oo m::::m   m::::m   m::::m a::::::::::aa:::a n::::n    n::::ni::::::i a::::::::::aa:::a');
  console.log('     GGGGGG   GGGG rrrrrrr               ooooooooooo       uuuuuuuu  uuuup::::::::pppppppp       ooooooooooo   mmmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa nnnnnn    nnnnnniiiiiiii  aaaaaaaaaa  aaaa');
  console.log('                                                                           p:::::p');
  console.log('                                                                           p:::::p');
  console.log('                                                                          p:::::::p');
  console.log('                                                                          p:::::::p');
  console.log('                                                                          p:::::::p');
  console.log('                                                                          ppppppppp');
  console.log('En écoute sur le ' + bind);
  console.log('http://localhost:' + port);
});

server.listen(port);
