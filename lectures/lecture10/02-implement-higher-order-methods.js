class SuperArray extends Array {

    map1(callback) {
        const newArray = [];

        for (let i =0; i < this.length; i++){
            newArray.push(
                callback(this[i], i , this)
            )
        }
    }

    filter1(callback) {
        const newArray = new SuperArray();

        for (let i =0; i < this.length; i++){

            //if it matchec add it to the array copy
            if (callback(this[i])){
            newArray.push(this[i])
            }  
        } 
        return newArray;
    }

    reduce1(callback) {
        // TODO
    }

}
function dataTransform(item){
    return item ** 3; 
}

// function isEven(item, idx, originalArray){
//     return item % 2 == 0; 
// }

const myArray = new SuperArray(1, 2, 3, 4, 5);

const newArray = myArray.map1(dataTransform);
console.log("Actual:", myArray.filter1(item => item > 2));
// console.log("Expected:", [3, 4, 5]);

console.log(newArray)
