const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;  

app.use(bodyParser.json());

let movies = [
    { id: 1, title: "Inception", genre: "Sci-Fi", releaseYear: 2010, rating: 8.8 },
    { id: 2, title: "The Matrix", genre: "Sci-Fi", releaseYear: 1999, rating: 8.7 },
    { id: 3, title: "The Shawshank Redemption", genre: "Drama", releaseYear: 1994, rating: 9.3 }
];


app.get('/', (req, res) => {
    res.send('Welcome to the Movies API! Use /movies to access the movie list.');
});


app.get('/movies', (req, res) => {
    res.json(movies);
});


app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
});


app.post('/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating
    };
    movies.push(movie);
    res.status(201).json(movie);
});


app.patch('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    movie.rating = req.body.rating;
    res.json(movie);
});


app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Movie not found');
    movies.splice(movieIndex, 1);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
