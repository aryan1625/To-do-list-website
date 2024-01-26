const Task=require('../models/Task');
const asyncWrapper=require('../middleware/async');
const {createCustomError}=require('../errors/custom-error');


const getAllTasks=asyncWrapper(async(req,res)=>{
        const tasks=await Task.find({});
        res.status(200).json({tasks:tasks});   
});


const createTask=asyncWrapper(async(req,res)=>{
    const task =await Task.create(req.body);
    res.status(201).json({task});  
});


const getTask=asyncWrapper(async(req,res,next)=>{
    const {id: taskID}=req.params;
    // const task=await Task.findOne({_id: taskID});
    const task=await Task.findById(taskID);
    if(!task){
        return next(createCustomError(`no task with id ${taskID}`,404));
        // return res.status(404).send({msg:`no task with id ${taskID}`});
    }
    res.status(200).json({task});    
});


const deleteTask=asyncWrapper(async(req,res,next)=>{
    const {id: taskID}=req.params;
    const task=await Task.findByIdAndDelete(taskID);
    if(!task){
        return next(createCustomError(`no task with id ${taskID}`,404));
        // return res.status(404).send({msg: `No task with id ${taskID}`});
    }
    //types of responses
    res.status(200).json({task});
    // res.status(200).send();
    // res.status(200).json({task: null,status: "success"});  
});


const updateTask=asyncWrapper(async(req,res,next)=>{
    const {id: taskID}=req.params;
    const task=await Task.findByIdAndUpdate(taskID,req.body,{
        new:true,
        runValidators:true
    });
    if(!task){
        return next(createCustomError(`no task with id ${taskID}`,404));
        // return res.status(404).send({msg:`No task found at id ${taskID}`});
    }
    res.status(200).json({task});
});

module.exports={
    getAllTasks,createTask,getTask,updateTask,deleteTask
};