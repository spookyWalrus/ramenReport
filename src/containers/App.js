import {createBrowserRouter, 
         createRoutesFromElements,
         RouterProvider,
         Route } from 'react-router-dom';

//Layouts
import RootLayout from '../layout/RootLayout';

//pages
// import Banner from '../components/Banner';
import Home from '../pages/Home';
import Report from '../pages/Report';
import Ratings from '../pages/Ratings';
import ErrorPage from '../pages/ErrorPage';
import './App.css';

const theRouter = createBrowserRouter(
   createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
         <Route index element={<Home />} />
         <Route path="report" element={<Report />} />
         <Route path="ratings" element={<Ratings />} />
         <Route path="*" element={<ErrorPage />} />
      </Route>
   )
);

function App() {
   return (
      <RouterProvider router={theRouter} />
   );
}

export default App;

