var express = require('express');

var routers = express.Router();

routers.use(function(req, res) {
    res.send('hello world');
});
module.exports = routers;