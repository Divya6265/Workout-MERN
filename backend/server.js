require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRouters = require('./routers/workouts')

// create express app
const app = express();

// to access data in req.body
app.use(express.json())

// middleware
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRouters);

// connect to db

mongoose.connect(process.env.MONG_URL)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Connected to DB & Listening on post ', process.env.PORT)
    });
})
.catch(err=>{
    console.log(err)    
})

// router
app.get('/',(req, res)=>{
    res.json({mssg: 'Welcome to the app'})
})
