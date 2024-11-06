var express = require('express');
var router = express.Router();

let adController = require('../controllers/ad');
let authController = require('../controllers/auth');


/* GET list of items */
router.get('/list', adController.adList);

// Routers for edit
router.put('/edit/:id', authController.requireSignin, adController.processEdit);

// Disable
router.put('/disable/:id', authController.requireSignin, adController.performDisable);

// Enable
router.put('/enable/:id', authController.requireSignin, adController.performEnable);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', authController.requireSignin, adController.processAdd);

module.exports = router;