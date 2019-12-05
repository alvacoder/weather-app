var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'ATB'
    };
    callback(user);
};

getUser(31, (userObject) => {
    console.log(userObject);
});