let count = 10;
let a = 40;
{
  let a = 10;
  console.log("inside a", a);
}

let b = count + a;
console.log(b);

let myDetails = { name: null, id: 1 };
console.log(myDetails.name);
myDetails.name = 10;
if (a === 30) {
  console.log("name exists");
} else {
  console.log("name does not exists");
}
console.log(myDetails.name + 10);
let step = 0;
for (step = 0; step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  console.log("Taking step no:", step);
}
console.log("Step is now", step);
let heading = document.querySelector(".my-heading");
let myD = ` <h1> my full name is: rohit khot </h1>`;
console.log(heading);
