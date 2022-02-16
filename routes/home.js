const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Login",
    isHome: true,
    place: "Sign in please",
  });
});

module.exports = router;
