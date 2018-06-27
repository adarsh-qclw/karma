const express = require('express');

const router = express.Router();

const authenticationAuthenticateKarma = require(
  'authentication/authenticate/karma',
);

router.get('/', (req, res) => {
  res.json({
    status: 200,
  });
});

router.post('/', (req, res) => {
  if (req.headers['content-type'] === 'application/json') {
    if (Object.prototype.hasOwnProperty.call(req.body, 'password')) {
      // is https really secure?
      if (Object.prototype.hasOwnProperty.call(req.body, 'email') && !Object
        .prototype.hasOwnProperty.call(req.body, 'mobileNumber')) {
        // assumption: user has an email

        // verify the email password combo
        authenticationAuthenticateKarma.emailPassword(
          req.body.email, req.body.password,
        )
          .then((token) => {
            res.json({
              token,
            });
          }).catch((err) => {
            console.error(err);
            res.status(500).json({
              status: 500,
            });
          });
      } else if (!Object.prototype.hasOwnProperty.call(req.body, 'email')
      && Object.prototype.hasOwnProperty.call(req.body, 'mobileNumber')) {
        // assumption: user has a mobileNumber
        res.status(501).json({
          status: 501,
        });
      } else {
        res.status(400).json({
          status: 400,
        });
      }
    } else {
      res.status(400).json({
        status: 400,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
    });
  }
});

module.exports = router;
