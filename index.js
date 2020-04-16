const express = require('express')
const app = express()
const models = require('./models')
const PORT = process.env.PORT || 1338

app.use(express.json())
app.use(express.static('public'));
//app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.sendStatus(200)
})

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
        where: { id: req.params.filter, }
    }).then((movie) => {
        res.send(movie)
    })
})

//**POST /movies** - this route should accept a JSON formatted movie an add that movie to the database. 
//The body of the request should match the following format:
//```json
//{ "title": "Only Lovers Left Alive", "directors": "Jim Jarmusch", "releaseDate": "2013-12-25", "rating": "R", "runTime": 123, "genres": "Drama, Musical" }
//```
app.post('/movies', async (req, res) => { //in progress
    const { title, directors, releaseDate, rating, runTime, genres } = req.body

    if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
        res.status(400).send("The following attributes are required: title, directors, releaseDate, rating, runTime, genres.")
    } else {
        const isMovieFound = await models.Movies.findOne({ where: { title: title } })
        if (isMovieFound != null) { res.status(201).send('The Movie is already in the Database, Thank you!') }

        res.status(201).send('it posted check the database')
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
        where: { id: req.params.filter, }
    }).then((directorReq) => {
        if (directorReq) {
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
        where: { id: req.params.filter, }
    }).then((directorReq) => {
        if (directorReq) {
            res.send(directorReq)
        } else {
            res.sendStatus(404)
        }
    })
})

app.all('*', (req, res) => {
    res.send("Oops looks like you did not find what you were looking for...")
})

app.listen(PORT, () => {
    console.log("Server is up and running!")
})