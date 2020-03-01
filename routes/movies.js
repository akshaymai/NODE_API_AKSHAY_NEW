const {Movies,MoviesscheamValidte} = require('../models/Movies');
const {Genre}=require('../models/genre')
const express = require('express');
const _=require('lodash')
const router = express.Router();
const  {ObjectID}=require('mongodb')
router.get('/', async (req, res) => {
  const Movie = await Movies.find().sort('title');
  res.send(Movie);
});

router.post('/postMovies', async (req, res) => {
  const { error } = MoviesscheamValidte(req.body); 


  
  if (error) return res.status(400).send(error.details[0].message);
  

  let ids=ObjectID(req.body.genre)
  let Genro=await Genre.findById(ids)

  if(!Genro) return res.status(400).send('Genro not found');
 
try {
  
  let Movie = new Movies({
    title:req.body.title,
    genre:{
      _id:Genro._id,
      name:Genro.name
    },
    numberinStoke:req.body.numberinStoke,
    dailyRentalRate:req.body.dailyRentalRate
  });
  Movie = await Movie.save()
  
  res.send(Movie);
} catch (error) {
  res.status(500).send(error.errors)
}
 
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});


router.get('/typeMovies', async(req,res)=>{
  try {
    const Movie = await Movies.find()
    res.send(Movie);
  } catch (error) {
    res.send(error)
  }
  
})
module.exports = router;