import { useContext } from "react";
import { DataContext } from "../api/component/workout-data-context";

function Error({ data }) {
  const { errorState, setError, setWorkout } = useContext(DataContext);

  function goBackFn() {
    setError({ state: false, error: null, errorMessage: null });
    setWorkout(data);
  }

  function editFn() {
    setError({ state: false, error: null, errorMessage: null });
  }

  return (
    <div className="error-wrapper">
      <div className="error-code">ERR</div>

      <div className="error-message">
        {errorState.errorMessage || "An unexpected error occurred."}
      </div>

      <div className="error-actions">
        <button type="button" className="btn-ghost" onClick={goBackFn}>
          ← Discard & Go Back
        </button>
        <button type="button" className="btn-primary" onClick={editFn}>
          Keep Editing
        </button>
      </div>
    </div>
  );
}

export default Error;

// import { useContext } from "react";
// import { DataContext } from "../api/component/workout-data-context";


// function Error({data}) {
   

//     const { errorState, setError, setWorkout } = useContext(DataContext);

//     function goBackFn() {
//         setError({
//             state: false,
//             error: null,
//             errorMessage: null,
//         })
//         setWorkout(data)
//     }
//     function editFn() {
//         setError({
//             state: false,
//             error: null,
//             errorMessage: null,
//         })
//     }
//     return <>
//         <h1>{errorState.errorMessage}</h1>
//         <p>discard and go back to main page<button type="button" onClick={goBackFn}>go back</button></p>
//         <p>keep editing<button type="button" onClick={editFn}>go back</button></p>
//     </>
// }

// export default Error;