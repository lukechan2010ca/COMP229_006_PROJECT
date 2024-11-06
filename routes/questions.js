var express = require('express');
var router = express.Router();

let questionsController = require('../controllers/questions');

/* GET questions listing. */
router.get('/list', questionsController.list);
router.post('/create', questionsController.create);
router.get('/get/:questionID', questionsController.get, questionsController.getByID);
router.put('/edit/:questionID', questionsController.update);
router.delete('/delete/:questionID', questionsController.remove);

module.exports = router;