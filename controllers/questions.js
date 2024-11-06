let QuestionModel = require('../models/questions');
let AdModel = require('../models/ad');

module.exports.create = async function (req, res, next) {
    try {
        let newQuestion = new QuestionModel(req.body);
        let result = await QuestionModel.create(newQuestion);
        res.json({
            success: true,
            message: 'Question created successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports.list = async function (req, res, next) {
    try {
        let list = await QuestionModel.find({}).populate('adId', 'title');
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.get = async function (req, res, next) {
    try {
        let qID = req.params.questionID;
        req.question = await QuestionModel.findOne({ _id: qID }).populate('adId', 'title');
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    res.json(req.question);
};

module.exports.update = async function (req, res, next) {
    try {
        let qID = req.params.questionID;
        let updateQuestion = new QuestionModel(req.body);
        updateQuestion._id = qID;

        let result = await QuestionModel.updateOne({ _id: qID }, updateQuestion);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: 'Question updated successfully.'
            });
        } else {
            throw new Error('Question not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.remove = async function (req, res, next) {
    try {
        let qID = req.params.questionID;
        let result = await QuestionModel.deleteOne({ _id: qID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: 'Question deleted successfully.'
            });
        } else {
            throw new Error('Question not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
