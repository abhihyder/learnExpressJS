const { Post } = require("../../Schemas/Models");

const PostController = {};

PostController.index = async (req, res) => {
  try {
    const posts = await Post.find({user:{ $subquery : {status: 0}}}).populate("user", "name -_id").select({ _id: 0 });
    res.send({ data: posts });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

PostController.store = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      user: req.auth_user.id,
    });
    await newPost.save();
    res.status(200).send({ message: "Post created successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong!" });
  }
};

module.exports = PostController;
