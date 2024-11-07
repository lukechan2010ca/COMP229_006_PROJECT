var express = require('express');
var router = express.Router();

let questionsController = require('../controllers/questions');
let authController = require('../controllers/auth');

/* GET questions listing. */
router.get('/list', questionsController.list);
router.post('/create', questionsController.create);
router.get('/get/:questionID', questionsController.get, questionsController.getByID);

// Add authentication middleware to restrict answering to questions
router.put('/answer/:questionID', authController.requireSignin, questionsController.performAnswer);

router.delete('/delete/:questionID', authController.requireSignin, questionsController.remove);

module.exports = router;
