const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {

  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("subscription");

  res.json(result);
};

module.exports = updateSubscription;
