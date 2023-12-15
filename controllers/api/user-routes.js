const { User } = require("../../models");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
    });
    res.redirect("/");
    // User successfully created
    res
      .status(201)
      .json({ message: "Account created successfully! Please log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      console.log(dbUserData);
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log(validPassword);
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.loggedIn = true;

    req.session.save(() => {

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
