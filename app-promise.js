const axios = require('axios');
const yargs = require('yargs');
const argv = yargs
            .options({
                a: {
                    demand:true,
                    alias: 'address',
                    describe: 'Address to fetch weather for',
                    string: true
                }
            })
            .help()
            .alias('help', 'h')
            .argv;

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

//console.log(argv);

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `http://open.mapquestapi.com/geocoding/v1/address?key=x6kQpPkfm6eSGsVVmlK7smOtxZ2ZGa5y&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.status !== 200) {
        throw new Error('Unable to find address');
    }
    var latitude = response.data.results[0].locations[0].latLng.lat;
    var longitude = response.data.results[0].locations[0].latLng.lng;
    let weatherUrl = `https://api.darksky.net/forecast/25b83edc2b3fb0e4efc4443331813854/${latitude},${longitude}`;
    console.log(JSON.stringify(response.data.results[0].locations[0].latLng, undefined, 2));

    axios.get(weatherUrl).then((response) => {
        //console.log(response);
        if(response.status !== 200) {
            throw new Error('Unable to get weather information');
        }
        console.log('Current Temperature: ', response.data.currently.temperature)
    })
}).catch((e) => {
    //console.log(e);
    console.log('Unable to connect to API servers.');
})