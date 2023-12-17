const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Post, Comment } = require("../models");

// GET all blog posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [User],
    });

    const postInfo = dbPostData.map((post) => post.get({ plain: true }));

    console.log(req.session.loggedIn)

    res.render("all-post", { postInfo, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
router.get("/blogpost/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Check if the logged-in user is the owner of the post
    const isPostOwner = dbPostData && req.session.userId === dbPostData.user_id;

    const post = dbPostData.get({ plain: true });

    console.log(post);

    res.render("single-post", { post, loggedIn: req.session.loggedIn, isPostOwner });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {

    const dbUserPostData = await Post.findAll({where: {user_id: req.session.userId}});

    const userHistory = dbUserPostData.map((post) => post.get({ plain: true }));

    // console.log(userHistory);

    res.render("user-posts", { layout: "dashboard", data: { userHistory } })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/new-post", withAuth, (req, res) => {
  res.render("new-post", { loggedIn: req.session.loggedIn });
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
