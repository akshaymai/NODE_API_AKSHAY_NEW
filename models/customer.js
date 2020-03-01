const Joi = require('@hapi/joi');
const {mongoose} = require('../connection');
const validator=require('validator');
const Schema=mongoose.Schema;
const CustomerSchema=new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    // required:true
    default: false
  },

  phone: {
    type: String,
    required: true
  }

})
const Customer = mongoose.model('Customer',  CustomerSchema)

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(0).max(50).required(),
    phone: Joi.string().regex(/^([0]|([\+][9][1]))?([6-9][0-9]{9})$/).required(),
     isGold: Joi.boolean()
  })

  return schema.validate(customer);
}

exports.Customer = Customer; 
exports.validate = validateCustomer;
exports.CustomerSchema=CustomerSchema