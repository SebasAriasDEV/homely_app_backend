require('dotenv').config();
const Server = require('./models/server.model');

require('./database/firebase-connection');

const server = new Server();


server.listen();
