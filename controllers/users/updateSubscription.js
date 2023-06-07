const { User } = require("../../models/user");

const { ctrlWrapper } = require("../../decorators");

const updateSubscription = async (req, res) => {
  const { id } = req.params;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json(result);
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
