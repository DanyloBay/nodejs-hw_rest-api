const { model, Schema } = require("mongoose");
const joi = require("joi");

const handleMongooseError = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateStatusSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
