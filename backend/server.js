// Imports:
const express = require('express');
const bodyParser = require('body-parser');

// Instantiate the server:
const server = express();
const port = 3000;

// Launch the server:
server.listen(port, function() {
    console.log('Server en écoute sur le port ' + port);
    console.log('http://localhost:' + port);
});
