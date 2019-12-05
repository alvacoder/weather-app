const request = require('request');

request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=140%20ijesha%20road',
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});