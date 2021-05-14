const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// const validateRegister = reqsuire("./validations");
// const validateLogin = reqsuire("./validations");
const { validateRegister, validateLogin } = require("./validations");
router.post("/register", async (reqs, res) => {
  const { error } = validateRegister(reqs.body);

  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.find({ email: reqs.body.email });
  //return res.send(emailExists)
  if (emailExists.length != 0) {
    return res.status(400).send("email is already registerd");
  }

  const hashPassword = await bcrypt.hash(reqs.body.password, 10);

  user = new User({
    name: reqs.body.name,
    email: reqs.body.email,
    password: hashPassword,
  });

  user
    .save()
    .then(res.send(user))
    .catch((err) => res.send(err));
});

router.post("/login", async (reqs, res) => {
  const { error } = validateLogin(reqs.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.find({ email: reqs.body.email });
  if (user.length == 0) {
    return res.status(400).send("email is not registerd");
  }

  const validPass = await bcrypt.compare(reqs.body.password, user[0].password);
  if (!validPass) return res.status(400).send("Wrong Password..!");

  // ceate and assign token
  const token = jwt.sign({ _id: user[0].id }, process.env.tokenSecret);
  //res.send(user);
  res.header("auth-token", token).send(token);

  //res.send("Logged In");
});

module.exports = router;
