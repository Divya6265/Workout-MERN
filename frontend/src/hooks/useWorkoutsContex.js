import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

 const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);
    if(!context){
        throw Error('useWorkoutContext must be used inside an WorkoutsContextProvider')
    }

    return context
}

export default useWorkoutsContext