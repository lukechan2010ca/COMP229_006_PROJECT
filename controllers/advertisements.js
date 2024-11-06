let AdvertisementModel = require('../models/advertisements');

module.exports.create = async function (req, res, next) {
    try {
        let newAd = new AdvertisementModel(req.body);
        let result = await AdvertisementModel.create(newAd);
        res.json({
            success: true,
            message: 'Advertisement created successfully.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.list = async function (req, res, next) {
    try {
        let list = await AdvertisementModel.find({});
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.get = async function (req, res, next) {
    try {
        let adID = req.params.advertisementID;
        req.advertisement = await AdvertisementModel.findOne({ _id: adID });
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    res.json(req.advertisement);
};

module.exports.update = async function (req, res, next) {
    try {
        let adID = req.params.advertisementID;
        let updateAd = new AdvertisementModel(req.body);
        updateAd._id = adID;

        let result = await AdvertisementModel.updateOne({ _id: adID }, updateAd);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: 'Advertisement updated successfully.'
            });
        } else {
            throw new Error('Advertisement not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.remove = async function (req, res, next) {
    try {
        let adID = req.params.advertisementID;
        let result = await AdvertisementModel.deleteOne({ _id: adID });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: 'Advertisement deleted successfully.'
            });
        } else {
            throw new Error('Advertisement not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
