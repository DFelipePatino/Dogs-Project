const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');

const server = express();

// Configure CORS
const allowedOrigins = [
  // "http://localhost:5173",
  "https://dogsproject-rr4u.onrender.com",
  "https://danielpatinoportfolio.onrender.com"
];

server.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Api-Key"]
  })
);

// server.use(cors());


server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Allow custom headers
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Api-Key"
  );
  next();
});


// Use defined routes
server.use('/', routes);

// Add a default route to handle the root path
server.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = server;
