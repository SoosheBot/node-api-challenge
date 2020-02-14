const express = require('express');
const server = express;
const helmet = require('helmet');
const cors = require('cors');



server.use(helmet());
server.use(express.json());
server.use(cors);

//init test of server on insomnia
server.get("/", (req,res) => {
    res.status(200).json({message:"Server is running."})
});

module.exports = server;