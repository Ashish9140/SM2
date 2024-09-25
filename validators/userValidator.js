// validators/userValidator.js
const Joi = require('joi');

// User validation schema
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(1).max(120).required(),
});

// Validation middleware for the addUser route
exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};
