var func1 = function(next) {
    console.log('func1');
    next();
};

var func2 = function(next) {
    console.log('func2');
    next();
};

var func3 = function(next) {
    console.log('func3');
    next();
};

var func4 = function(next) {
    console.log('func4');
    next();
};

var middlewares = [func1, func2, func3, func4];

var index = 0;

var next = function() {
    var func = middlewares[index];
    if(index < middlewares.length) {
        index++;
        func(next);
    } else {
        return;
    }
};

next();