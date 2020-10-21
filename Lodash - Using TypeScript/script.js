//Chunk Function Divides array into chunks of size mentioned and outputs array of generated chunks
function chunk(inputArr, count) {
    var output = [];
    var i = 0;
    while (inputArr.length > 0) {
        var obj = [];
        i = 0;
        while (i < count && inputArr.length > 0) {
            obj.push(inputArr[i]);
            inputArr.splice(i, 1);
            i++;
        }
        output.push(obj);
    }
    return output;
}
//Reduce function reduces the array to single value by assigning value genertaed by function each time to the accumulator
function reduce(inputArr, fn, accumulator) {
    if (!Array.isArray(inputArr)) {
        throw ("TypeError:reduce can be applied only on arrays!");
    }
    inputArr.forEach(function (element) { accumulator = fn(accumulator, element); });
    return accumulator;
}
//Filter runs a supplied mfunction on each item of the array and return the subarray of itwms foir which the function returns true
function filter(inputArr, fn) {
    var output = [];
    if (!Array.isArray(inputArr)) {
        throw ("TypeError:reduce can be applied only on arrays!");
    }
    inputArr.forEach(function (element) { if (fn(element)) {
        output.push(element);
    } });
    return output;
}
//Find runs a supplied function on each item and return the first item it returns true
function find(inputArr, fn) {
    var output;
    if (!Array.isArray(inputArr)) {
        throw ("TypeError:reduce can be applied only on arrays!");
    }
    for (var i = 0; i < inputArr.length; i++) {
        if (fn(inputArr[i])) {
            return inputArr[i];
        }
    }
    return undefined;
}
//Given an array of numbers sum returns the sum of all it's members
function sum(inputArr) {
    var sum = 0;
    inputArr.forEach(function (num) { return sum = sum + num; });
    return sum;
}
