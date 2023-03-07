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
import Home from './pages/Home';
import Report, {sendReportAction} from './pages/Report';
import Ratings from './pages/Ratings';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
// import Register from './pages/Register';

//components
import Know from './components/Know';
import {DataContext,sendLoginAction} from './components/CheckNav';
// import SendLoginAction from './components/SendLoginAction';

//css
import './App.css';


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
   const [signedIn,setSignedIn] = useState();
   // const status = {signedIn,setSignedIn};

   if(signedIn === true){ 
      console.log('signed TRUE status: ',signedIn);
   }else{
      console.log('signed FALSE status: ',signedIn);
   }

   return (
      <DataContext.Provider value={{signedIn,setSignedIn}}>
         <RouterProvider router={theRouter} />
      </DataContext.Provider>
   );
}
   
