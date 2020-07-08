const fs = require('fs');
const express = require('express');
const router = express.Router();
const file = 'server/user.json';

router.use((req, res, next) => {
  fs.readFile(file, (err, data) => {
    if (err) return res.status(500).send({ message: 'Error while getting choices' });

    req.users = JSON.parse(data);

    next();
  });
});

router
  .route('/api/users')
  .get((req, res) => {
    if (req.query.name) {
      delete req.users[req.query.name];
    }
    return res.status(200).send({ data: req.users });
  })
  .post((req, res) => {
    if (req.body.name) {
      if (req.users.hasOwnProperty(req.body.name))
        return res.status(409).send({ message: 'users already exists.' });

      req.users[req.body.name] = req.body.choice;

      fs.writeFile(file, JSON.stringify(req.users), (err, response) => {
        if (err) return res.status(500).send({ message: 'Unable create users.' });

        return res.status(200).send({ message: 'users created.' });
      });
    } else return res.status(400).send({ message: 'Bad request.' });
  });

module.exports = router;
