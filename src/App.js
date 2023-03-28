import { 
      createBrowserRouter, 
      createRoutesFromElements,
      RouterProvider,
      Route } from 'react-router-dom';
// import React, {useEffect} from 'react';
import {useState,createContext} from 'react';

//Layouts
import RootLayout from './layout/RootLayout';

//pages
import Home from './pages/Home';
import Ratings from './pages/Ratings';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Report from './pages/Report';
// import Register from './pages/Register';

//components
import Know from './components/Know';
// import {DataContext,sendLoginAction} from './components/CheckNav';
import {sendLoginAction} from './components/CheckNav';
import {sendReportAction} from './components/ReportMath';

//css
import './App.css';

const DataContext = createContext({});

const theRouter = createBrowserRouter(
   createRoutesFromElements(
         <Route exact path="/" element={<RootLayout />}
         >  
            <Route index element={<Home />}  />
            <Route path="know" element={<Know />} />
            <Route path="report" element={<Report />} action={sendReportAction}/>
            <Route path="ratings" element={<Ratings />} />
            <Route path="login" element={<Login />}  action={sendLoginAction}/>
            <Route path="register" element={<Login />}  action={sendLoginAction}/>
            <Route path="*" element={<ErrorPage />} />
         </Route>
   )
);

export default function App() {
   const [signedIn,setSignedIn] = useState();// status hook
   const [userStat, setUserStat] = useState(0);

   const contextProps = {
      signed : {signedIn,setSignedIn},
      user : {userStat,setUserStat}
   }

   if(signedIn === true){ 
      // console.log('signed TRUE status: ',signedIn);
   }else{
      // console.log('signed FALSE status: ',signedIn);
      // alert('See you at your next bowl of ramen!');
   }

   return (
      <DataContext.Provider value={{contextProps}}>
         <RouterProvider router={theRouter} />
      </DataContext.Provider>
   );
}
   
export {DataContext}