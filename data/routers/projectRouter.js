const express = require("express");

const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

module.exports = projectRouter;