const express = require("express");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoutes);

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
