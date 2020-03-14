const http=require('http')
require('express-async-errors')
 require('winston-mongodb')
const winston=require('winston')
const express=require('express')
const Joi=require('@hapi/joi')
const morgan=require('morgan')
const config=require('config')
 let errs=require('./middleware/errors')
const db=require('debug')('app:startup')
const message=require('debug')('app:message')
const port=process.env.PORT||8988;
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


winston.add(new winston.transports.File({ filename: 'logfile.json' }));
// winston.add( winston.transports.MongoDB,{db:'mongodb://localhost:27017/MoshApi',
// level:'error'})
// winston.add(winston.transports.MongoDB, {db:'mongodb://localhost:27017/MoshApi'});


if(app.get('env')==='development'){
    app.use(morgan('tiny')) 
    message('message get sucessfully......')
    
}
 
process.on('uncaughtException',(ex)=>{
    console.log('uncaught exception found...')
    winston.error(ex.message,ex)
    process.exit(1)
})

// winston.exceptions.handle(new winston.transports.File({filename:'uncaughtException.json'}))
// winston.exceptions.handle(new winston.transports.File({filename:'aa.json'}))

process.on('unhandledRejection',(ex)=>{
    console.log('get a unhandle rejecrion')
    winston.error(ex.message,ex)
    process.exit(1)
})
db('akshay maity') 
app.use('/customers',require('./routes/customers'))

app.use('/genro',require('./routes/genres'))
app.use('/movies',require('./routes/movies'))
app.use('/rental',require('./routes/rental'))
app.use(errs)
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



 
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
 