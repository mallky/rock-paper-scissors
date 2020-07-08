const fs = require('fs');
const express = require('express');
const router = express.Router();
const file = 'server/data.json';

router.use((req, res, next) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.status(500).send({ message: 'Error while getting choices' });

    req.choice = JSON.parse(data);

    next();
  });
});

router
  .route('/api/choice')
  .get((req, res) => {
    if (req.query.name) {
      delete req.choice[req.query.name];
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

module.exports = router;
