/*const person = {
    name: 'Max', age: 33,
    greet() {
        console.log('Hi,I am' + this.name);
    }
};this is an example of class and objects*/
const hobbies = ['Sports', 'Cooking'];
//using spread operator
const coppiedArray = [...hobbies];
console.log(coppiedArray);

const toArray = (args1, args2, args3) => {
    return [args1, args2, args3];
}
console.log(toArray(1, 2, 3));

//using rest operator 
const toArray1 = (...args) => {
    return args;
}
console.log(toArray1(1, 2, 3, 5));