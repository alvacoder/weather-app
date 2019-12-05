const request = require('request');

let geocodeAddress = (encodedAddress, callback) => {
    request({
        url: `http://open.mapquestapi.com/geocoding/v1/address?key=x6kQpPkfm6eSGsVVmlK7smOtxZ2ZGa5y&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to mapquest servers');
        } else if(response.statusCode === 200) {
            callback(undefined, {
            Latitude: body.results[0].locations[0].latLng.lat,
            Longitude: body.results[0].locations[0].latLng.lng
            });

        }
    });
};

module.exports.geocodeAddress = geocodeAddress;