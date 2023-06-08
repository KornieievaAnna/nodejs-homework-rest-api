const { HttpError } = require("../helpers");

const validateSubscription = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(404, "Field not found"));
    }
    next();
  };
  return (func);
};

module.exports = validateSubscription;
