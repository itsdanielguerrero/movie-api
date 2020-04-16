const models = require('../models')

const getAllMovies = (req, res) => {
  models.Movies.findAll({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      }
    ]
  }).then((movie) => {
    res.send(movie)
  })
}

const getMovieById = (req, res) => {
  models.Movies.findOne({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      }
    ],
    where: { id: req.params.filter, }
  }).then((movie) => {
    res.send(movie)
  })
}

const getDirectorById = (req, res) => {
  models.Directors.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Genres
        }
      }
    ],
    where: { id: req.params.filter, }
  }).then((directorReq) => {
    if (directorReq) {
      res.send(directorReq)
    } else {
      res.sendStatus(404)
    }
  })
}

const getGenreById = (req, res) => {
  models.Genres.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Directors
        }
      }
    ],
    where: { id: req.params.filter, }
  }).then((directorReq) => {
    if (directorReq) {
      res.send(directorReq)
    } else {
      res.sendStatus(404)
    }
  })
}

const postNewMovie = async (req, res) => { //in progress
  const { title, directors, releaseDate, rating, runTime, genres } = req.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    res.status(400).send("The following attributes are required: title, directors, releaseDate, rating, runTime, genres.")
  } else {
    const isMovieFound = await models.Movies.findOne({ where: { title: title } })
    if (isMovieFound != null) { res.status(201).send('The Movie is already in the Database, Thank you!') }

    //If the movie
    models.Movies.create({ title, releaseDate, rating, runTime })
    const movie = models.Movies.findOne({ where: { title: title, releaseDate: releaseDate, rating: rating, runTime: runTime } })
    console.log(movie)
    res.status(201).send('it posted check the database')
  }
}

module.exports = { getAllMovies, getMovieById, getDirectorById, getGenreById, postNewMovie }