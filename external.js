// function myfunction() {
//   alert("welcome to Javatpoint");
//   return "welcome to Javatpoint";
// }

// document.getElementById("demo").innerHTML = myfunction();

function myFunction(name) {
  return "Hello " + name;
}
// document.getElementById("demo").innerHTML = myFunction("John");

// document.write(myFunction("John"));

var elem = document.getElementById("myDiv");
var msg = myFunction("Sam");
elem.innerHTML = msg;
