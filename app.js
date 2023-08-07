// api.js
const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const PortNo = 8000;
const bodyParser = require('body-parser');

// Use middleware for body parser
app.use(bodyParser.urlencoded({extended:false})); // To handle urlencoded data
app.use(bodyParser.json()); // To handle json Data


const connectionString = 'mongodb://localhost:27017/Users'; 
// Replace 'my_database' with your database name or connection string.
mongoose.connect(connectionString,
{useNewUrlParser:true,useUnifiedTopology:true}
).then(
    console.log('DB connected')
)
// Add mongoose Schema and Model here

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
    },
    domain:{
    type:String,
    required:true,
    },
    platform:{
    type:String,
    required:true,
    }
})

const User = new mongoose.model('User',userSchema);


// -----------------------------------

app.post('/api/v1/newUser',async(req,res)=>{
    const user = await User.create(req.body);

    res.status(200).json({
    msg:'Added new user',
    success:true,
    user,
    })
})


app.get('/api/v1/allUsers',async(req,res)=>{
    const usersData = await User.find();

    res.status(200).json({
        success:true,
        usersData,
    })
})


app.put('/api/v1/updateUser/:id',async(req,res)=>{
    const id = req.params.id;
    updatedUser = await User.findByIdAndUpdate(id ,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        msg:'User is updated',
        updatedUser,
    })
})

app.delete('/api/v1/deleteUser/:id',async(req,res)=>{
    const id = req.params.id;
    const deletedUser = await User.findById(id);
    deletedUser.deleteOne();
    const allUsers = await User.find()

    res.status(200).json({
        success:true,
        msg:'User is deleted successfully',
        allUsers
    })
})


app.listen(PortNo,()=>{
console.log(`Server started at port number ${PortNo}`);
})
