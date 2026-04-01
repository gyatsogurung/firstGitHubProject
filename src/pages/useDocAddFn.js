import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../api/firebase';
import { useContext } from 'react';
import { DataContext } from '../api/component/workout-data-context';

function useDocAddFn() {
    const { setError, workoutState} = useContext(DataContext);

   return async function DocAddFn() {
        
       try {
            await auth.authStateReady();
            const user = auth.currentUser
            for (const singleWorkout of workoutState) {
                const workoutCollection = collection(db, "users", user.uid, "workouts");
                const workout = await addDoc(workoutCollection, { workoutName: singleWorkout.workoutName });
                const liftCollection = collection(db, "users", user.uid, "workouts", workout.id, "lifts");
                for (const lift of singleWorkout.lifts) {
                    await addDoc(liftCollection, { name: lift.name, sets: lift.sets })
                }
            }
      
        } catch (error) {
            setError({
                state: true,
                error: "adding error",
               errorMessage: error.message
           })
        }
    }  
}

export default useDocAddFn;


