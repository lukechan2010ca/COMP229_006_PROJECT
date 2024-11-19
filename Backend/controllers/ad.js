let AdModel = require('../models/ad');

module.exports.adList = async function (req, res, next) {

    try {
        let list = await AdModel.find({}).populate('owner');
        
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.getAdById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const ad = await AdModel.findById(id).populate('owner');

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found.' });
        }

        res.json(ad);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        console.log("req.payload: ", req.auth);
        let newProduct = AdModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            createdAt: req.body.createdAt,
            isActive: req.body.isActive,
            expirationDate: req.body.expirationDate,
            tags: req.body.tags.split(",").map(word => word.trim()),
            owner: (req.body.owner == null || req.body.owner == "")? req.auth.id : req.body.owner
        });

        let result = await AdModel.create(newProduct)

        console.log(result);
        res.json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async (req, res, next) => {
    try {
        let id = req.params.id;

        // Fetch the ad by ID
        let ad = await AdModel.findById(id);

        // Check if the ad exists
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found.' });
        }

        // Check if the user is authorized to edit this ad
        if (ad.owner.toString() !== req.auth.id) {
            return res.status(403).json({ message: 'You are not authorized to edit this item.' });
        }

        // the update object
        let updatedProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            updatedAt: Date.now(),
            isActive: req.body.isActive,
            expirationDate: req.body.expirationDate,
            tags: req.body.tags.split(",").map(word => word.trim())
        };

        // Use findByIdAndUpdate to update the ad
        let result = await AdModel.findByIdAndUpdate(id, updatedProduct, { new: true, runValidators: true });

        // If the ad is updated successfully
        if (result) {
            res.json({
                success: true,
                message: "Ad updated successfully.",
                ad: result
            });
        } else {
            throw new Error('Ad not updated. Are you sure it exists?');
        }

    } catch (error) {
        next(error);
    }
}


module.exports.performDisable = async (req, res, next) => {

    try {

        let id = req.params.id;

        let ad = await AdModel.findById(id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found.' });
        }
        
        if (ad.owner.toString() !== req.auth.id) {
            return res.status(403).json({ message: 'You are not authorized to disable this item.' });
        }

        ad.isActive = false;
        await ad.save();

        res.json({
            success: true,
            message: "Ad disabled successfully."
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performEnable = async (req, res, next) => {

    try {

        let id = req.params.id;

        let ad = await AdModel.findById(id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found.' });
        }
        
        if (ad.owner.toString() !== req.auth.id) {
            return res.status(403).json({ message: 'You are not authorized to disable this item.' });
        }

        ad.isActive = true;
        await ad.save();

        res.json({
            success: true,
            message: "Ad enabled successfully."
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}