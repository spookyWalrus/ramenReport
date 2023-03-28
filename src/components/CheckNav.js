import {createContext} from 'react';
// set Datacontext for log in status
// const DataContext = createContext({});

// scroll behaviour
const ScrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -40; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}
// export {ScrollWithOffset,DataContext};
export {ScrollWithOffset};


// ===============  login user / fetch request ============
export const sendLoginAction = async({ request })=> {

    const logindata = await request.formData();

    const login = {
        user: logindata.get('userName'),
        password: logindata.get('password'),
        email: logindata.get('email'),
        logReg: logindata.get('logreg')
    }

    let response;
    function actionReturn(userstat){ // callback when fetch for user login is succesful
        var size = Object.keys(userstat).length;
        console.log('size: ',size);
        // if(login.logReg === 'login'){
        if(size > 0){
            response = {
                    alert: alert(" successful login"),
                    userstat: userstat,
                    status: true
                }
        }else if (login.logReg === 'register'){
            response = { 
                status: true,
                alert: alert(" Registeration successful checkNav")
            }
        }else{
            response =  {
                alert: alert('uh oh')
            }
        }
        return response;
    }

    function theError(){
        response =  {
                status: false
            }
        return response;
    }
  

    // send your post request via fetch() and verify credentials
    if (login.logReg === "login"){
       return fetch('http://localhost:3000/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: login.email,
                    password: login.password,
            })
        })
        .then(res => {
            if(res.ok){ // check for succesful credentials
                return res.json();
            }
            throw new Error(res.status);
        })
        .then(data => {
            return response = {
                        alert: alert(" successful login"),
                        userstat: data,
                        status: true
                    }
        })
        .catch((error) => {
            console.log(error);
            return response = {error: 'Logging error'};
        })

    }else if(login.logReg === "register"){
    return fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: login.email,
                    name: login.user,
                    password: login.password
                })
        })
        .then(res => {
                if(res.ok){ // check for succesful credentials
                    return res.json();
                }
                throw new Error(res.status);
        })
        .then(data => {
            return response = { 
                status: true,
                userstat: data,
                alert: alert(" Registeration successful")
            }
        })
        .catch((error) => {
            console.log(error);
            return response = {regerror: 'Registration error'};
        })
    }

   
    // return response;
}


