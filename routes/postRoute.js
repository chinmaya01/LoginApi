const router = require("express").Router();
const check = require("./check");
const verify=require('./verifyToken')
router.get("/", verify,(req, res) => {
  res.json({ posts: { title: "firstPost", description: "desc" } });
});
router.get("/a", check,(req, res) => {
  res.json({ posts: { title: "firstPost", description: "desc" } });
});

module.exports = router;
