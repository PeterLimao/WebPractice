var Q = require('q');

var defer = Q.defer();

var users = [
    {
        name: 'admin1',
        password: '123'
    }
];

function getUserName() {
    return defer.promise;
}

function getUser(userName) {
    var user;
    users.forEach(function(thisUser) {
        if (userName === thisUser.name) {
            user = thisUser;
        }
    });
    return user;
}

getUserName().then(function(userName) {
    return getUser(userName);
}).then(function(user) {
    console.log(user);
});

defer.resolve('admin1');