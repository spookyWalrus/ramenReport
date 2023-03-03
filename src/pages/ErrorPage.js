import {NavLink} from 'react-router-dom';
// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div className="reportBack">
      <div className="reportPage">
          <h1>Ruh-roh!</h1>
          <h5>That page can't be found</h5>
         {/* <p>
            <i>{error.statusText || error.message}</i>
          </p>*/}
          <h5>Go back to the <NavLink to="/">Homepage</NavLink>.</h5>
        </div>
    </div>
  );
}