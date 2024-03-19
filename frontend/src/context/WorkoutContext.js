import { createContext, useReducer, useState } from "react";

export const WorkoutContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                // take action.payload = one workout, ...state.workouts = existing workouts
                // combines all and store them in workouts 
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        case 'PATCH_WORKOUT':
            return {
                workouts: state.workouts.map((w) => w._id === action.payload._id ? action.payload : w),
            }
        
        default:
            return state
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer,{
        workouts:null 
    })
    const [action, setAction] = useState(false); 
    const [selectedWorkout, setSelectedWorkout] = useState(null);


    return (
        <WorkoutContext.Provider value={{...state, dispatch, action, setAction, selectedWorkout, setSelectedWorkout}}>
           {children}
        </WorkoutContext.Provider>
    )
}