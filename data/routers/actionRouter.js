const express = require("express");

const dbA = require("../helpers/actionModel");
const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  dbA.get()
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(400).json({ error: "Actions content not found." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Could not GET actions." });
    });
});

module.exports = router;
