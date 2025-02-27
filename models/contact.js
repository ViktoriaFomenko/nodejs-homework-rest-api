const { Schema, model } = require("mongoose");

const Joi = require("joi")

const { handleSaveErrors } = require("../helpers")



const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
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
}, { versionKey: false, timestamps: true })


contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': `"name" should be a type of 'string'`,
    'any.required': `"name" is a required field`
  }),
  email: Joi.string().required().messages({
    'string.base': `"email" should be a type of 'string'`,
  }),
  phone: Joi.string().required().messages({
    'string.base': `"phone" should be a type of 'string'`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Contact = model("contact", contactSchema)

module.exports = {
  Contact,
  schemas,
};

