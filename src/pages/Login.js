import {
  Form,
  useActionData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useContext, useEffect } from "react";
// import {DataContext} from '../components/CheckNav';
import { DataContext } from "../App";

import "./loginReg.css";

export default function Login() {
  const location = useLocation();
  const logdat = useActionData();
  const { contextProps } = useContext(DataContext);
  const { signedIn, setSignedIn } = contextProps.signed;
  const { setUserStat } = contextProps.user;
  const goHome = useNavigate();
  let message = "";

  // set state to true when login succesful, otherwise show error message
  useEffect(() => {
    if (logdat !== undefined) {
      // console.log('is logdat? ',logdat);
      if (logdat.status === true) {
        setSignedIn(true);
        setUserStat(logdat.userstat);
        return goHome("/");
      } else if (logdat.status === false && location.pathname === "register") {
        return (message = logdat.regerror);
      } else if (logdat.status === false && location.pathname === "login") {
        return (message = logdat.error);
      }
    }
  }, [logdat]);

  if (location.pathname === "/register") {
    return (
      <div className="loginBackDrop">
        <div className="loginBlock">
          <Form method="post" action="/register">
            <h2>This is the Register</h2>
            <label for="userName">
              <span>User name</span>
            </label>
            <input type="text" name="userName" required />
            <label for="email">
              <span>Email</span>
            </label>
            <input type="email" name="email" required />

            <label for="passsword">
              <span>Password</span>
            </label>
            <input type="password" name="password" required />

            <input type="hidden" name="logreg" value="register" />
            <button type="submit" className="signUpButton">
              Sign me up!
            </button>
            <div className="logregError">
              {logdat && logdat.regerror && <p>{logdat.regerror}</p>}
            </div>
          </Form>
        </div>
      </div>
    );
  } else if (location.pathname === "/login") {
    return (
      <div className="loginBackDrop">
        <div className="loginBlock">
          <Form method="post" action="/login">
            <h2>This is the Log in</h2>
            <label for="email">
              <span>Email</span>
            </label>
            <input type="email" name="email" required />
            <label for="passsword">
              <span>Password</span>
            </label>
            <input type="password" name="password" required />

            <input type="hidden" name="logreg" value="login" />
            <button type="submit" className="signUpButton">
              Log in
            </button>
            <div className="logregError">
              {logdat && logdat.error && (
                <p>{logdat.error} Check credentials</p>
              )}
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

