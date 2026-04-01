import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>
          <span style={{ color: 'var(--col-accent)' }}>REP</span>LOG
        </h1>
        <span className="badge badge-dim">v1.0</span>
      </header>
      <Outlet />
    </div>
  );
}

export default App;


// import classes from './pages/Dashboard.module.css';

// function App() {
 

//   return (
    
//       <div>
//         <h1>hello welcome</h1>
//         <Outlet />
//       </div>
   
//   )
// }
// ; export default App;


// import { Outlet } from "react-router-dom";
// import { useLoaderData } from "react-router-dom";
// import { useState } from "react";
// import { DataContext } from "./api/component/workout-data-context";

// // import classes from './pages/Dashboard.module.css';

// function App() {
//   const data = useLoaderData();

//   const [workoutState, setWorkout] = useState(data.length > 0 ? data : [
//     {
//       workoutId: '',
//       workoutName: '',
//       lifts: [{ liftId: '', name: '', sets: '' }]
//     }]);
  
//   const [errorState, setError] = useState({
//     state: false,
//     error: null,
//     errorMessage: null
//   });

//   const [editOn, setOnEdit] = useState('');

//   const dataContextValue = {
//     workoutState: workoutState,
//     setWorkout: setWorkout,
//     editOn,
//     setOnEdit,
//     errorState,
//     setError
//   }

//   return (
//     <DataContext.Provider value={dataContextValue}>
//       <div>
//         <h1>hello welcome</h1>
//         <Outlet />
//       </div>
//     </DataContext.Provider>
//   )
// }
// ; export default App;
