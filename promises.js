function getData(uId,callback) {
    setTimeout(() => {
        console.log("Fetched the data!");
        return callback("skc@gmail.com");
        }, 4000);
}  
console.log("start");
var email = getData("skc",(email)=>{console.log("Email id of the user id is: " + email);});

console.log("end");