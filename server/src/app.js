const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const cors = require('cors');

const server = express();

server.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE']
}));

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use('/', routes);


module.exports = server;