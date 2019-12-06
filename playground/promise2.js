const request = require('request');

/* let geocodeAddress = (encodedAddress) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://open.mapquestapi.com/geocoding/v1/address?key=x6kQpPkfm6eSGsVVmlK7smOtxZ2ZGa5y&location=${encodedAddress}`,
            json: true
        }).then((location) => {
            console.log(JSON.stringify(location, undefined, 2));
        }, (errorMsg) => {
            console.log('Unable to connect to mapquest api');
        })
    })
} */

let geocodeAddress = (encodedAddress) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://open.mapquestapi.com/geocoding/v1/address?key=x6kQpPkfm6eSGsVVmlK7smOtxZ2ZGa5y&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to mapquest server.');
            } else if(!error && response.statusCode === 200) {
                //resolve(console.log(JSON.stringify(body, undefined, 2)));
                resolve({
                    Latitude: body.results[0].locations[0].latLng.lat,
                    Longitude: body.results[0].locations[0].latLng.lng
                });
                let latitude = body.results[0].locations[0].latLng.lat;
                let longitude = body.results[0].locations[0].latLng.lng;

                //getWeather(latitude, longitude);

                let getWeather = (latitude, longitude) => {
                    return new Promise((resolve, reject) => {
                        request({
                            url: `https://api.darksky.net/forecast/25b83edc2b3fb0e4efc4443331813854/${latitude},${longitude}`,
                            json: true
                        }, (error, response, body) => {
                            if(error) {
                                reject('Unable to connect to darksky server.');
                            } else if (!error && response.statusCode === 200) {
                                resolve({Current_Temperature: body.currently.temperature});
                            }
                        })
                    })
                }

                getWeather(latitude, longitude).then((weather) => {
                    console.log(JSON.stringify(weather, undefined, 2));
                }, (errorMsg) => {
                    console.log(errorMsg);
                });
            }
        });
    })
}

let getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/25b83edc2b3fb0e4efc4443331813854/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to darksky server.');
            } else if (!error && response.statusCode === 200) {
                resolve({Current_Temperature: body.currently.temperature});
            }
        })
    })
}

geocodeAddress(54913).then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMsg) => {
    console.log(errorMsg);
});