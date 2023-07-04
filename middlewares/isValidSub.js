const { errorHandler } = require("../helpers");

const subscriptionList = ["starter", "pro", "business"];

const validSub = (req, res, next) => {
  const { subscription } = req.body;
  console.log(subscription);
  const result = subscriptionList.includes(subscription);
  if (!result) {
    throw errorHandler(404, "Enter a valid option");
  }
  next();
};

module.exports = validSub;
