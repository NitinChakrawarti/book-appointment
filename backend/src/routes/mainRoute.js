const express = require('express');
const router = express.Router();

router.use('/user', require('./allRoutes/user.route').router);
router.use('/notification', require('./allRoutes/alert.route.js').router);

module.exports = router;