const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// create a new comment
router.post("/", withAuth, async (req, res) => {
  const body = req.body;

  console.log(req.session)

  try {
    const newComment = await Comment.create({
      ...body,
      user_id: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
