// const { request, response } = require("express");
const express = require("express");
const router = express.Router();

const profilesController = require('../controllers/profiles');

router.get('/test', profilesController.testFunction);

module.exports = router;