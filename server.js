const express = require("express");
const app = express();
const emailer = require("./routes/EmailGenerator");
const user = require("./routes/Login");
const bodyParser = require("body-parser");
const projectRouter = require("./routes/projectInput");
const workHistoryRouter = require("./routes/workHistory");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 9000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(emailer);
app.use(user);
app.use(projectRouter);
app.use(workHistoryRouter);
app.use(express.static(path.join(__dirname, "Portfolio", "build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "Portfolio", "build", "index.html")),
);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on Port ${PORT}`);
});
