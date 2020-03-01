const Joi = require('@hapi/joi');
const {mongoose} = require('../connection');
const {GenraSchema}=require('../models/genre')
Joi.objectId = require('joi-objectid')(Joi)
const Schema=mongoose.Schema;
const Moviesscheam=new Schema({

    title:{
        type:String,
        required:true
    },
    genre:{
        type:GenraSchema,
        required:true
    },
    numberinStoke:{
        type:Number
    },
    dailyRentalRate:{
        type:Number,
        max:5
    }
})


const Movies=mongoose.model('Movies',Moviesscheam);


function MoviesscheamValidte(Movie){

const Schema=Joi.object({

    title:Joi.string().required().min(0).max(30),
    genre: Joi.objectId().required(),
    numberinStoke:Joi.number().required(),
    dailyRentalRate:Joi.number().required()

})
return Schema.validate(Movie)



}




module.exports={Movies,MoviesscheamValidte,Moviesscheam}