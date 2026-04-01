import { useContext } from "react";
import { DataContext } from "../api/component/workout-data-context";
import { useDeletePage } from "./useDeletePage";

function LiftRow({ lifts, workout }) {
  const DeletePage = useDeletePage();
  const { workoutState, setWorkout } = useContext(DataContext);

  async function deleteFn(workoutId, workoutToDelete, liftId) {
    const dataToDelete = workoutState.find(
      (workoutObject) => workoutObject.workoutId === workoutId
    );

    setWorkout((preValue) => {
      const workouts = [...preValue];
      workouts.forEach((singleWorkout, index) => {
        if (singleWorkout.workoutId === workoutId) {
          const filteredLifts = singleWorkout.lifts.filter(
            (lift) => lift.liftId !== liftId
          );
          workouts[index] = { ...singleWorkout, lifts: filteredLifts };
        }
      });
      return workouts;
    });

    DeletePage(dataToDelete, workoutToDelete, liftId);
  }

  return (
    <>
      {lifts.map((workoutLift, index) => (
        <div key={index} className="lift-row">
          <p className="lift-name">{workoutLift.name}</p>
          <p className="lift-sets">{workoutLift.sets} sets</p>
          <button
            type="button"
            className="btn-danger lift-delete-btn"
            onClick={async () =>
              await deleteFn(workout.workoutId, "liftDelete", workoutLift.liftId)
            }
          >
            ✕
          </button>
        </div>
      ))}
    </>
  );
}

export default LiftRow;

// import { useContext } from 'react';
// import classes from '../pages/Dashboard.module.css';
// import { useDeletePage } from './useDeletePage';
// import { DataContext } from '../api/component/workout-data-context';

// function LiftRow({ lifts, workout }) {
//     const DeletePage = useDeletePage();
//     const { workoutState, setWorkout } = useContext(DataContext);

//     async function deleteFn(workoutId, workoutToDelete, liftId) {
//         const dataToDelete = workoutState.find((workoutObject) => { return workoutObject.workoutId === workoutId });

//         setWorkout((preValue) => {

//             // if (toDelete === "liftDelete") {
//                 const workouts = [...preValue]
    
//                 workouts.forEach((singleWorkout, index) => {
    
//                     if (singleWorkout.workoutId === workoutId) {
//                         const filteredLifts = singleWorkout.lifts.filter((lifts) => {
//                             return lifts.liftId !== liftId
//                         }
//                         )
//                         const singleWorkoutObject = { ...singleWorkout, lifts: filteredLifts };
//                         workouts[index] = singleWorkoutObject;
//                     }
//                 });
//                 return workouts;
            
//         })
//         DeletePage(dataToDelete, workoutToDelete, liftId)
//     }
    
//     return <>
//         {
//             lifts.map((workoutLift, index) => (
//                 <>
//                     <div key={index} className={classes.lift}>
//                         <p className={classes.liftName}>{workoutLift.name}</p>
//                         <p className={classes.liftSet}>{workoutLift.sets}</p>
//                     </div>
//                     <button
//                         type="button"
//                         className={classes.deleteBtn}
//                         onClick={async () => {
//                             await deleteFn(workout.workoutId, "liftDelete", workoutLift.liftId)
//                         }}
//                     >
//                         Delete Lift
//                     </button>
//                 </>
//             ))}
//     </>
// }

// export default LiftRow;
