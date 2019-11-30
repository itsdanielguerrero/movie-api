const express = require('express')
const app = express()
const models = require('./models')
const PORT = process.env.PORT || 1338

app.get('/movies', (req, res) => {
    models.Movies.findAll({
        //attributes: ['title', 'directors'],
        include: [{model: models.MoviesDirectors}]
        //          {model: models.MoviesGenres, include: models.Genres}]
    }).then((movie) => {
        res.send(movie)
    })
    /*
inner join moviesDirectors as md on md.movieId = m.id
inner join moviesGenres as gd on gd.movieId = m.id
inner join directors as d on d.id = directorId
inner join genres as g on g.id = genresId
    */
})

app.get('/', (req, res) => {
    res.send("Welcome to my Movie App!!!")
})

app.all('*', (req, res) => {
    res.send("Oops looks like you did not find what you were looking for...")
})

app.listen(PORT, () => {
    console.log("Server is up and running!")
})