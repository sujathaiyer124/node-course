const express = require('express');

const router = express.Router();
router.get ("/", (req, res, next) => {
    console.log(req.url);
    res.send('<h1>Hello from Express</h1>');
});

module.exports = router;
