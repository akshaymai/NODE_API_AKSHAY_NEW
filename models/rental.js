const Joi = require('@hapi/joi');
const {mongoose} = require('../connection');
Joi.objectId = require('joi-objectid')(Joi)
const {CustomerSchema}=require('../models/customer')
const {Moviesscheam}=require('../models/Movies')
const validator=require('validator');
const Schema=mongoose.Schema;
const RentalSchema=new Schema({
  customer: {
    type: CustomerSchema,
    required:true
  },
  movie:{
      type:Moviesscheam,
      required:true
  },
  dateout:{
      type:Date,
      default:Date.now()
  },
  dailyreturend:{
      type:Date
  },
  rentalfees:{
      type:Number,
      default:0
  }

})
const Rental = mongoose.model('Rental',  RentalSchema)
 

function validateRental(rental) {
  const schema = Joi.object({
    customer: Joi.objectId().required(),
    movie: Joi.objectId().required(),
    dateout: Joi.date(),
  dailyreturend:Joi.date(),
  rentalfees:Joi.number()
  })

  return schema.validate(rental);
}
module.exports={Rental,validateRental}
// const Joi = require('@hapi/joi');
// const {mongoose}= require('../connection');

// const Rental = mongoose.model('Rental', new mongoose.Schema({
//   customer: { 
//     type: new mongoose.Schema({
//       name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//       },
//       isGold: {
//         type: Boolean,
//         default: false
//       },
//       phone: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50
//       }      
//     }),  
//     required: true
//   },
//   movie: {
//     type: new mongoose.Schema({
//       title: {
//         type: String,
//         required: true,
//         trim: true, 
//         minlength: 5,
//         maxlength: 255
//       },
//       dailyRentalRate: { 
//         type: Number, 
//         required: true,
//         min: 0,
//         max: 255
//       }   
//     }),
//     required: true
//   },
//   dateOut: { 
//     type: Date, 
//     required: true,
//     default: Date.now
//   },
//   dateReturned: { 
//     type: Date
//   },
//   rentalFee: { 
//     type: Number, 
//     min: 0
//   }
// }));

// function validateRental(rental) {
//   const schema =Joi. {
//     customerId: Joi.string().required(),
//     movieId: Joi.string().required()
//   };

//   return Joi.validate(rental, schema);
// }

// exports.Rental = Rental; 
// exports.validate = validateRental;