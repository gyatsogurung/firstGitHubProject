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


