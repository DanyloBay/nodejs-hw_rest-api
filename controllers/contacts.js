const { Contact } = require("../models/contact");
const { ctrlWrapper, errorHandler } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const { favorite } = req.query;
  console.log(favorite);
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email subscription");
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);

  if (!result) {
    throw errorHandler(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  return res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw errorHandler(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw errorHandler(404, "Not Found");
  }
  return res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw errorHandler(404, "Not Found");
  }
  return res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
