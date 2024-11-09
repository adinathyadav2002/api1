'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderCountry = function (data, className) {
  const lan = [];

  console.log(data);
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
              +data.population / 1000000000
            ).toFixed(1)} B</p>
            <p class="country__row"><span>🗣️</span>${lan}</p>
            <p class="country__row"><span>💰</span>${curr}</p>
          </div>
        </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryDetails = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    renderCountry(data);

    const code = data.borders[0];

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${code}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [dataNeighbour] = JSON.parse(this.responseText);
      renderCountry(dataNeighbour, 'neighbour');
    });
  });
};

getCountryDetails('india');
// getCountryDetails('usa');
