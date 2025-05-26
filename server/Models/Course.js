const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    // required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
