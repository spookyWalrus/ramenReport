import React,{Component} from 'react';
import Header from '../components/Header';
// import Banner from '../components/Banner';
import Descript from '../components/Descript';
import Report from '../components/Report';
import Footer from '../components/Footer';
import './App.css';

class App extends Component{
   render(){
      return (
         <div className="theBody">
               <Header />
               {/*<Banner />*/}
               <Descript />
               {/*<Report />*/}
               <Footer />
         </div>
        
      );
   }
}
export default App;
