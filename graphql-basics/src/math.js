
// Here, addFunc is being exported as a default, UNNAMED citizen. 
    // This means that we can name it whatever we want and use it. 
    // Also, we won't need curly braces to import it since it is anyways a DEFAULT export

// Here, subtractFunc is being as a NAMED citizen. 
    // This means that you gotta use curly braces to use and 
    // Use the exact same name that it is imported as, in the destination module

// const addFunc = (a,b) => a + b

// const subtractFunc = (a,b) => a - b

// export {
//     addFunc as default,
//     subtractFunc
// }