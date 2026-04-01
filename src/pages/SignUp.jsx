import { Form, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { useActionData } from "react-router-dom";

export function SignUp() {
  const actionData = useActionData();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-subtitle">// new_user_register</p>
        <h1 className="auth-title">Sign Up</h1>

        {actionData && (
          <div className="auth-error">{actionData}</div>
        )}

        <Form method="post" action="/signup">
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input id="confirmpassword" name="confirmpassword" type="password" placeholder="••••••••" />
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <Link to="/login" className="btn-ghost">
              Log In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
}


// import { Form, Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../api/firebase';
// import { useActionData } from 'react-router-dom';

// export function SignUp() {
//     const actionData = useActionData();
//     console.log(actionData)
//     return (
//         <Form method='post' action="/signup">
//             {actionData && <p style={{ color: 'red' }}>{actionData}</p>}
//             <div>
//                 <label htmlFor="email">Email</label> <input id="email" name="email" type="email"></input>
//             </div>
//             <div>
//                 <label htmlFor="password">Password</label>
//                 <input id="password" name="password" type="password"></input>
//             </div>
//             <div>
//                 <label htmlFor="confirmpassword">Confirm Password</label>
//                 <input id="confirmpassword" name="confirmpassword" type="password"></input>
//             </div>
//             <p>
//                 <button type="submit">SignUp</button>
//                 <Link to="/login">LogIn</Link>
//             </p> </Form>)
// }

// export async function action({ request }) {
//     const data = await request.formData();
//     const email = data.get('email');
//     const password = data.get('password');
//     try {
        
//         await createUserWithEmailAndPassword(auth, email, password);
     
//     }catch (error) { return new Response(error.message, { status: 400 }) }
//     };