const express = require('express')
const router = express.Router();
const Workout = require('../models/workoutModel')
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutControllers')


// Get all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id',getWorkout)

// POST  a new workout
router.post('/', createWorkout)

// DELETE  a new workout
router.delete('/:id', deleteWorkout)

// UPDATE  a new workout
router.patch('/:id', updateWorkout)

module.exports = router