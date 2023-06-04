const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const app = express();
const User = require("./userModel");
const Form = require("./formModel");

//using public files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to the database

mongoose.connect(
  "mongodb+srv://tanver:tanver@cluster0.fjuwa.mongodb.net/?retryWrites=true&w=majority"
);

let db = mongoose.connection;
db.on("err", () => {
  console.log("Error while connecting to the database");
});
db.once("open", () => {
  console.log("connected to the database");
});

app.post("/register", async (req, res) => {
  try {
    const users = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const registered = await users.save();

    res.redirect("login.html");
  } catch (err) {
    res.send(err);
  }
});

app.post("/admission", async (req, res) => {
  try {
    const forms = new Form({
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      nationality: req.body.nationality,
      passport: req.body.passport,
      email: req.body.email,
      phone: req.body.phone,
      institute: req.body.institute,
      programme: req.body.programme,
      cgpa: req.body.cgpa,
    });

    const registered = await forms.save();

    // res.redirect("login.html");
    res.send("Admission successfull !");
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const useremail = await User.findOne({ username: username });
    if (useremail.password === password) {
      res.redirect("form.html");
    } else {
      res.send("invalid log in details");
    }
  } catch (err) {
    res.send("Invalid log in Details");
  }
});

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  return res.redirect("Admission.html");
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
