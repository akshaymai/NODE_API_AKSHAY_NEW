const {Rental,validateRental}=require('../models/rental')
const {Customer}=require('../models/customer')
const {Movies}=require('../models/Movies')
const express=require('express')
const {ObjectID}=require('mongodb')
const fawn=require('fawn')
const {mongoose}=require('../connection')
const router=express.Router()

fawn.init(mongoose)
router.get('/',async(req,res)=>{
    const rental=await Rental.find()
    res.status(201).send(rental)
})

router.post('/postrental',async(req,res)=>{
const {error}=validateRental(req.body)
if(error) return res.status(500).send(error)
let idscus=ObjectID(req.body.customer)
let customer= await Customer.findById(idscus)
let idsmovie=ObjectID((req.body.movie))
let movie=await Movies.findById(idsmovie)

if(!customer) return res.status(500).send('customer is not found')
if(!movie) return res.status(500).send('movie not found')
 
if(movie.numberinStoke===0) return res.status(500).send('movie is not in stock')
try {
    let rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate,
            genre:movie.genre,

        }
        })
        
    //   rental=  await rental.save();
      
 
    //     movie.numberinStoke--;
        
    //     movie.save()


new fawn.Task()
        .save('rental',rental)
        .update('movies',{_id:movie._id},{
            $inc:{numberinStoke:-1}
        })
        .run()

        
         res.send(rental)
} catch (error) {
    res.status(500).send(error)
}

 

})


module.exports=router




// const {Rental} = require('../models/rental'); 
// const {Movies} = require('../models/Movies'); 
// const {Customer} = require('../models/customer'); 
// const {mongoose} = require('../connection');
// const express = require('express');
// const router = express.Router();

// router.get('/', async (req, res) => {
//   const rentals = await Rental.find().sort('-dateOut');
//   res.send(rentals);
// });

// router.post('/addrental', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findById(req.body.customer);
//   if (!customer) return res.status(400).send('Invalid customer.');

//   const movie = await Movies.findById(req.body.movie);
//   if (!movie) return res.status(400).send('Invalid movie.');

//   if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

//   let rental = new Rental({ 
//     customer: {
//       _id: customer._id,
//       name: customer.name, 
//       phone: customer.phone
//     },
//     movie: {
//       _id: movie._id,
//       title: movie.title,
//       dailyRentalRate: movie.dailyRentalRate
//     }
//   });
//   rental = await rental.save();

//   movie.numberInStock--;
//   movie.save();
  
//   res.send(rental);
// });

// router.get('/:id', async (req, res) => {
//   const rental = await Rental.findById(req.params.id);

//   if (!rental) return res.status(404).send('The rental with the given ID was not found.');

//   res.send(rental);
// });

// module.exports = router; 