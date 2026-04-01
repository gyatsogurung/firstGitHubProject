import { useLoaderData } from "react-router-dom";
import { Fragment, useState } from "react";

import { db } from "../api/firebase";
import { getDocs, collection } from "firebase/firestore";
import { auth } from "../api/firebase";

import { DataContext } from "../api/component/workout-data-context";
import WorkoutCard from "./WorkoutCard";
import { useStateManager } from "./useStateManager";

import Error from "./Error";

export default function Dashboard() {
  const data = useLoaderData();

  const {
    errorState,
    setError,
    editDashboard,
    setEditDashboard,
    optimistcUpdate,
    setOptimisticUpdate,
  } = useStateManager();

  const [workoutState, setWorkout] = useState(
    data.length > 0
      ? data
      : [{ workoutId: "", workoutName: "", lifts: [{ liftId: "", name: "", sets: "" }] }]
  );

  const dataContextValue = {
    workoutState,
    setWorkout,
    editDashboard,
    setEditDashboard,
    errorState,
    setError,
    optimistcUpdate,
    setOptimisticUpdate,
  };

  return (
    <DataContext.Provider value={dataContextValue}>
      <Fragment>
        {errorState.state ? (
          <Error data={data} />
        ) : (
          <WorkoutCard />
        )}
      </Fragment>
    </DataContext.Provider>
  );
}

export async function loader() {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const workoutsRef = collection(db, "users", user.uid, "workouts");
  const workoutDocs = await getDocs(workoutsRef, { source: "server" });
  const workoutArray = [];

  for (const docSnap of workoutDocs.docs) {
    const theObject = {
      workoutId: docSnap.id,
      workoutName: docSnap.data().workoutName,
      lifts: [],
    };

    const liftsRef = collection(db, "users", user.uid, "workouts", docSnap.id, "lifts");
    const liftDocs = await getDocs(liftsRef, { source: "server" });

    liftDocs.docs.forEach((theDoc) => {
      theObject.lifts.push({
        liftId: theDoc.id,
        name: theDoc.data().name,
        sets: theDoc.data().sets,
      });
    });

    workoutArray.push(theObject);
  }

  return workoutArray;
}

// import { useLoaderData } from "react-router-dom";
// import { Fragment, useState } from "react";

// import { db } from "../api/firebase";
// import { getDocs, collection } from 'firebase/firestore';
// import { auth } from "../api/firebase";

// import { DataContext } from "../api/component/workout-data-context";
// import WorkoutCard from "./WorkoutCard";
// import { useStateManager } from "./useStateManager";

// import Error from "./Error";

// export default function Dashboard() {

//     const data = useLoaderData();

//     const {
//         errorState,
//         setError,
//         editDashboard,
//         setEditDashboard,
//         optimistcUpdate, setOptimisticUpdate
//       } = useStateManager()

//     const [workoutState, setWorkout] = useState(data.length > 0 ? data : [
//       {
//         workoutId: '',
//         workoutName: '',
//         lifts: [{ liftId: '', name: '', sets: '' }]
//         }]);
  
//     const dataContextValue = {
//     workoutState: workoutState,
//     setWorkout: setWorkout,
//     editDashboard,
//     setEditDashboard,
//     errorState,
//         setError,
//         optimistcUpdate, setOptimisticUpdate
//     }

//     return (
//         <DataContext.Provider value={dataContextValue}>
// <Fragment>
// {errorState.state ? <Error data={data}></Error> :
//     <WorkoutCard/>}
//             </Fragment>
//             </DataContext.Provider>
//     )
// }

// export async function loader() {

//     // 1. Check when auth is actually ready
//     await auth.authStateReady();

//     // 2. Check user at this point
//     const user = auth.currentUser;

//     if (!user) throw new Error("Not logged in");

//     // 3. Fetch workouts
//     const workoutsRef = collection(db, "users", user.uid, "workouts");
//     const workoutDocs = await getDocs(workoutsRef, { source: "server" });
//     const workoutArray = [];

//     for (const docSnap of workoutDocs.docs) {

//         const theObject = {
//             workoutId: docSnap.id,
//             workoutName: docSnap.data().workoutName,
//             lifts: []
//         };

//         const liftsRef = collection(db, "users", user.uid, "workouts", docSnap.id, "lifts");
//         const liftDocs = await getDocs(liftsRef, { source: "server" });

//         liftDocs.docs.forEach((theDoc) => {
//             theObject.lifts.push({
//                 liftId: theDoc.id,
//                 name: theDoc.data().name,
//                 sets: theDoc.data().sets
//             });
//         });

//         workoutArray.push(theObject);
//     }
//     return workoutArray;
// };

// import LiftRow from "./LiftRow";
// import { db } from "../api/firebase";
// import { getDocs, collection } from 'firebase/firestore';
// import { auth } from "../api/firebase";
// import classes from '../pages/Dashboard.module.css';
// import { DataContext } from "../api/component/workout-data-context";
// import { Fragment, useState } from "react";
// import Error from "./Error";
// import { useDeletePage } from "./useDeletePage";
// import FormFn from "./FormFn";

// import { useLoaderData } from "react-router-dom";
// import { useStateManager } from "./useStateManager";

// export default function Dashboard() {

//     const data = useLoaderData();

//     const {
//         errorState,
//         setError,
//         editDashboard,
//         setEditDashboard,
//         optimistcUpdate, setOptimisticUpdate
//       } = useStateManager()

//     const [workoutState, setWorkout] = useState(data.length > 0 ? data : [
//       {
//         workoutId: '',
//         workoutName: '',
//         lifts: [{ liftId: '', name: '', sets: '' }]
//         }]);
  
//     const dataContextValue = {
//     workoutState: workoutState,
//     setWorkout: setWorkout,
//     editDashboard,
//     setEditDashboard,
//     errorState,
//         setError,
//         optimistcUpdate, setOptimisticUpdate
//     }

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

//     console.log(workoutState)
//     return (
//         <DataContext.Provider value={dataContextValue}>
// <Fragment>
// {errorState.state ? <Error data={data}></Error> :
//     <main className={classes.main}>
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
//     </main>}
//             </Fragment>
//             </DataContext.Provider>
//     )
// }

// export async function loader() {

//     // 1. Check when auth is actually ready
//     await auth.authStateReady();

//     // 2. Check user at this point
//     const user = auth.currentUser;

//     if (!user) throw new Error("Not logged in");

//     // 3. Fetch workouts
//     const workoutsRef = collection(db, "users", user.uid, "workouts");
//     const workoutDocs = await getDocs(workoutsRef, { source: "server" });
//     const workoutArray = [];

//     for (const docSnap of workoutDocs.docs) {

//         const theObject = {
//             workoutId: docSnap.id,
//             workoutName: docSnap.data().workoutName,
//             lifts: []
//         };

//         const liftsRef = collection(db, "users", user.uid, "workouts", docSnap.id, "lifts");
//         const liftDocs = await getDocs(liftsRef, { source: "server" });

//         liftDocs.docs.forEach((theDoc) => {
//             theObject.lifts.push({
//                 liftId: theDoc.id,
//                 name: theDoc.data().name,
//                 sets: theDoc.data().sets
//             });
//         });

//         workoutArray.push(theObject);
//     }
//     return workoutArray;
// };