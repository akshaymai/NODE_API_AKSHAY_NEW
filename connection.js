const mongoose=require('mongoose')
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/MoshApi',
{useCreateIndex:true,useUnifiedTopology: true , useNewUrlParser: true})
.then(()=>{
    console.log('conneted sucessfully')
}).catch(()=>{
    console.log('not conneted')
})

module.exports={mongoose}