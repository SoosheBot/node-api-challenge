const express = require("express");

const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

//GET projects
router.get("/", (req,res) => {
    dbP.get()
    .then(projects => {
        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ error: "Projects content not found."})
        };
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not GET projects."});
    });
});

module.exports = projectRouter;