const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser');

const webSocket = require('./websocket');
const choiceRoute = require('./routes/choiceRoute');
const usersRoute = require('./routes/usersRoute');

const host = '127.0.0.1';
const port = 7000;

webSocket(host);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', choiceRoute);
app.use('/', usersRoute);

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
