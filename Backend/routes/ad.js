var express = require('express');
var router = express.Router();

let adController = require('../controllers/ad');
let authController = require('../controllers/auth');



router.get('/list', adController.adList);

router.get('/get/:id', adController.getAdById);

router.put('/edit/:id', authController.requireSignin, adController.processEdit);

router.put('/disable/:id', authController.requireSignin, adController.performDisable);

router.put('/enable/:id', authController.requireSignin, adController.performEnable);

router.post('/add', authController.requireSignin, adController.processAdd);

module.exports = router;