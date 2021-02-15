const router = require('express').Router();
let Meme = require('../models/meme.model');

router.route('/').get((req, res) => {
  Meme.find()
    .then(memes => res.json(memes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const likes = Number(req.body.likes);
  const image = req.body.image;

  const newMeme = new Meme({
    username,
    description,
    date,
    likes,
    image
  });

  newMeme.save()
  .then((response) => res.json(response._id))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Meme.findById(req.params.id)
      .then(meme => res.json(meme))
      .catch(err => res.status(400).json('Error 404: Meme with id ' + req.params.id + ' not found!'));
});

router.route('/:id').delete((req, res) => {
    Meme.findByIdAndDelete(req.params.id)
      .then(() => res.json('Meme deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Meme.findById(req.params.id)
      .then(meme => {
        meme.username = req.body.username;
        meme.description = req.body.description;
        meme.date = Date.parse(req.body.date);
        meme.likes = Number(req.body.likes);
        meme.image = req.body.image;
  
        meme.save()
          .then((response) => res.json(response._id))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;