import { useContext } from 'react';
import { DataContext } from '../api/component/workout-data-context';
import useDocAddFn from './useDocAddFn';
import useUpdatePage from './useUpdatePage';

export function useWorkoutForm() {
  const DocAddFn = useDocAddFn();
  const { setWorkout, editDashboard, setEditDashboard, setOptimisticUpdate } =
    useContext(DataContext);
  const UpdatePageAsync = useUpdatePage();

  function rowOnChangeHandler(e, index, rowOnchangeindex, field) {
    setWorkout((previousValue) => {
      const preValue = [...previousValue];
      const preObject = { ...preValue[index] };
      const preLift = [...preValue[index].lifts];
      const singleLift = { ...preLift[rowOnchangeindex] };

      if (field === 'name') {
        singleLift.name = e.target.value;
      } else {
        singleLift.sets = e.target.value;
      }

      preLift[rowOnchangeindex] = singleLift;
      preObject.lifts = preLift;
      preValue[index] = preObject;
      return preValue;
    });
  }

  function mainrowOnChangehandler(e, index) {
    setWorkout((previousValue) => {
      const preValue = [...previousValue];
      const preObject = { ...preValue[index] };
      preObject.workoutName = e.target.value;
      preValue[index] = preObject;
      return preValue;
    });
  }

  function addWorkout() {
    setWorkout((previousValue) => {
      const preValue = [
        ...previousValue,
        {
          workoutName: '',
          lifts: [{ name: '', sets: '' }],
        },
      ];
      return preValue;
    });
  }

  function addRow(index) {
    setWorkout((previousValue) => {
      const preValue = [...previousValue];
      const preObject = { ...preValue[index] };
      const preLift = [...preValue[index].lifts, { name: '', sets: '' }];
      preObject.lifts = preLift;
      preValue[index] = preObject;
      return preValue;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
      if (editDashboard.editOn) { 
          
        setEditDashboard((prev) => { return {...prev, editOn: false}});
        await UpdatePageAsync();
      } else {
        setOptimisticUpdate(false)
        await DocAddFn();
    }
  }
 
    
  return {
    rowOnChangeHandler,
    mainrowOnChangehandler,
    addWorkout,
    addRow,
    handleSubmit,
  };
}

// import { useContext } from "react";
// import { DataContext } from "../api/component/workout-data-context";
// import useDocAddFn from "./useDocAddFn";
// import { useNavigate } from "react-router-dom";
// import { useEditState } from "./useEditState";

// export function useWorkoutForm() {
//     const DocAddFn = useDocAddFn();
//     const { workoutState, setWorkout } = useContext(DataContext);
//     const navigate = useNavigate();
//     const { setOnEdit, edit } = useEditState();

//     function rowOnChangeHandler(e, index, rowOnchangeindex, field) {

//         setWorkout((previousValue) => {
//             const preValue = [...previousValue];
//             const preObject = { ...preValue[index] };
//             const preLift = [...preValue[index].lifts];
//             const singleLift = { ...preLift[rowOnchangeindex] };

//             if (field === "name") {
//                 singleLift.name = e.target.value;
//             } else {
//                 singleLift.sets = e.target.value;
//             }

//             preLift[rowOnchangeindex] = singleLift;
//             preObject.lifts = preLift;
//             preValue[index] = preObject;
//             return preValue;
//         })
//     }

//     function mainrowOnChangehandler(e, index) {

//         setWorkout((previousValue) => {
//             const preValue = [...previousValue];
//             const preObject = { ...preValue[index] };
//             preObject.workoutName = e.target.value;
//             preValue[index] = preObject;
//             return preValue
//         })

//     }

//     function addWorkout() {
//         setWorkout((previousValue) => {
//             const preValue = [...previousValue, {
//                 workoutName: '',
//                 lifts: [{ name: '', sets: '' }]
//             }];
//             return preValue;
//         })
//     }

//     function addRow(index) {
//         setWorkout((previousValue) => {
//             const preValue = [...previousValue];
//             const preObject = { ...preValue[index] };
//             const preLift = [...preValue[index].lifts, { name: '', sets: '' }];
//             preObject.lifts = preLift;
//             preValue[index] = preObject;
//             return preValue
//         })
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();
//         await DocAddFn(workoutState);
//         setOnEdit(false)
//         navigate('/dashboard')
//     }
//     return {rowOnChangeHandler,
//         mainrowOnChangehandler,
//         addWorkout,
//         addRow,
//         handleSubmit}
// }
