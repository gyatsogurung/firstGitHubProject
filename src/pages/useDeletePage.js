import { redirect } from "react-router-dom";
import { auth, db } from "../api/firebase";
import { deleteDoc, doc } from "firebase/firestore";
// import { DataContext } from "../api/component/workout-data-context";
// import { useContext } from "react";



export function useDeletePage() {
    // const { workoutState, setWorkout } = useContext(DataContext);
    return function DeletePage(dataToDelete, toDelete, idLift) {
        
        
        async function DeletePageAsync() {
            await auth.authStateReady();
            const user = auth.currentUser;
    
            if (!user) {
                throw redirect('/login');
            }
            
            if (toDelete === "workoutDelete") {
                const workoutRef = doc(db, "users", user.uid, "workouts", dataToDelete.workoutId);
                await deleteDoc(workoutRef)
            } else {
                const theSingleLift = dataToDelete.lifts.find((lift) => { return lift.liftId === idLift })
    
                const liftRef = doc(db, "users", user.uid, "workouts", dataToDelete.workoutId, "lifts", theSingleLift.liftId)
                await deleteDoc(liftRef)
            }
        }
    
       DeletePageAsync()
      
    }

}