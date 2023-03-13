// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that 
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of 
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = ev => {
    ev.preventDefault(); // overrides default button action

    // Get user's preferences:
    const searchTerm = document.querySelector('#search_term').value;
    const openOnly = document.querySelector('#is_open').checked;
    
    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
}

// Part 1.1a
const filterClassFull = course => {

    //Initializes a checkbox
    var checkBox = document.getElementById("is_open");

    //Checks the status of checkBox, if it's checked then the filter will be applied
    //otherwise, the filter (or rather map) will not be applied
    if (checkBox.checked == true){
        if (course.Classification.Open == true){
        return true;
    }else { 
        return false;
    }
    }else{
        return true
    }
}

// Part 1.1b
const filterTermMatched = course => {
    // Filters for Instructor, CRN, class name and department
    const searchTerm = document.querySelector('#search_term').value.toLowerCase();
    const instructorName = course.Instructors[0].Name.toLowerCase();
    const department = course.Department.toLowerCase();
    const crn = course.CRN;

    //If statement with several or conditions, matching the consts above
    if (course.Title.toLowerCase().includes(searchTerm) || 
    instructorName.includes(searchTerm) ||
    department.includes(searchTerm)||
    crn==(searchTerm)){
    return true;
    }else {
        return false;
    }
}

// Part 1.2
const dataToHTML = course => {

    //Checks the status of the class and displays the information in the course block.
    if (course.Classification.Open == true){ 
        icon = '<i class="fa-solid fa-circle-check"></i>';
        ifOpen = 'Open';
        seats = course.EnrollmentMax - course.EnrollmentCurrent;
    }else {icon = '<i class="fa-solid fa-circle-xmark"></i>';
        seats = 0;
        ifOpen = 'Closed';
    }



    // the HTML that is to be injected into the DOM
    return `<section class="course">
    <h2>${course.Code}: ${course.Title}</h2>
    <p>
        ${icon}
        ${ifOpen}  &bull; ${course.CRN} &bull; Seats Available: ${seats}
    </p>
    <p>
        ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
    </p>
    <p><strong>${course.Instructors[0]}</strong></p>
</section>`;
}

// Part 2

const showData = (searchTerm, openOnly) => {
    console.log(searchTerm, openOnly);
    console.log(data); // imported from course-data.js    
/* 
1. Filter out by search term 
2. Filter out by whether open or closed 
3. Take the matched ocurses ans converr tehm all to an HTML array
4. Join that array of strings to a mega string 
5. Insert it into the DOM
*/

//behind the scenes filter rmethod is invoking the filterTermMatched(item) 
//on every item in the array.
const dataThatMatchesQuery = data.filter(filterTermMatched);
console.log("List of data that matches query:", dataThatMatchesQuery);
const onlyShowOpenClassesIfSpecified = dataThatMatchesQuery.filter(filterClassFull);
console.log("List of open classes (if specified):", onlyShowOpenClassesIfSpecified);
const listOfHTMLChunks = onlyShowOpenClassesIfSpecified.map(dataToHTML);
console.log("List of strings:", listOfHTMLChunks);

const megaString = listOfHTMLChunks.join('\n');
console.log(megaString);

//Out with the old, in with the new!
document.querySelector(".courses").innerHTML ="";
 document.querySelector(".courses").insertAdjacentHTML('beforeend',megaString);
// document.querySelector(".courses").insertAdjacentHTML
// ('beforeend', data.filter(
//     filterTermMatched
//     ).filter(
//         filterClassFull
//     ).map(
//         dataToHTML
//     ).join('')
//     );
}



//DEMO of how map works 
// class coolArray extends Array{ 
//     [1,2,3]
//     mapChase(functionToApplyToEachItemOfTheArraylater){
//         const copy = [];
//         for (const item of this) {
//             const result = functionToApplyToEachItemOfTheArrayLater(item);
//             copy.push(result);
//         }
//         return copy;
//     }
// }

// function doubleNumber(num){
//     return 2*num;
// }

// function squareNumber(num){
//     return num*num;
// }

// const testArray = new coolArray(1,2,4,7, 9, 11);
// console.log(testArray.length);
// console.log(testArray.mapChase(doubleNumber));
// console.log(testArray.mapChase(squareNumber));