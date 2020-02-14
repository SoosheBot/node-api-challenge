const express = require("express");

const dbA = require("../helpers/actionModel");
const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  dbA
    .get()
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

//POST to actions
router.post("/", validateAction, validateActionId, (req, res) => {
  const body = req.body;
  dbA
    .insert(body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Could not add action" });
    });
});

// custom middleware
function validateActionId(req, res, next) {
  dbA
    .get(req.params.id)
    .then(checkId => {
      if (checkId) {
        req.checkId = checkId;
        next();
      } else {
        res.status(400).json({ error: "Action ID may not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not verify action ID" });
    });
}

function validateAction(req, res, next) {
  if (req.body) {
    next();
  } else if (!req.body.description || !req.body.notes || req.body.project_id) {
    res
      .status(400)
      .json({
        message: "Missing required information--project_id, description, notes"
      });
  } else {
    res.status(400).json({ message: "Missing user data" });
  }
}

module.exports = router;
