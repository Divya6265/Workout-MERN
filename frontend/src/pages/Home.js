import { useEffect , useState, memo} from "react";
import WorkoutDetails from "../components/workoutdetails";
import WorkoutForm from "../components/workoutsform";
import useWorkoutsContext from "../hooks/useWorkoutsContex";


const NoWorkouts = () => {
  return (
    <div className="no-workouts">
      <p>No Workouts</p>
    </div>
  );
};

const MemoizedNoWorkouts = memo(NoWorkouts);


const Home = () => {
  // Context is a global storage used to avoid local storage.
  const { workouts, dispatch } = useWorkoutsContext();
  const [emptyWorkouts, setEmptyWorkouts] = useState(false);
  // empty array fires only once
  useEffect(() => {
    const fetchWorkouts = async () => {
      //  retrieve all workouts from //get all workouts controller
      const res = await fetch("/api/workouts");
      // this convert json workouts into array workouts bcoz
      // /api/workouts returns json workouts
      const json = await res.json();
      if(!json || json.length == 0){
        setEmptyWorkouts(true);
      }else{
        setEmptyWorkouts(false);

      }
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [workouts, dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        {emptyWorkouts && 
         <MemoizedNoWorkouts />}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
