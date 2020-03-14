const mongoose=require('mongoose')
const winston=require('winston')
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/MoshApi',
{useCreateIndex:true,useUnifiedTopology: true , useNewUrlParser: true})
.then(()=>{
    winston.info('conneted sucessfully')
}) 

module.exports={mongoose}