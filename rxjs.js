
const rxjs = require('rxjs')
const { Observable } = require('rxjs')

// define for which period get archive
const YEAR  = 2018
const MONTH = 5
const DAYS  = 31


// Interval example
// const { interval } = require('rxjs')
// const source = interval(1000)
// source.subscribe(console.log)



// console.log(rxjs)


let source = Observable.create((obs) => {
  setInterval(() => {

     


      obs.next('axasx')





    }, 2000) 

})

source.subscribe(console.log)



/**
 * Privat24 API
 * @param {*} date 
 */
function privat24NBU(date = '01.12.2014') {
    return axios.get('https://api.privatbank.ua/p24api/exchange_rates?json&date=' + date)
      .then((response) => {
        // handle success
        console.log( colors.cyan(date) + colors.green(' - ARCHIVE RECEIVED') )
      //   console.log(response.data)
      })
      .catch((error) => {
          console.log(colors.red('==============> ERROR in privat24NBU() catch'))
         console.log(error);
         console.log(colors.red('==============> ERROR in privat24NBU() catch'))
  
         REST_DATES.push(date)
      })
  //   .then(function () {
  //     // always executed
  //   });
  }
  