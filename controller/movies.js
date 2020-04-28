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
    where: { id: req.params.id, }
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
    where: { id: req.params.id, }
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
    where: { id: req.params.id, }
  })

  return genre ? res.status(200).send(genre) : res.sendStatus(404)

}

const patchMovie = async (req, res) => {
  return res.sendStatus(204)
}

const deleteMovieById = async (req, res) => {
  id = req.params.id

  await models.MoviesDirectors.destroy({
    where: {
      movieId: id
    }
  })

  await models.MoviesGenres.destroy({
    where: {
      movieId: id
    }
  })

  await models.Movies.destroy({
    where: {
      id: id
    }
  })

  return res.status(204).send(`Movie at is ${id} has been deleted succesfully!`)
}

const postNewMovie = async (req, res) => { //in progress
  const { title, directors, releaseDate, rating, runTime, genres } = req.body
  console.log(title + ' ' + directors)

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    res.status(400).send("The following attributes are required: title, directors, releaseDate, rating, runTime, genres.")
  } else {
    const isMovieFound = await models.Movies.findOne({ where: { title: title, releaseDate: releaseDate } })

    //If movie is in the database already
    if (isMovieFound !== null) { return res.status(201).send('The Movie is already in the Database, Thank you!') }

    //If the movie is not in database the create
    const newMovie = await models.Movies.create({ title, releaseDate, rating, runTime })
    const movieId = newMovie.id

    const newDirector = await handleDirector(movieId, directors)
    const newGenre = await handleGenre(movieId, genres)

    return res.status(201).send({ movie: newMovie, director: newDirector, genre: newGenre })
  }
}

const isMovieFound = async (title, releaseDate) => {
  return 0
}

const handleDirector = async (movieId, director) => {
  const isDirectorFound = await models.Directors.findOne({ where: { director: director } })
  console.log(isDirectorFound)
  if (isDirectorFound === null) {
    const newDirector = await models.Directors.create({ director })
    const directorId = newDirector.id
    const movieToDirector = await models.MoviesDirectors.create({ movieId, directorId })
    return newDirector
  } else {
    const directorId = isDirectorFound.id
    const movieToDirector = await models.MoviesDirectors.create({ movieId, directorId })
    return isDirectorFound
  }
}

const handleGenre = async (movieId, genres) => {
  const isGenreFound = await models.Genres.findOne({ where: { genres: genres } })
  if (isGenreFound === null) {
    const newGenre = await models.Genres.create({ genres })
    const genreId = newGenre.id
    const movieToGenre = await models.MoviesGenres.create({ movieId, genreId })
    return newGenre
  } else {
    const genreId = isGenreFound.id
    const movieToGenre = await models.MoviesGenres.create({ movieId, genreId })
    return isGenreFound
  }
}

module.exports = { getAllMovies, getMovieById, getDirectorById, getGenreById, postNewMovie, patchMovie, deleteMovieById }