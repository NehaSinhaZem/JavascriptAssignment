function add(num1,num2){
    return num1+num2;
}
function calculate(addition,a,b){
    console.log("Adding "+a+" and "+b+" gives "+ addition(a,b));
}
calculate(add,3,8);

const res = (firstName,lastName)=>{
    return firstName[0]+lastName[0];
}
console.log(res("Neha","Sinha"));

const printName = (name) =>'Hi ' + name;
console.log(printName("Hritik"))

const printBill = (name, bill) => {
    return `Hi ${name}, please pay: ${bill}`;
}
console.log(printBill("Hritik",78));

const person = {
    name: "Noam Chomsky",
    age: 92
}

let {name,age} = person;
console.log(name);
console.log(age);