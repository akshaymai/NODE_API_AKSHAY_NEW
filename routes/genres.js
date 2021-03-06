const {Genre, validate} = require('../models/genre');
const asynctrycatch=require('../Middleware/trycatchMiddleware')
const express = require('express');
const _=require('lodash')
const router = express.Router();

router.get('/',   async (req, res) => {
   
 
    const genres = await Genre.find().sort('name').limit(40).skip(2);
    res.send(genres);
   

});



router.post('/postgenro',asynctrycatch( async (req, res,next) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre(req.body);
    genre = await genre.save();
    res.send(_.pick(genre,['name']));
}));

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
router.put('/:id', async (req, res,next) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

   
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
      new: true
    });
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    res.send(genre);
   
   
 
});

router.delete('/:id', async (req, res,next) => {

 
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
 
});

router.get('/:id', async (req, res,next) => {
 
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
 

    
  
});

module.exports = router;