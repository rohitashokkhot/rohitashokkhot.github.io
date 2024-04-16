let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];

function calculateTotal(cart) {
  let total = 0;
  cart.forEach(calculate);
  function calculate(item) {
    total += item.price;
  }
  // for (let i = 0; i < cart.length; i++) {
  //   total = total + cart[i].price;
  // }
  console.log(total);
  return total;
}

function submitForm() {
  const selectedItems = document.querySelectorAll(
    'input[name="items"]:checked'
  );
  let total = 0;
  selectedItems.forEach((item) => {
    total += parseFloat(item.dataset.price); // Using dataset to get the price
  });
  console.log("Total Price: $" + total);
  let finalPrice = calculateDiscount(total);
  console.log("discounted price", finalPrice);
  let msg = document.querySelector("#msg");
  msg.innerHTML = `the total price is <strong> ${total} </strong> <br/> The discounted price is <strong> ${finalPrice} </strong>`;
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
