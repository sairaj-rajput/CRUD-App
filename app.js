const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/user-model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, role, email, password, image } = req.body;
  try {
    const user = await userModel.create({
      username,
      role,
      email,
      password,
      image,
    });
    await user.save();
    res.redirect("/read");
    console.log(`user saved ${user}`);
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("read", { users: users });
  } catch (error) {
    console.log(error);
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.render("edit", { user: user });
  } catch (error) {
    console.log(error);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const user = await userModel.findOneAndDelete(req.params.id);
    res.redirect("/read");
  } catch (error) {
    console.log(error);
  }
});

app.post("/update/:id", async (req, res) => {
  let { username, role, email, bio} = req.body;
  try {
   const upadatedUser = await userModel.findOneAndUpdate({_id : req.params.id},{
     username,
     role,
     email,
     bio,
     new : true,
   });
    res.redirect(`/edit/${upadatedUser._id}`);
  } catch (error) {
    console.log(error);
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT http://localhost:${PORT}`);
});
