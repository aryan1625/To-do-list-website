// console.log("hola amigos!");
const express=require('express');
const app=express();
const tasks=require('./routes/task');
const connectDB=require('./db/connect');
const notFound=require('./middleware/not-found');
const errorHandler=require('./middleware/error-handler');
require('dotenv').config();


//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
//middleware 1
app.use('/api/v1/tasks',tasks);  
//app.get('/api/v1/tasks');  -get all the tasks
//app.post('/api/v1/tasks');  -create a new task
//app.get('/api/v1/tasks/:id');  -get single task
//app.patch('/api/v1/tasks/:id');  -update task
//app.delete('/api/v1/tasks/:id');  -delete task

app.use(notFound);
app.use(errorHandler);

const port=process.env.PORT||3000;
const start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);       
    }
}
start();