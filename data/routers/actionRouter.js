const express = require("express");

const dbA = require("../helpers/actionModel");
const dbP = require("./projectRouter");

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
router.post("/", validateAction, validateProjectId, (req, res) => {
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

//DELETE action at _/api/actions/:id_
router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  dbA
    .remove(id)
    .then(actionId => {
      res
        .status(200)
        .json({ message: `Action ${actionId} at id# ${id} was deleted.` });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Action at this ID was not deleted, try again" });
    });
});

//UPDATE action at _/api/actions/:id_
router.put("/:id", validateAction, validateActionId, (req, res) => {
  const body = { ...req.body };
  const { id } = req.params;
  dbA
    .update(id, body)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not update action." });
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
        res.status(404).json({ error: "Action ID may not exist." });
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
    res.status(400).json({
      message: "Missing required information--project_id, description, notes"
    });
  } else {
    res.status(400).json({ message: "Missing user data" });
  }
}

function validateProjectId(req, res, next) {
  dbP
    .get(req.params.id)
    .then(checkId => {
      if (checkId) {
        req.checkId = checkId;
        next();
      } else {
        res.status(400).json({ error: "Project ID may not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not verify action ID" });
    });
}

module.exports = router;
