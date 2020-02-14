const express = require("express");

const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

//GET projects
router.get("/", (req, res) => {
  dbP
    .get()
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ error: "Projects content not found." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not GET projects." });
    });
});

//POST to projects
router.post("/", validateProject, validateProjectId, (req, res) => {
  const body = req.body;
  dbP
    .insert(body)
    .then(project => {
      if (body) {
        res.status(201).json(project);
      } else {
        res.status(400).json({ error: "Missing name and description." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error adding project" });
    });
});

// custom middleware
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

function validateProject(req, res, next) {
  if (req.body) {
    next();
  } else if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Missing required information--name, description" });
  } else {
    res.status(400).json({ message: "Missing user data" });
  }
}

function validateProject() {}

module.exports = router;
