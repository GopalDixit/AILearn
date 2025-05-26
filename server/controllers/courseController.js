const Course = require("../Models/Course");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

exports.createCourse = async (req, res) => {
  const { id, title, url, description, Image } = req.body;
  try {
    const newCourse = new Course({ id, title, url, description, Image });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
};
