const express = require('express')
const app = express()
const { getAllMovies, getMovieById, getDirectorById, getGenreById, postNewMovie, patchMovie, deleteMovieById } = require('./controller/movies')
const PORT = process.env.PORT || 1338

app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

//Get ALL movies in the database
app.get('/movies', getAllMovies)

//Get a movie by id
app.get('/movies/:id', getMovieById)

//Get a director and all his/her movies by id
app.get('/directors/:id', getDirectorById)

//Get a genre and all movies in that category by id
app.get('/genre/:id', getGenreById)

//Post new movie with all required information
app.post('/movies', postNewMovie)

app.patch('/movies', patchMovie)

app.delete('/movies/:id', deleteMovieById)


app.all('*', (req, res) => {
    res.send("Oops looks like you did not find what you were looking for...")
})

app.listen(PORT, () => {
    console.log("Server is up and running!")
})