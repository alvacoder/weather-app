const request = require('request');
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

console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);

request({
    url: `http://open.mapquestapi.com/geocoding/v1/address?key=x6kQpPkfm6eSGsVVmlK7smOtxZ2ZGa5y&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    //console.log(JSON.stringify(body, undefined, 2));
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
});

