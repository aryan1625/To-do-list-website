const express=require('express');
const router=express.Router();
const {getAllTasks,createTask,getTask,updateTask,deleteTask}=require('../controllers/tasks.js');
//.route() is used to chain all the handlers together
//basically lets you to do get, post, update,get etc. on a single path!! 
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
module.exports=router;