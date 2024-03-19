import useWorkoutsContext from "../hooks/useWorkoutsContex"
import dele from './delete.png'
import update from './update.png'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) =>{ 
    const {dispatch, action, setAction, SelectedWorkout, setSelectedWorkout} = useWorkoutsContext()
    
    const handleClick = async () => {
        const res = await fetch('api/workouts/' + workout._id,{
            method: 'DELETE',
        })

        // contains doc/workout that we deleted
        const json = await res.json()

        if(res.ok){
            dispatch({type:'DELETE_WORKOUT', payload:json})
        }
        // if user selected update first (form has values of selected workout) and than delete we need to clear the form after deleting.
        setAction(false)
    }
  
    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p> <strong>Reps: </strong> {workout.reps}</p>
            <p> <strong>Loads (kg): </strong> {workout.load}</p>
           <img className="dele" src={update} alt="no" onClick={()=>{setAction(true); setSelectedWorkout(workout)}}></img>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
            <img className="update" src={dele} alt="no" onClick={handleClick}></img> 
        </div>
    )
}

export default WorkoutDetails;