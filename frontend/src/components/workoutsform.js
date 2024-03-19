import { useState, useEffect } from "react";
import useWorkoutsContext from '../hooks/useWorkoutsContex'

const WorkoutForm = () => {
 
  const {dispatch, action, setAction, selectedWorkout, setSelectedWorkout}  = useWorkoutsContext()
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])
  useEffect( () => {
    console.log('Effect run: ', action, selectedWorkout);
    if (action && selectedWorkout) {
      setTitle(selectedWorkout.title);
      setReps(selectedWorkout.reps);
      setLoad(selectedWorkout.load);
    } else {
      // Reset form if not in edit mode or no workout is selected
        setError(null)
        setTitle('')
        setReps('')
        setLoad('')
        setEmptyFields([])
        setSelectedWorkout(null)
    }
    // no need to added setSelectedWorkout just to ignore the warnings added as dependency array
  }, [action]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const workout = {title, reps, load}
    const res = await fetch('/api/workouts',{
        method:'POST',
        body: JSON.stringify(workout),
        headers:{ 'Content-Type': 'application/json'}
    })
    // get if success workout or if fail to add/create,  error property mesg
    // await to retrieve the workout details 
    const json = await res.json()
    console.log(res)
    if(!res.ok) {
        // res.status(400).json({ ---->>>>error: err.message}) 
        setError(json.error)
        setEmptyFields(json.emptyFields || [])
   }
   if(res.ok){
        // empty values
        console.log(' After Added Resetting form fields...');
        setError(null);
        setTitle('');
        setReps('');
        setLoad('');
        setEmptyFields([]);
        // payload has single workout which is added now
        dispatch({type: 'CREATE_WORKOUT', payload: json})
        // after dispatch the workouts updated with new workout and rerenders into the page.
        // display added workout in json form
        console.log('new workout added', json)
   }
}

const handleUpdate = async (e) => {
  e.preventDefault()
  console.log(selectedWorkout)
  console.log("Entered handleupdate")
  const workout = {title, reps, load}
  const res = await fetch('/api/workouts/'+ selectedWorkout._id,{
      method:'PATCH',
      body: JSON.stringify(workout),
      headers:{ 'Content-Type': 'application/json'}
  })
  const json = await res.json()
  console.log("Entered handleupdate json", json)

  if(!res.ok) {
      console.log("Entered handleupdate res not ok")
      setError(json.error)
      setEmptyFields(json.emptyFields || [])
 }
 if(res.ok){
      console.log("Entered handleupdate res ok")
      setAction(false)
      dispatch({type: 'PATCH_WORKOUT', payload: json})
      console.log('updated workout', json)
 }
}
  return (
    <form className="create" onSubmit={action ? handleUpdate : handleSubmit}>
      {action ? <h3>Update the Workout</h3> : <h3>Add a New Workout</h3>}
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      {action ? (<button>Update Workout</button>) : (<button>Add Workout</button>)}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export  default WorkoutForm;