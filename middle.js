const {validationResult} = require('express-validator');

const validate = validations => {
    return async (req, res, next) => {
        for (let validate of validations) {
            const error = await validate.run(req);
            if (error) break;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({error: errors.array()});
            return;
        }
        next();
        return;
    }
};

module.exports = validate;