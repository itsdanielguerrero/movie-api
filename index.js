const express = require('express')
const app = express()
const models = require('./models')
const PORT = process.env.PORT || 1338

app.use(express.json())

app.get('/movies', (req, res) => {
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
})

app.get('/movies/:filter', (req, res) => {
    models.Movies.findAll({
        include: [
            {
                model: models.Directors,  
            },
            {
                model: models.Genres,
            }
          ],
        where: {id: req.params.filter,}
    }).then((movie) => {
        res.send(movie)
    })
})

//**POST /movies** - this route should accept a JSON formatted movie an add that movie to the database. 
//The body of the request should match the following format:
app.post('/movies', (req, res) => { //in progress
    const {title, directors, releaseDate, rating, runTime, genres} = req.body

    if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
        respond.status(400).send("title, directors, releaseDate, rating, runTime, genres")
    } else {
        models.Movies.create({title, releaseDate, rating, runTime})
        models.Directors.create({directors})
        models.Genres.create({genres})
        models.MoviesDirectors.create()
        models.MoviesGenres.create()
    }
})


//**GET /directors/X** -(where X is a numeric ID) this route should return the 
//single director associated with the ID represented by X including all of the movies they directed

app.get('/directors/:filter', (req, res) => {
    models.Directors.findAll({
        include: [           
            {
                model: models.Movies,
                include: {
                    model: models.Genres
                }
            }          
        ],
        where: {id: req.params.filter,}
    }).then((directorReq) => {
        if (directorReq){
            res.send(directorReq)
        } else {
            res.sendStatus(404)
        }
    })
})

//**GET /genre/Y** - (where Y is the name of a genre, ex. drama) this route should return the single genre 
//named in the URL including all of the movies that fall into that genre
app.get('/genre/:filter', (req, res) => {
    models.Genres.findAll({
        include: [           
            {
                model: models.Movies,
                include: {
                    model: models.Directors
                }
            }          
        ],
        where: {id: req.params.filter,}
    }).then((directorReq) => {
        if (directorReq){
            res.send(directorReq)
        } else {
            res.sendStatus(404)
        }
    })
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