import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SignUp } from './pages/SignUp.jsx';
import { LogIn } from './pages/LogIn.jsx';
import { action as signUpAction } from './pages/SignUp.jsx';
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard.jsx';
import { action as logInAction } from './pages/LogIn.jsx';
// import ListForm from './pages/ListForm.jsx';
import Error from './pages/Error.jsx';



const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { index: true, element: <LogIn /> },
      { path: '/login', element: <LogIn />, action: logInAction  },
      { path: 'signup', element: <SignUp />, action: signUpAction },
      { path: 'dashboard', element: <Dashboard />, loader: dashboardLoader },
      // { path: 'listForm', element: <ListForm />, loader: () => null},
      {path: 'error', element: <Error />}
    ]
  }])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,)



