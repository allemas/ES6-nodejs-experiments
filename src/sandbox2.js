//Promise sandbox
/*
var item = [1, 2, 3, 4];
var fn = function (v) {
    return new Promise(resolve => setTimeout(resolve(v * 2)), 2000);
}

const t= (item.map(fn));
console.log(t);
// return => [ Promise { 2 }, Promise { 4 }, Promise { 6 }, Promise { 8 } ]
const result = Promise.all(t);
console.log (result);
// return ==> pending...
result.then(console.log);*/

var c = { totA: "taat" };
var d = { toto: "titi" };

var e = {...c, ...d}
console.log(e);