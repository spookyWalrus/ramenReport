
export const sendReportAction = async({ request })=> {
  const data = await request.formData();

  const report = {
    logstat: data.get('logstat'),
    email: data.get('email'),
    resto: 'Kinton Laval',
    noodles: data.get('noodles'),
    soup: data.get('soup'),
    toppings: data.get('toppings'),
    experience: data.get('experience'),
    comments: data.get('comments'),
  }

  let response;
  
  // function theError(){ // error call back function
  //   response =  {
  //       status: false
  //   }
  //   return response;
  // }

  // send your post request
  if(!(report.logstat)){
    console.log('Not logged in');
    alert('Please log in or register to make a report');
    return null;
  }else{
       return fetch('http://localhost:3000/report',
        {  method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: report.email,
              resto: report.resto,
              noodles: report.noodles,
              soup: report.soup,
              toppings: report.toppings,
              experience: report.experience,
              comments: report.comments
          })
        })
        .then(res => {
            if(res.ok){ // check for succesful credentials
              return res.json()
            }
            throw new Error(res.status);
        })
        .then(data => {
            // console.log(data);
            return response = {  
                  name: data.name,
                  entries: data.entries
              }
        })
        .catch((error) => {
            console.log(error);
            return response = {error: 'Logging error'};
        })
  }

}


