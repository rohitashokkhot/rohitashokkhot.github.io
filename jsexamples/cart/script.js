let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];

function calculateTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price;
  }
  console.log(total);
  return total;
}

function calculateDiscount(total) {
  let discount = 0.1;
  let checkoutPrice = 0;
  if (total > 100) {
    checkoutPrice = total - total * discount;
  }
  return checkoutPrice;
}

let checkoutPrice = 0;
let total = calculateTotal(shoppingCart);
console.log(total);
let finalPrice = calculateDiscount(total);
console.log("discounted price", finalPrice);
