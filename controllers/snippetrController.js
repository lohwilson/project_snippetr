const Snippetr = require('../models/snippetr.model');

module.exports = {
  listAllSnippets(req, res) {
    Snippetr.find()
      .then(snippets => res.json(snippets))
      .catch(err => res.status(400).json('Error: ' + err))
  },

  deleteSnippet(req, res) {
    Snippetr.findByIdAndDelete(req.params.id)
    .then(() => res.json('Snippet deleted!'))
    .catch(err => res.status(400).json('Error: ' + err))
  },

  updateSnippet(req, res) {
    Snippetr.findById(req.params.id)
    .then(snippet => {
      snippet = req.body
      snippet.save()
      .then(() => res.json('Snippetr updated!'))
      .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
  },

  createSnippet(req, res) {
    const { title, story, image } = req.body;
    if(!title || !story || !image) res.status(422).json({ error: "Please input required fields."})

    console.log(req.user);
    res.send("ok")
  },

  // createSnippet(req, res) {
  //   const { title, story, image } = req.body;
  //   if(!title || !story || !image) res.status(422).json({ error: "Please input required fields."})

  //   const newSnippet = new Snippetr(req.body)

  //   console.log('new snippet $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', newSnippet);
  //   newSnippet.save()
  //   .then(() => res.json('Snippet added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
  // },

  listOneSnippet(req, res) {
    Snippetr.findById(req.params.id)
    .then(snippet => res.json(snippet))
    .catch(err => res.status(400).json('Error: ' + err))
  },

  updateLikes(req, res) {
    Snippetr.findByIdAndUpdate(req.body._id, {
      $push:{likes: req.user.username}
    })
  }
}
