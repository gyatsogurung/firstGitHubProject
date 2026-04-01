import { redirect } from 'react-router-dom';
import { auth, db } from '../api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { DataContext } from '../api/component/workout-data-context';

export function useUpdatePage() {
  const { workoutState, setError } = useContext(DataContext);

  return async function UpdatePageAsync() {
    await auth.authStateReady();
    try {
      const user = auth.currentUser;
      if (!user) throw redirect('/login');

      let count = 0;
      let liftcount = 20;
      
      for (const workout of workoutState) {
    
        const workoutRef = doc(
          db,
          'users',
          user.uid,
          'workouts',
          workout.workoutId
        );
        await updateDoc(workoutRef, { workoutName: workout.workoutName });
        count = count + 1
        console.log(count)
        
        for (const lift of workout.lifts) {
          const liftRef = doc(
            db,
            'users',
            user.uid,
            'workouts',
            workout.workoutId,
            'lifts',
            lift.liftId
          );
          await updateDoc(liftRef, { name: lift.name, sets: lift.sets });
          liftcount = liftcount + 1
          console.log(liftcount)
        }
      }
    } catch (error) {
      setError({
        state: true,
        error: 'updating error',
        errorMessage: error.message,
      });
    }
  };
}

export default useUpdatePage;

// import { redirect } from 'react-router-dom';
// import { auth, db } from '../api/firebase';
// import { doc, updateDoc } from 'firebase/firestore';
// import { useContext } from 'react';
// import { DataContext } from '../api/component/workout-data-context';
// import FormFn from './FormFn';
// // import { useNavigate } from 'react-router-dom';
// // import { useWorkoutForm } from './useWorkoutForm';

// export function UpdatePage() {
//   const { workoutState} = useContext(DataContext);

//   async function UpdatePageAsync() {
//     await auth.authStateReady();
//     const user = auth.currentUser;

//     if (!user) throw redirect('/login');

//     for (const workout of workoutState) {
//       const workoutRef = doc(
//         db,
//         'users',
//         user.uid,
//         'workouts',
//         workout.workoutId
//       );
//       await updateDoc(workoutRef, { workoutName: workout.workoutName });

//       for (const lift of workout.lifts) {
//         const liftRef = doc(
//           db,
//           'users',
//           user.uid,
//           'workouts',
//           workout.workoutId,
//           'lifts',
//           lift.liftId
//         );
//         await updateDoc(liftRef, { name: lift.name, sets: lift.sets });
//       }
//     }
//   }
//   UpdatePageAsync();

//   return (
//     <FormFn></FormFn>
//   );
// }

// export default UpdatePage;

// // rowOnChangeHandler={rowOnChangeHandler}
// // mainrowOnChangehandler={mainrowOnChangehandler}
// // addWorkout={addWorkout}
// // addRow={addRow}
// // handleSubmit={handleSubmit}
