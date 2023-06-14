const { HttpError } = require("../helpers");

const validateSubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("тут");
      next(HttpError(404, "Field not found"));
    }
    next();
  };
  return func;
};

module.exports = validateSubscription;
