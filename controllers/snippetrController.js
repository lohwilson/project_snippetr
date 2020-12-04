const Snippetr = require("../models/snippetr.model");

module.exports = {
  listAllSnippets(req, res) {
    Snippetr.find()
    .populate("postedBy", "_id username")
      .then((snippets) => res.json(snippets))
      .catch((err) => res.status(400).json("Error: " + err));
  },

  deleteSnippet(req, res) {
    Snippetr.findByIdAndDelete(req.params.id)
      .then(() => res.json("Snippet deleted!"))
      .catch((err) => res.status(400).json("Error: " + err));
  },

  updateSnippet(req, res) {
    Snippetr.findById(req.params.id)
      .then((snippet) => {
        snippet = req.body;
        snippet
          .save()
          .then(() => res.json("Snippetr updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  },

  createSnippet(req, res) {
    const { title, story, image, likes } = req.body;
    if (!title || !story || !image)
      res.status(422).json({ error: "Please input required fields." });

    console.log(req.user);
    const snippet = new Snippetr({
      title,
      story,
      image,
      likes,
      postedBy: req.user,
    });
    snippet
      .save()
      .then((result) => {
        res.json({ snippet: result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  mySnippets(req, res) {
    Snippetr.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username")
    .then(mySnippets => {
      res.json({mySnippets})
    })
    .catch(err => {
      console.log(err);
    })
  },

  listOneSnippet(req, res) {
    Snippetr.findById(req.params.id)
      .then((snippet) => res.json(snippet))
      .catch((err) => res.status(400).json("Error: " + err));
  },

  likeSnippet(req, res) {
    console.log(req.body);
    Snippetr.findByIdAndUpdate(req.body.id, {
      $push: { likes: req.user._id }
    },{
      new: true
    }).exec((err, result) => {
      if(err){
        return res.status(422).json({ error:err })
      } else {
        res.json(result)
      }
    })
  },

  unlikeSnippet(req, res) {
    Snippetr.findByIdAndUpdate(req.body.id, {
      $pull: { likes: req.user._id }
    },{
      new: true
    }).exec((err, result) => {
      if(err){
        return res.status(422).json({ error:err })
      } else {
        res.json(result)
      }
    })
  },
};
