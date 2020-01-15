const http = require("http"); //importujemy funkcjonalności potrzebne do serevera
const app = require('./app'); // importujemy funkcjonalności z app

const port = process.env.PORT || 3000; // domyslny port

const server = http.createServer(app);

server.listen(port);