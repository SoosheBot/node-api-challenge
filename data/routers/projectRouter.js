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
router.post("/", (req,res) => {

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
        };
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not verify action ID" });
      });
  };
  
module.exports = router;
