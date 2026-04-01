import { Form, Link, redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

export function LogIn() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-subtitle">// session_init</p>
        <h1 className="auth-title">Log In</h1>

        <Form method="post" action="/login">
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="auth-actions">
            <button type="submit" className="btn-primary">
              Enter
            </button>
            <Link to="/signup" className="btn-ghost">
              Sign Up
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

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  userCredential.user;

  return redirect("/dashboard");
}

// import { Form, Link, redirect } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../api/firebase";

// export function LogIn() {
//     return (
//         <Form method="post" action="/login">
//             <div>
//                 <label htmlFor="email">Email</label>
//                 <input id="email" name="email" type="email"
//                 ></input>
//             </div>
//             <div>
//                 <label htmlFor="password">Password</label>
//                 <input id="password" name="password" type="password"></input>
//             </div>

//             <p>
//                 <button type="submit">LogIn</button>
//                 <Link to="/signup">SignUp</Link>
//             </p>
//         </Form>
//     )
// }

// export async function action({ request }) {
//     const data = await request.formData();
//     const email = data.get('email');
//     const password = data.get('password');
   
    
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//    userCredential.user;
   
//    return redirect('/dashboard');
// };

