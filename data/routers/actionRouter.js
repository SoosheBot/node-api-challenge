const express = require("express");

const dbA = require("../helpers/actionModel");
const dbP = require("../helpers/projectModel");

const router = express.Router();

router.use(express.json());

module.exports = actionRouter;