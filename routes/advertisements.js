var express = require('express');
var router = express.Router();

let advertisementsController = require('../controllers/advertisements');

/* GET advertisements listing. */
router.get('/list', advertisementsController.list);
router.post('/create', advertisementsController.create);
router.get('/get/:advertisementID', advertisementsController.get, advertisementsController.getByID);
router.put('/edit/:advertisementID', advertisementsController.update);
router.delete('/delete/:advertisementID', advertisementsController.remove);

module.exports = router;
