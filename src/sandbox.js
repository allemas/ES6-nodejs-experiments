//In that example, it looks exactly like the mapping function you’ll find in most
//languages: You pass it a function, and it calls the function with one argument, the element of the array.
//However, that’s not the whole story. JavaScript’s map actually calls each function with three arguments:
// The element, the index of the element in the array, and the array itself.
const myUnary = (fn) => {
    return function (something) {
        return fn.call(this, something);
    }
}

const co = [1, 2, 3.1].map(myUnary(parseInt));

//équivalent parseInt(string[, radix])
//const co = [1, 2, 3.1].map((s) => parseInt(s));
//console.log(co);



const tap = (value, fn) => {
    const curried = (fn) => (
        typeof (fn) === 'function' ? fn(value) : value
    );
    return fn === undefined
        ? curried
        : curried(fn);
}

/*tap('espresso')((it) => {
    console.log(`Our drink is '${it}'`)
});*/

const one = (fn) => {
    let done = false;
    return function () {
        console.log(done);
        console.log(arguments);
        console.log(this);
        return done ? void 0 : ((done = true), fn.apply(this, arguments))
    }
}

/*const testOneApply = one((t = "ou jsuis ?") => console.log(t));
testOneApply();
//"ou jsuis ?"
testOneApply();
//undefined
testOneApply();
//undefined
*/
/**
 * You can use await with any function which returns a promise. The function you're awaiting doesn't need to be async necessarily.
You should use async functions when you want to use the await keyword inside that function. If you're not gonna be using the await keyword inside a function then you don't need to make that function async.
async functions by default return a promise. That is the reason that you're able to await async functions.
 *
 *
 */
const getUser = async (fn) => {
    return await new Promise(resolve => setTimeout(fn, 5000))
}

const t = async function () {
    getUser(() => { console.log("dlfksjfsmldk") });
    console.log("dslkjfdmljf222");
}
//t();

async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 10000)
    });
    // wait until the promise returns us a value
    let result = await promise;

    console.log("A");
    // "Now it's done!"
    console.log(result);
    console.log("B");

};
firstAsync();