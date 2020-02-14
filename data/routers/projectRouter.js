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

//GET actions of a project by its ID
router.get("/:id/actions", validateProjectId, (req,res) => {
    dbP.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Could not retrieve actiosn with this project ID'});
    })
}); 

//POST to projects
router.post("/", (req, res) => {
    const body = { ...req.body};
  dbP
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error adding project" });
    });
});

//DELETE project at _/api/projects/:id_
router.delete("/:id", validateProjectId, (req,res) => {
    const { id } = req.params;
    dbP.remove(id)
    .then(project => {
        res.status(200).json({message: `Project ${project} at id# ${id} was deleted.`});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Could not delete project" });
      });
});

//UPDATE project at _/api/projects/:id_
router.put('/:id', validateProject, validateProjectId, (req,res) => {
    const body = {...req.body};
    const {id} = req.params;
    dbP.update(id,body)
    .then(updated => {
      res.status(201).json(updated);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not update project." });
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
    res.status(404).json({ message: " ID may not exist" });
  }
}

function validateProject() {}

module.exports = router;
