const mongoose = require("mongoose");

// Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, "Contact name is required"],
  },
  number: {
    type: String,
    required: [true, "Contact phone number is required"],
    validate: {
      validator: function (value) {
        return /^(\d{2}-\d+|\d{3}-\d+)$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
