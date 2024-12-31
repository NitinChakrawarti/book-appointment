const express = require('express');
const router = express.Router();

router.use('/user', require('./allRoutes/user.route').router);

module.exports = router;