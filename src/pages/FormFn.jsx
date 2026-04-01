import { useContext } from "react";
import { DataContext } from "../api/component/workout-data-context";
import { useWorkoutForm } from "./useWorkoutForm";

function FormFn() {
  const {
    rowOnChangeHandler,
    mainrowOnChangehandler,
    addWorkout,
    addRow,
    handleSubmit,
  } = useWorkoutForm();

  const { workoutState, errorState, editDashboard } = useContext(DataContext);

  return (
    <div className="form-wrapper">
      <h2 className="form-section-title">
        {editDashboard.editOn ? "Edit Programs" : "New Program"}
      </h2>

      <form>
        {workoutState.map((mainRow, index) => (
          <div key={index} className="workout-form-block">

            {/* Workout name */}
            <textarea
              id={mainRow}
              type="text"
              name="workoutName"
              className="workout-name-input"
              value={
                !workoutState[index].workoutName ||
                errorState.error === "adding error"
                  ? ""
                  : workoutState[index].workoutName
              }
              placeholder="Workout name…"
              onChange={(e) => mainrowOnChangehandler(e, index)}
              required
            />

            {/* Lift rows */}
            {mainRow.lifts.map((item, rowOnchangeindex) => (
              <div key={rowOnchangeindex} className="lift-input-row">
                <input
                  id={rowOnchangeindex}
                  type="text"
                  placeholder="Exercise name"
                  name="liftname"
                  className="lift-input"
                  value={
                    !workoutState[index].lifts[rowOnchangeindex].name ||
                    errorState.error === "adding error"
                      ? ""
                      : workoutState[index].lifts[rowOnchangeindex].name
                  }
                  onChange={(e) =>
                    rowOnChangeHandler(e, index, rowOnchangeindex, "name")
                  }
                />
                <input
                  id={rowOnchangeindex}
                  type="number"
                  placeholder="Sets"
                  name="liftset"
                  className="lift-input lift-input-sets"
                  value={
                    !workoutState[index].lifts[rowOnchangeindex].sets ||
                    errorState.error === "adding error"
                      ? ""
                      : workoutState[index].lifts[rowOnchangeindex].sets
                  }
                  onChange={(e) =>
                    rowOnChangeHandler(e, index, rowOnchangeindex, "set")
                  }
                />
              </div>
            ))}

            <button
              type="button"
              className="add-lift-btn"
              onClick={() => addRow(index)}
            >
              Add Exercise
            </button>
          </div>
        ))}

        {/* Form actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            {editDashboard.editOn ? "Save Changes" : "Save Program"}
          </button>

          <button type="button" className="btn-ghost" onClick={addWorkout}>
            + Add Workout
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormFn;

// import { useContext } from 'react';
// import { DataContext } from '../api/component/workout-data-context';
// import { useWorkoutForm } from './useWorkoutForm';

// function FormFn() {

//   const { rowOnChangeHandler, mainrowOnChangehandler, addWorkout, addRow, handleSubmit } = useWorkoutForm();
//   const { workoutState, errorState } = useContext(DataContext);

//   return (
//     <form>
//       <div>
//         {workoutState.map((mainRow, index) => {
//           return (
//             <div>
//               <textarea
//                 id={mainRow}
//                 type="text"
//                 name="workoutName"
//                 value={!workoutState[index].workoutName ||
//                   errorState.error === "adding error" ? '' : workoutState[index].workoutName}
//                 placeholder="Workout name"
//                 onChange={(e) => { mainrowOnChangehandler(e, index); }}
//                 required />
//               {mainRow.lifts.map((item, rowOnchangeindex) => {
//                 return (
//                   <p>
//                     <input
//                       id={rowOnchangeindex}
//                       type="text"
//                       placeholder="lift"
//                       name="liftname"
//                       value={!workoutState[index].lifts[rowOnchangeindex].name ||
//                         errorState.error === "adding error" ? '' : workoutState[index].lifts[rowOnchangeindex].name}
//                       onChange={(e) => { rowOnChangeHandler(e, index, rowOnchangeindex, 'name'); }} >
//                     </input>
//                     <input
//                       id={rowOnchangeindex}
//                       type="number"
//                       placeholder="sets"
//                       name="liftset"
//                       value={!workoutState[index].lifts[rowOnchangeindex].sets ||
//                         errorState.error === "adding error" ? '' : workoutState[index].lifts[rowOnchangeindex].sets}
//                       onChange={(e) => { rowOnChangeHandler(e, index, rowOnchangeindex, 'set'); }}>
//                     </input>
//                   </p>
//                 );
//               })}
//               <button
//                 type="button"
//                 onClick={() => { addRow(index); }}>
//                 add lifts
//               </button>
//             </div>
//           );
//         })}
//       </div>
//       <button
//         type="submit"
//         onClick={(event) => { handleSubmit(event); }}>
//         Submit
//       </button>
//       <button type="button" onClick={addWorkout}>
//         add workout
//       </button>
//     </form>
//   );
// }

// export default FormFn;



