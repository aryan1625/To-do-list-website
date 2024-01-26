const {CustomError}=require('../errors/custom-error');  
const errorfn=(error,req,res,next)=>{
    if(error instanceof CustomError){
        return res.status(error.statusCode).send({msg: error.message})
    }
    return res.status(500).json({msg: "something went wrong!"});
}
module.exports=errorfn; 