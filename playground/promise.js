let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Hey it worked!!');
        reject('Unable to fulfill promise');
    }, 2500);
});

somePromise.then((message) => {
    console.log('Success : ', message);
}, (errorMsg) => {
    console.log('Error : ', errorMsg);
})

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    })
}

asyncAdd(5, 7).then((res) => {
    console.log('Result: ', res);
    return asyncAdd(res, 33);
}, (errorMsg) => {
    console.log(errorMsg);
}).then((res) => {
    console.log(res);
}, (errorMsg) => {
    console.log(errorMsg);
})