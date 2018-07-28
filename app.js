/**
*  Downloader privat24 API Archive NBU 
* 
*/
const colors = require('colors')
const axios = require('axios')
const sleep = (ms) => new Promise((r, j)=>setTimeout(r, ms))

// define for which period get archive
const YEAR  = 2018
const MONTH = 5
const DAYS  = 31

// даты на которых упали запросы
const REST_DATES = []

// start download
Downloader()


/**
 * Main function
 */
function Downloader () {
  let requests = []  // array of promises to API
  let month = MONTH < 10 ? '0' + MONTH : MONTH
  
  for (let i = 0; i < DAYS; i++) {  
  //   let request = privat24NBU(`${i}.${MONTH}.${YEAR}`)    

    let day = i+1
    day = day < 10 ? '0' + day : day
  
    try {
      sleep(8000*i)
      .then(() => {
        let date = `${day}.${month}.${YEAR}`
        // console.log(date)
        // let req = new Promise((r, j) => r('asd'))

        let req = privat24NBU(date)   
        requests.push(req)
      })

    } catch (err) {
      console.log(colors.red('==============> ERROR in Downloader() try catch'))
      console.log(err)
      console.log(colors.red('==============> ERROR in Downloader() try catch'))
    }
  }

 // getting results
  Promise.all(requests).then((values) => {
    console.log(colors.green('ALL DATA HAS BEEN RECEIVED'))

    if (REST_DATES.length) {
      DownloadRestDates()
    }
  })
}

/**
 * Donwload dates that request failed
 */
function DownloadRestDates () {
  for (let index in REST_DATES) {
    try {
        sleep(8000*index)
        .then(() => {
          let req = privat24NBU(REST_DATES[index])   
          requests.push(req)
        })
  
      } catch (err) {
        console.log(colors.red('==============> ERROR in Downloader() try catch'))
        console.log(err)
        console.log(colors.red('==============> ERROR in Downloader() try catch'))
      }
  }
}


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

