const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
})

module.exports.handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err))
}

module.exports.handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json({ entries: entries[0] })
    })
    .catch(err => res.status(400).json(err))
}
