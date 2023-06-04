let mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  nationality: String,
  passport: String,
  email: String,
  phone: String,
  institute: String,
  programme: String,
  cgpa: String,
});

const Form = new mongoose.model("Form", formSchema);

module.exports = Form;
