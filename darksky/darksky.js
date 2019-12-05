const request = require('request');

let darkskyTemperature = (coordinates, callback) => {
    request({
        url: `https://api.darksky.net/forecast/25b83edc2b3fb0e4efc4443331813854/${coordinates.Latitude},${coordinates.Longitude}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Darksky Server.');
        } else if(response.statusCode === 200) {
            callback(undefined, { 
                Current_Temperature: body.currently.temperature 
            });
        }
    });
};

module.exports.darkskyTemperature = darkskyTemperature;
