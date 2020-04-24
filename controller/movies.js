const models = require('../models')

const getAllMovies = async (req, res) => {
  const movies = await models.Movies.findAll({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      }
    ]
  })

  return res.status(200).send(movies)
}

const getMovieById = async (req, res) => {
  const movie = await models.Movies.findOne({
    include: [
      {
        model: models.Directors,
      },
      {
        model: models.Genres,
      }
    ],
    where: { id: req.params.filter, }
  })

  return res.status(200).send(movie)
}

const getDirectorById = async (req, res) => {
  const director = await models.Directors.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Genres
        }
      }
    ],
    where: { id: req.params.filter, }
  })

  return director ? res.status(200).send(director) : res.sendStatus(404)

}

const getGenreById = async (req, res) => {
  const genre = await models.Genres.findAll({
    include: [
      {
        model: models.Movies,
        include: {
          model: models.Directors
        }
      }
    ],
    where: { id: req.params.filter, }
  })

  return genre ? res.status(200).send(genre) : res.sendStatus(404)

}

const postNewMovie = async (req, res) => { //in progress
  const { title, directors, releaseDate, rating, runTime, genres } = req.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    res.status(400).send("The following attributes are required: title, directors, releaseDate, rating, runTime, genres.")
  } else {
    const isMovieFound = models.Movies.findOne({ where: { title: title } })
    if (isMovieFound != null) { return res.status(201).send('The Movie is already in the Database, Thank you!') }

    //If the movie is not in database the create
    const newMovie = models.Movies.create({ title, releaseDate, rating, runTime })
    const id = newMovie.id

    const isDirectorFound = models.Directors.findOne({ where: { director: director } })
    if (isDirectorFound == null) {
      const newDirector = models.Directors.create({ directors })
      const directorId = newDirector.id
      const movieToDirector = models.MoviesDirectors.create({ id, directorId })
    } else {
      const directorId = isDirectorFound.id
      const movieToDirector = models.MoviesDirectors.create({ id, directorId })
    }

    const isGenreFound = await models.Genres.findOne({ where: { genre: genre } })
    if (isGenreFound == null) {
      const newGenre = models.Genres.create({ genres })
      const genresId = newGenre.id
      const movieToGenre = await models.MoviesGenres.create({ id, genresId })
    } else {
      const genresId = isGenreFound.id
      const movieToGenre = await models.MoviesGenres.create({ id, genresId })
    }


    return res.status(201).send(newMovie)
  }
}

module.exports = { getAllMovies, getMovieById, getDirectorById, getGenreById, postNewMovie }