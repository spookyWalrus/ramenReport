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
      // <DataContext.Provider value={{signedIn,setSignedIn}}>
         <Route exact path="/" element={<RootLayout />}
         >  
            <Route index element={<Home />}  />
            <Route path="know" element={<Know />} />
            <Route path="report" element={<Report />} action={sendReportAction}/>
            <Route path="ratings" element={<Ratings />} />
            <Route path="login" element={<Login />} action={sendLoginAction} />
            <Route path="*" element={<ErrorPage />} />
         </Route>
      // </DataContext.Provider>
   )
);

export default function App() {
   const [signedIn,setSignedIn] = useState(false);
   // const {status, alert} = useActionData();
   // setSignedIn(status);
   // alert();
   if(signedIn === true){
      console.log('signed in status: ',signedIn);
   }
   return (
      <DataContext.Provider value={{signedIn,setSignedIn}}>
         <RouterProvider router={theRouter} />
      </DataContext.Provider>
   );
}
   
export const DataContext = createContext({});

