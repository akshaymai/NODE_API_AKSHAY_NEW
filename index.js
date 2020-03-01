const http=require('http')
const express=require('express')
const Joi=require('@hapi/joi')
const morgan=require('morgan')
const config=require('config')

const db=require('debug')('app:startup')
const message=require('debug')('app:message')
const port=process.env.PORT||8988;
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
if(app.get('env')==='development'){
    app.use(morgan('tiny')) 
    message('message get sucessfully...')
    
}
db('akshay maity')


app.use('/customers',require('./routes/customers'))

app.use('/genro',require('./routes/genres'))
app.use('/movies',require('./routes/movies'))
app.use('/rental',require('./routes/rental'))
// console.log("host",config.get('name'))
// console.log("host",config.get('mail.host'))
// console.log("host",config.get('mail.password'))



// console.log(app.get('env'))
// console.log(process.env.NODE_ENV)
// app.use(function (req,res,next){
//  const err=new Error('not found')

//  err.status=404;
//     next(err)
// })

// app.use(function(req,res,next){

//     res.status(500||err.status)
//     res.json({
//    Message:'dhhbdd'

//     })
//     next()   

// })




// const arr=[{
//     Name:"akshay",
//     Dept:"IT",
//     Id:1
// },{
//     Name:"raju",
//     Dept:"BBA",
//     Id:10
// },{
//     Name:"arijit",
//     Dept:"CSE",
//     Id:100
// },{
//     Name:"Arnab",
//     Dept:"Cse",
//     Id:1000
// },{
//     Name:"anirban",
//     Dept:"Cse",
//     Id:121
// }]


// app.get('/',(req,res)=>{
//     res.send(arr);
// })



// app.post('/add',(req,res)=>{
  
    
// const Schema=Joi.object({
//     Name:Joi.string().min(3).max(98).required().label('Name requried'),
//     Dept: Joi.string().min(3).max(98).required().label('Dept Reqqured'),  
//     Id:Joi.number().min(3).max(98).label('ID Reqqured').required()
//    })
   
//      const result= Schema.validate(req.body)
//      console.log(result)

// const {error,value}=validatecourese(req.body)
   
//    if(error)
//    {
//        res.status(400).send(error.details[0].message);
//        return;
//    }
   
// const newarr={
//     Name:req.body.Name,
//     Dept:req.body.Dept,
//     Id:req.body.Id
// }
 
// arr.push(newarr)
// const reg=arr.length;
// res.status(200).json({
//     TotalLEngth:reg,
//     Response:newarr
// })
// })




// app.get('/getparams/:year/:month/:day',(req,res)=>{

//     res.send(req.query)
    
//     })




// app.get('/getbyid',(req,res)=>{
  
    

//     const user=arr.find((ids)=>ids.Name===req.query.Name)
//     if(!user) return res.send('user not found')
//     res.send(user)
// })



// app.delete('/deleteuser',(req,res)=>{
//     const user=arr.find((ids)=>ids.Name===req.query.Name)
//     if(!user) return res.send('user not found')

//     arr.splice(arr.indexOf(user),1)
//     res.status(200).json({

//         Message:"Delete sucessfully",
//         length:arr.length,
//         NewArr:arr
//     })

// })





// app.put('/updateuser',(req,res)=>{

//     const user=arr.find((ids)=>ids.Name===req.query.Name)
//     if(!user) return res.send('user not found')
//     user.Dept=req.body.Dept,
//     user.Id=req.body.Id,
//     user.Name=req.body.Name


//     res.status(200).json({

//         Message:"updateuser sucessfully",
//         length:arr.length,
//         NewArr: user
//     })


// })



// function validatecourese(user){
//     const schema=Joi.object({
//         Name:Joi.string().min(3).max(98).required().label('Name requried'),
//         Dept: Joi.string().min(3).max(98).required().label('Dept Reqqured'),  
//         Id:Joi.number().min(3).max(98).label('ID Reqqured').required()
//     })
//    return schema.validate(user)

// }

 


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

