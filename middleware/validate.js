const Joi = require("joi");

const contactValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(10).required(),
        phone: Joi.string().min(10).required(),
        message: Joi.string().required(),

    });
    return schema.validate(data);
};
const applyValidate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().min(10).required(),
        phone: Joi.string().min(10).required(),
        contactCode: Joi.string().min(3).required(),
        websiteURL: Joi.string().min(3),
        resume: Joi.string(),

    });
    return schema.validate(data);
};
module.exports = { contactValidate, applyValidate }

