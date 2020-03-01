const Joi = require('@hapi/joi');
const {mongoose} = require('../connection');
const Schema=mongoose.Schema;
const GenraSchema=new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }

})

const Genre = mongoose.model('Genre',GenraSchema);

function validateGenre(genre) {
  const schema =  Joi.object({

    name: Joi.string().min(3).required()
  })

  return schema.validate(genre);
}

exports.Genre = Genre; 
exports.validate = validateGenre;
exports.GenraSchema=GenraSchema;