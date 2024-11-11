'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const API_KEY = '125344487419975561813x57623';

// *********************************************************
// OLD WAY OF FETCHING DATA
// *********************************************************

///////////////////////////////////////
// const getCountryDetails = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     const lan = [];
//     for (let key in data.languages) {
//       lan.push(data.languages[key]);
//     }

//     const curr = [];
//     for (let key in data.currencies) {
//       curr.push(data.currencies[key].name);
//       curr.push(data.currencies[key].symbol);
//     }

//     const html = `<article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000000
//             ).toFixed(1)} B</p>
//             <p class="country__row"><span>🗣️</span>${lan}</p>
//             <p class="country__row"><span>💰</span>${curr}</p>
//           </div>
//         </article>`;
//     countriesContainer.style.opacity = 1;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//   });
// };

// CALLBACK HELL AND USED DATA (FETCHED FROM FIRST REQUEST) TO SHOW DATA FOR BORDER COUNTRY

// const renderCountry = function (data, className) {
//   const lan = [];

//   console.log(data);
//   for (let key in data.languages) {
//     lan.push(data.languages[key]);
//   }

//   const curr = [];
//   for (let key in data.currencies) {
//     curr.push(data.currencies[key].name);
//     curr.push(data.currencies[key].symbol);
//   }
//   const html = `<article class="country ${className}">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000000
//             ).toFixed(1)} B</p>
//             <p class="country__row"><span>🗣️</span>${lan}</p>
//             <p class="country__row"><span>💰</span>${curr}</p>
//           </div>
//         </article>`;
//   countriesContainer.style.opacity = 1;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

// const getCountryDetails = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     renderCountry(data);

//     // if the country is island
//     if (!('borders' in data)) return;
//     const code = data.borders.at(0);

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${code}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [dataNeighbour] = JSON.parse(this.responseText);
//       renderCountry(dataNeighbour, 'neighbour');
//     });
//   });
// };

// getCountryDetails('japan');
// // getCountryDetails('usa');

const renderError = function (err) {
  countriesContainer.insertAdjacentHTML(
    'beforeend',
    `Found Error ! 🎆🎆 Error: ${err}`
  );
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className) {
  const lan = [];

  for (let key in data.languages) {
    lan.push(data.languages[key]);
  }

  const curr = [];
  for (let key in data.currencies) {
    curr.push(data.currencies[key].name);
    curr.push(data.currencies[key].symbol);
  }
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} M People</p>
            <p class="country__row"><span>🗣️</span>${lan}</p>
            <p class="country__row"><span>💰</span>${curr}</p>
          </div>
        </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// const whereAmI = function () {
//   getLocation
//     .then(position => {
//       const { latitude, longitude } = position.coords;
//       return fetch(
//         `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${API_KEY}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) throw new Error('Something went wrong');
//       return response.json();
//     })
//     .then(data => {
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);
//         return response.json();
//       }
//       // not used way to handle the errors
//       // err => alert(err)
//     )
//     .then(data => {
//       if (!('borders' in data[0])) throw new Error('Country not found');
//       const code = data[0].borders[0];

//       renderCountry(data[0]);
//       return fetch(`https://restcountries.com/v3.1/alpha/${code}`);
//     })
//     .then(
//       response => response.json()
//       // err => alert(err)
//     )
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       renderError(err.message);
//       return console.error(err);
//     })
//     .finally((countriesContainer.style.opacity = 1));
// };

////////////////////////////////////////
// Promisifying the Geolocation API
const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
  });
};

////////////////////////////////////////
// ASYNC AND AWAIT

const whereAmI = async function () {
  const location = await getLocation();
  const { latitude, longitude } = location.coords;
  // console.log(latitude, longitude);

  const resGeo = await fetch(
    `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${API_KEY}`
  );

  const currentLocationDetail = await resGeo.json();

  const resCountryDetail = await fetch(
    `https://restcountries.com/v3.1/name/${currentLocationDetail.country}`
  );

  const countryDetail = await resCountryDetail.json();

  renderCountry(countryDetail[0]);

  const resNeighbourDetail = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryDetail[0].borders[0]}`
  );

  const neighbourDetail = await resNeighbourDetail.json();
  // console.log(neighbourDetail[0]);
  renderCountry(neighbourDetail[0], 'neighbour');
};

btn.addEventListener('click', whereAmI);
