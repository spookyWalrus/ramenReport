import {createContext} from 'react';

// set Datacontext for log in status
const DataContext = createContext({});

// scroll behaviour
const ScrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -40; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}
export {ScrollWithOffset,DataContext};

// login user
export const sendLoginAction = async({ request })=> {
    const logindata = await request.formData();

    const login = {
        user: logindata.get('userName'),
        password: logindata.get('password'),
        logReg: logindata.get('logreg')
    }
    // console.log(login)


    // send your post request via fetch() and verify credentials
    if (login.logReg === "login"){
        if(login.user.length > 1){
            return { status: true,
                    alert: alert("successful login"),
            }
        }else{
            return {error: 'Uh-oh, there was an error logging in'}
        }
    }else if(login.logReg === "register"){
        if(login.user.length > 1){
            return { status: true,
                    alert: alert("You are now registered!")
            }
        }else{
            return {errorReg: 'Uhhh, there was an error registering'}
        }
    }
    // below should be catch error statement for unsuccesful login
}


