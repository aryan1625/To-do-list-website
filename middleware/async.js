const asyncWrapper=(fn)=>{
    return async(req,res,next)=>{
        try {
            // const tasks=await Task.find({});
            // res.status(200).json({tasks:tasks});
            await fn(req,res,next);
        } catch (error) {
           next(error);
        }
    }
}

module.exports=asyncWrapper;