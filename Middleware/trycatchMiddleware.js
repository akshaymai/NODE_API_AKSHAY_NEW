module.exports=function (handeler){

    
return async(req,res,next)=>{

try {
await handeler(req,res)
} catch (error) {
    next(error)
}
}
}


