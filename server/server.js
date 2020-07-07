const express = require('express'),
  app = express(),
  fs = require('fs'),
  cors = require('cors'),
  bodyParser = require('body-parser');

const host = '127.0.0.1';
const port = 7000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let file = 'server/data.json';

app.use((req, res, next) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.status(500).send({ message: 'Error while getting choices' });

    req.choice = JSON.parse(data);

    next();
  });
});

app
  .route('/api/choice')
  .get((req, res) => {
    if (req.query.name) {
      console.log(req.choice);
      delete req.choice[req.query.name];
      console.log(req.choice);
    }
    return res.status(200).send({ data: req.choice });
  })
  .post((req, res) => {
    if (req.body.name && req.body.choice) {
      if (req.choice.hasOwnProperty(req.body.name))
        return res.status(409).send({ message: 'choice already exists.' });

      req.choice[req.body.name] = req.body.choice;

      fs.writeFile(file, JSON.stringify(req.choice), (err, response) => {
        if (err) return res.status(500).send({ message: 'Unable create choice.' });

        return res.status(200).send({ message: 'choice created.' });
      });
    } else return res.status(400).send({ message: 'Bad request.' });
  });

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
