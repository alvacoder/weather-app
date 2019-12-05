
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
const darksky = require('./darksky/darksky');

console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);

geocode.geocodeAddress(encodedAddress, (errMessage, results) => {
    if(errMessage) {
        console.log(errMessage);
    } else if(results) {
        console.log(results);
        console.log(JSON.stringify(results, undefined, 2));
        let coordinates = results;

        darksky.darkskyTemperature(coordinates, (errMessage, results) => {
            if(errMessage) {
                console.log(errMessage);
            } else if(results) {
                console.log(results);
            }
        })
    }
});





