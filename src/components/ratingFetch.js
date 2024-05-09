function ratingFetch(data) {
  console.log("ratingFetch got the data: ", data);
  // console.log(data[data.length-1]);

  // ==== making up credentials to avoid logging in for dev testing ====
  let user;
  if (data[data.length - 1] === 0) {
    user = {
      email: "ramen@mail.com",
      entries: 3,
      id: 6,
      joined: "2023-05-30T13:20:19.714Z",
      name: "ramen",
    };
    data.pop();
    data.splice(data.length, 0, user);
  } else {
    user = data[data.length - 1];
  }
  // console.log(data);

  // === get ratings data ====
  // let dbData;
  return fetch(
    // 'https://ramenreportserver.onrender.com/render/ratings',
    "http://localhost:3001/ratings",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
    .then((res) => {
      if (res.ok) {
        // check for succesful credentials
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    .then((data) => {
      return sortData(data);
    })
    .catch(function (error) {
      console.error("uh oh: ", error);
    });
}

function sortData(data) {
  let ranking = data.map((v, i) => {
    let total = (v.experience + v.soup + v.noodles + v.toppings) / 4;
    let resto = v.resto;
    return { [resto]: total };
  });
  return ascendata(ranking);
}

function ascendata(ranking) {
  ranking.sort(function (a, b) {
    return Object.values(b) - Object.values(a);
  });
  // console.log(ranking)
  return ranking;
}

export default ratingFetch;
