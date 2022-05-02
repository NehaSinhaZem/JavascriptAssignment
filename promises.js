function getData(uId) {
    fetch(uId)
        .then(response=>{
            console.log("Fetched the data!");
            return "skc@gmail.com";
        })
        .then(email=>console.log("Email id of the user id is: " + email));
}  
console.log("start");
var email = getData("skc");

console.log("end");