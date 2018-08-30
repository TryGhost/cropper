const {Url} = require('url');
const got = require('got');
const pump = require('pump');
const sharp = require('sharp');

module.exports = function createSharpMiddleware(opts = {}) {
    if (!opts.errors) {
        opts.errors = {};
    }
    const allowedCrops = ['entropy', 'attention', 'default'];
    const MissingImageErrorMessage = opts.errors.missing_image || 'Missing image query param';
    const MissingDimensionErrorMessage = opts.errors.missing_dimensions || 'Missing one of width or height query param';
    const InvalidUrlErrorMessage = opts.errors.invalid_url || 'Image param value must be a URL';
    const InvalidCropTypeErrorMessage = opts.errors.invalid_crop_type || 'Crop param value must be one of ' + allowedCrops;

    return function sharpMiddleware(req, res) {
        let {image,width,height,crop} = req.query;

        if (!image) {
            return res.status(400).send(MissingImageErrorMessage);
        }
        if (!width && !height) {
            return res.status(400).send(MissingDimensionErrorMessage);
        }
        if (crop && !allowedCrops.includes(crop)) {
            return res.status(400).send(InvalidCropTypeErrorMessage);
        }

        if (width) {
            width = +width;
        }

        if (height) {
            height = +height;
        }

        try {
            new Url(image);
        } catch (e) {
            return res.send(400, InvalidUrlErrorMessage);
        }

        const transformer = sharp()
            .resize(width, height)
            .crop(sharp.strategy[crop]);

        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        });

        pump(got.stream(image), transformer, res, function (err) {
            if (err) {
                res.send(err.message);
            }
        });
    };
};
