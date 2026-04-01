import LiftRow from "./LiftRow";
import { useDeletePage } from "./useDeletePage";
import { DataContext } from "../api/component/workout-data-context";
import { useContext } from "react";
import FormFn from "./FormFn";

export default function WorkoutCard() {
  const {
    workoutState,
    setWorkout,
    setEditDashboard,
    optimistcUpdate,
    editDashboard,
  } = useContext(DataContext);

  const DeletePage = useDeletePage();

  async function deleteFn(workoutId, workoutToDelete) {
    const dataToDelete = workoutState.find(
      (workoutObject) => workoutObject.workoutId === workoutId
    );

    setWorkout((preValue) =>
      preValue.filter((singleWorkout) => singleWorkout.workoutId !== workoutId)
    );

    DeletePage(dataToDelete, workoutToDelete);
  }

  function UpdateFn() {
    setEditDashboard((prev) => ({ ...prev, editOn: true }));
  }

  const showForm =
    (workoutState[0].workoutId === "" && optimistcUpdate) ||
    editDashboard.editOn;

  if (showForm) {
    return (
      <div className="dashboard-wrapper">
        <FormFn />
      </div>
    );
  }

  return (
    <main className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <span>your workouts</span>
          My Programs
        </div>
        <div className="dashboard-meta">
          {workoutState.length} workout{workoutState.length !== 1 ? "s" : ""} loaded
        </div>
      </div>

      {/* Grid of cards */}
      {workoutState.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏋️</div>
          <p className="empty-state-title">No Workouts Yet</p>
          <p className="empty-state-sub">// add your first program below</p>
        </div>
      ) : (
        <div className="workout-grid">
          {workoutState.map((workout) => (
            <div key={workout.workoutId} className="workout-card">
              <div className="workout-card-header">
                <h2 className="workout-card-title">{workout.workoutName}</h2>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={async () => await deleteFn(workout.workoutId, "workoutDelete")}
                >
                  Delete
                </button>
              </div>

              <div className="workout-card-body">
                <LiftRow lifts={workout.lifts} workout={workout} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Global action bar */}
      <div className="dashboard-actions-bar">
        <button type="button" className="btn-primary" onClick={UpdateFn}>
          Edit All
        </button>
      </div>
    </main>
  );
}

// import LiftRow from "./LiftRow";
// import classes from '../pages/Dashboard.module.css';
// import { useDeletePage } from "./useDeletePage";
// import { DataContext } from "../api/component/workout-data-context";
// import { useContext } from "react";
// import FormFn from "./FormFn";

// export default function WorkoutCard() {
    
//     const { workoutState, setWorkout, setEditDashboard, optimistcUpdate, editDashboard } = useContext(DataContext);
//     const DeletePage = useDeletePage();

//     async function deleteFn(workoutId, workoutToDelete) {
//         const dataToDelete = workoutState.find((workoutObject) => { return workoutObject.workoutId === workoutId });

//         setWorkout((preValue) => {
//                 return preValue.filter(singleWorkout =>
//                     singleWorkout.workoutId !== workoutId
//                 )
//         })
//         DeletePage(dataToDelete, workoutToDelete)
//     };

//     function UpdateFn() {
//         setEditDashboard((prev) => {
//             const newState = { ...prev, editOn: true };
//             return newState;
//           });
//     }

//     return (
//         <main className={classes.main}>
//         {workoutState[0].workoutId === '' &&  optimistcUpdate || editDashboard.editOn ? <FormFn></FormFn> :
//             <main className={classes.main}>
//                 <div className={classes.container}>
//                     {workoutState.map((workout) => (
//                         <div key={workout.workoutId} className={classes.workout}>
//                             <h2 className={classes.title}>
//                                 {workout.workoutName}
//                                 <button
//                                     type="button"
//                                     className={classes.deleteBtn}
//                                     onClick={async () => { await deleteFn(workout.workoutId, "workoutDelete") }} >
//                                     Delete</button>
//                             </h2>
//                             <LiftRow lifts={workout.lifts} workout={workout} />
//                         </div>))}
//                     <p className={classes.actions}>
//                         <button type="button" className={classes.deleteBtn} onClick={UpdateFn}>
//                             Update
//                         </button>
//                     </p>
//                 </div>
//             </main>}
//     </main>)
// }


// // import LiftRow from "./LiftRow";
// // import classes from '../pages/Dashboard.module.css';
// // import { useDeletePage } from "./useDeletePage";
// // import { DataContext } from "../api/component/workout-data-context";
// // import { Fragment, useContext } from "react";
// // import { useWorkoutForm } from "./useWorkoutForm";
// // import FormFn from "./FormFn";
// // import { useEditState } from "./useEditState";

// // export default function WorkoutCard() {
// //     const { editOn, setOnEdit } = useEditState()
// //     const { workoutState } = useContext(DataContext);
// //     const { rowOnChangeHandler, mainrowOnChangehandler, addWorkout, addRow, handleSubmit } = useWorkoutForm();
// //     const DeletePage = useDeletePage();

// //     // if (!workoutState || workoutState.length === 0) {
// //     //     return <div>No workout Data here, please <Link to={'/listForm'}>Click</Link> here to add routine</div>
// //     // }

// //     async function deleteFn(workoutId, workoutToDelete) {
// //         DeletePage(workoutId, workoutToDelete)
// //     };

// //     function UpdateFn() {
// //         setOnEdit(true)
// //     }

// //     return (
// //         <Fragment>
// //             {!workoutState || workoutState.length === 0 || editOn ?
// //                 <FormFn
// //                     rowOnChangeHandler={rowOnChangeHandler}
// //                     mainrowOnChangehandler={mainrowOnChangehandler}
// //                     addWorkout={addWorkout}
// //                     addRow={addRow}
// //                     handleSubmit={handleSubmit}
// //                 ></FormFn> :
// //                 <main className={classes.main}> <div className={classes.container}>
// //                     {workoutState.map((workout) => (
// //                         <div key={workout.workoutId} className={classes.workout}>
// //                             <h2 className={classes.title}>
// //                                 {workout.workoutName}
// //                                 <button
// //                                     type="button"
// //                                     className={classes.deleteBtn}
// //                                     onClick={async () => { await deleteFn(workout.workoutId, "workoutDelete") }} >
// //                                     Delete</button>
// //                             </h2>
// //                             <LiftRow lifts={workout.lifts} workout={workout} />
// //                         </div>))} <p className={classes.actions}>
// //                         <button type="button" className={classes.deleteBtn} onClick={UpdateFn}>
// //                             Update
// //                         </button>
// //                     </p>
// //                 </div>
// //                 </main>}
// //         </Fragment>)
// // }


// // import LiftRow from "./LiftRow";
// // import classes from '../pages/Dashboard.module.css';
// // import { Link } from "react-router-dom";
// // import { useDeletePage } from "./useDeletePage";
// // import { DataContext } from "../api/component/workout-data-context";
// // import { useContext } from "react";
// // // import UpdatePage from "./UpdataPage";

// // export default function WorkoutCard() {
// //     const { workoutState } = useContext(DataContext);
// //     const DeletePage = useDeletePage();

// //     if (!workoutState || workoutState.length === 0) {
// //         return <div>No workout Data here, please <Link to={'/listForm'}>Click</Link> here to add routine</div>
// //     }

// //     async function deleteFn(workoutId, workoutToDelete) {
// //         DeletePage(workoutId, workoutToDelete)
// //     }

// //     // function UpdateFn() {
// //     //     UpdatePage()
// //     // }

// //     return (
// //         <main className={classes.main}>
// //             <div className={classes.container}>
// //                 {workoutState.map((workout) => (
// //                     <div key={workout.workoutId} className={classes.workout}>
// //                         <h2 className={classes.title}>
// //                             {workout.workoutName}
// //                             <button
// //                                 type="button"
// //                                 className={classes.deleteBtn}
// //                                 onClick={async () => {
// //                                     await deleteFn(workout.workoutId, "workoutDelete")
// //                                 }}
// //                             >
// //                                 Delete
// //                             </button>
// //                         </h2>
// //                         <LiftRow lifts={workout.lifts} workout={workout} />
// //                     </div>
// //                 ))}

// //                 <p className={classes.actions}>
// //                     <Link className={classes.link} to="/updatePage">Update</Link>
// //                 </p>
// //             </div>
// //         </main>
// //     )
// // }


