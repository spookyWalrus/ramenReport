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
        email: logindata.get('email'),
        logReg: logindata.get('logreg')
    }

    let response;
    function actionReturn(userstat){ // 
        var size = Object.keys(userstat).length;
        console.log('size: ',size);
        // if(login.logReg === 'login'){
        if(size > 0){
            response = {
                    alert: alert(" successful login"),
                    userstat: userstat,
                    status: true
                }
            // console.log(response);
            return response;

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

    function conOut(go){
        console.log('json response name: ',go.name);
        console.log('json response count: ',go.count);
    }

    // send your post request via fetch() and verify credentials
    if (login.logReg === "login"){
       return fetch('http://localhost:3000/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: login.user,
                    password: login.password,
            })
        })
        .then(res => res.json())
        .then(data => {
            // actionReturn(data) })
            return response = {
                    alert: alert(" successful login"),
                    userstat: data,
                    status: true
                }
            // console.log(response);
        })
        // .catch((error)=>{actionReturn(false)})
        .catch(console.error)
    }else if(login.logReg === "register"){
    return fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: login.email,
                    user: login.user,
                    password: login.password
                })
        })
        .then(response => response.json())
        // .then(res => conOut(res) )
        .then(actionReturn(true) )
        .then(res => conOut(res) )

        
        // .catch((error)=> actionReturn('pants')
            // error.status(400).json('error registering') 
        // )
        // .then((resp) =>{
        //     if(!resp.ok){
        //         throw Error(resp.status);
        //         actionReturn('pants');
        //         // return resp.statusText;
        //     }
        // })
        // .then(action)
        .catch(resp=>console.log(resp.status, resp.statusText))
        // .catch(error => {response.status(400).json('cannot connect to server')})
        // .catch(response => {response.status(500).json('cannot register, server error')})




            // return {errorReg: 'Uhhh, there was an error registering'}
        // }
    }

   
    return response;

    // if (response){
    //       return { status: true,
    //                 alert: alert("successful login")}
    // }else{
    //         return {error: 'Uh-oh, there was an error logging in'}
    // }
    // below should be catch error statement for unsuccesful login
}


