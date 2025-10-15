const express = require("express");

const router = express.Router();

let movies = [
  { id: 1, title: 'Batman The Dark Knight', year: 2008, category: 'Acción' },
  { id: 2, title: 'Se7en', year: 1995, category: 'Crimen' },
  { id: 3, title: 'Interestellar', year: 2014, category: 'Ciencia Ficción' },
  { id: 4, title: 'Rocky', year: 1976, category: 'Deporte' },
  { id: 5, title: 'Capitan America y El Soldado del Invierno', year: 2014, category: 'Acción' },
  { id: 6, title: 'Spider-Man: A través del Spider-Verso', year: 2023, category: 'Acción' },
];

router.get('/', (req, res) => {
  res.json(movies);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(m => m.id == id);
  if(movie){
    res.json(movie);
  }else{
    res.status(404).json({message: "Movie Not Found"});
  }
});

router.post('/', (req, res) => {
  const { title, year, category } = req.body;
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    category
  };
  movies.push(newMovie);
  res.status(201).json({
    message: 'created',
    data: newMovie
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, year, category } = req.body;
  const movie = movies.find(m => m.id == id);
  if(movie){
    if(title) movie.title = title;
    if(year) movie.year = year;
    if(category) movie.category = category;
    res.json({
      message: 'updated',
      data: movie
    });
  }else{
    res.status(404).json({ message: 'Movie Not Found' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(m => m.id == id);
  if(movieIndex !== -1){
    movies.splice(movieIndex, 1);
    res.json({
      message: 'deleted',
      id
    });
  }else{
    res.status(404).json({ message: 'Movie Not Found' });
  }
});


module.exports = router;
