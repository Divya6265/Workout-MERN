const express = require('express')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async(req, res)=>{
    // last created placed at first
    const workout = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workout)
}


// get a single workout
const getWorkout = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: "No such workout"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(400).json({msg: "No such workout"})
        // we return becoz we dont want this to continue exec
    }
    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res)=>{
    const{ title, reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }catch(err){

        res.status(400).json({error: err.message})
    }
}



// delete a workout

const deleteWorkout = async (req, res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json('No such workout')
    }
    // in mongoose _id is the propertry name not just id
    const workout = await Workout.findByIdAndDelete({_id: id});
    if(!workout){
        return res.status(400).json('No such workout')
    }
    res.status(200).json(workout)
}

// update a workout

const updateWorkout = async( req, res)=>{
    const{ title, reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json('No such workout')
    }
    // first arg is id and second arg is what we want to update
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!workout){
        return res.status(400).json('No such workout')
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,getWorkouts, getWorkout,deleteWorkout, updateWorkout
}