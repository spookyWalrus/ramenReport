import { 
      createBrowserRouter, 
      createRoutesFromElements,
      RouterProvider,
      Route } from 'react-router-dom';
// import React, {useEffect} from 'react';
import {useState} from 'react';

//Layouts
import RootLayout from './layout/RootLayout';

//pages
// import Banner from '../components/Banner';
import Home from './pages/Home';
import Report, {sendReportAction} from './pages/Report';
import Ratings from './pages/Ratings';
import ErrorPage from './pages/ErrorPage';
import Login, {sendLoginAction} from './pages/Login';

//components
import Know from './components/Know';
//css
import './App.css';



const theRouter = createBrowserRouter(
   createRoutesFromElements(
      <Route exact path="/" element={<RootLayout />}
      >  
         <Route index element={<Home />} userStatus={signedIn} />
         <Route path="know" element={<Know />} />
         <Route path="report" element={<Report />} action={sendReportAction}/>
         <Route path="ratings" element={<Ratings />} />
         <Route path="login" element={<Login />} action={sendLoginAction} />
         <Route path="*" element={<ErrorPage />} />
      </Route>
   )
);

export default function App() {
   const [signedIn,setSignedIn] = useState(false);

   return (
      <div>
         <RouterProvider router={theRouter} />
      </div>
   );
}

// export default App;

