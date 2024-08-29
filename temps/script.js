let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
  { name: "Sunglasses", price: 90 },
];

let total =
  shoppingCart[0].price +
  shoppingCart[1].price +
  shoppingCart[2].price +
  shoppingCart[3].price;

console.log("my shopping total", total);

let sum = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  sum = sum + shoppingCart[i].price;
  console.log("intermediate sum", sum);
}

console.log("my shopping sum", sum);
sum = 0;
shoppingCart.forEach(calculateTotal);

function calculateTotal(item) {
  sum = sum + item.price;
  console.log(sum);
}
console.log("my shopping sum", sum);
