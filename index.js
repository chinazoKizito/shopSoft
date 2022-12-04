const availableGoods = {
  1: {
    name: 'bread',
    price: 20,
    quantity: 240,
  },

  2: {
    name: 'orange',
    price: 5,
    quantity: 100,
  },

  3: {
    name: 'napkin',
    price: 300,
    quantity: 56,
  },

  4: {
    name: 'shirt',
    price: 39,
    quantity: 200,
  },

  5: {
    name: 'laptop',
    price: 800,
    quantity: 50,
  },

  6: {
    name: 'toy',
    price: 40,
    quantity: 300,
  },

  7: {
    name: 'meat',
    price: 59,
    quantity: 15,
  },

  8: {
    name: 'coca-cola',
    price: 25,
    quantity: 400,
  },

  9: {
    name: 'crackers',
    price: 10,
    quantity: 500,
  },

  10: {
    name: 'iphone',
    price: 400,
    quantity: 130,
  },
}

function welcomeUser() {
  console.log("====================================================================================");
  console.log(`Welcome to ShopSoft Where Everyday products are gotten cheaper than at other shops`);
}

function showGoods(validUser) {
  let goods = [];
  let prices = [];
  for (key in availableGoods) {
    goods.push(availableGoods[key].name);
    prices.push(availableGoods[key].price);

  }
  console.log("=========================================================================");
  console.log(`          Hi ${validUser} Goods currently available in the shop  are     `);
  console.log("=========================================================================");
  console.log("Goods", goods),
    console.log("Price in dollars", prices)
  console.log("=========================================================================");
  console.log(`Type the name and quantity of the product you want below`)
}

function showCart(shoppingCart) {
  output = []
  for (let i = 0; i < shoppingCart.length; i++) {
    for (let key in shoppingCart[i]) {
      output.push(`(${key}, ${shoppingCart[i][key]})`)
    }
  }
  console.log("Your Cart", output);
}


let shoppingCart = [];

function processGoods(product, available = availableGoods, shoppingCart, purchaseDetails) {
  let goods = [];
  for (key in availableGoods) {
    goods.push(availableGoods[key].name);
  }

  if (goods.includes(product)) {
    shoppingCart.push(purchaseDetails);
  } else {
    console.log("Product not available in shop");
  }
  showCart(shoppingCart)
  console.log("=========================================================================");

}

function removeProductFromCart(prdt) {
  console.log(`Removing ${prdt}..................`)

  for (let i = 0; i < shoppingCart.length; i++) {
    for (let prop in shoppingCart[i]) {
      if (prdt.toLowerCase() == prop) {
        shoppingCart.pop(purchaseDetails);
        console.log(`All your ${prdt}s  were removed`)
      } else {
        "Product not in cart"
      }
    }
  }

  showCart(shoppingCart)
}


function checkoutCart(shoppingCart, availableGoods) {
  console.log("Proceeding to checkout......................")
  console.log(`=====================================================================`)
  let price = []

  for (i = 0; i < shoppingCart.length; i++) {
    for (key in shoppingCart[i]) {
      for (prop in availableGoods) {
        if (key === availableGoods[prop].name) {
          price.push(Number(shoppingCart[i][key]) * availableGoods[prop].price)
          availableGoods[prop].quantity -= Number(shoppingCart[i][key])
        }
      }
    }
  }
  return totalPrice = price.reduce((acc, value) => { return acc + value; }, 0);
}


welcomeUser()
let user = prompt("Please enter your name");
let validUser = (user ?? 'Beloved customer');

if (validUser === 0 || validUser === '0' || validUser === '' || validUser === null || validUser == 'undefined') { validUser = 'Beloved customer'; }



showGoods(validUser);

outer:
while (true) {
  let product = prompt("Product: ")
  if (product === null || product === undefined || product === '') {
    console.log(`${validUser}, Please enter a valid product name from goods above`)
    continue outer
  } else { product = product.toLowerCase() }

  numberCheck:
  while (true) {
    let buyerQuantity = prompt("How many? ");
    buyerQuantity = parseInt(buyerQuantity);

    if (isNaN(buyerQuantity) || buyerQuantity == 0) {
      console.log(`${validUser}, Please Enter valid number of goods you want`);
      continue numberCheck;
    } else {
      var purchaseDetails = {};
      purchaseDetails[product] = buyerQuantity;
      break;
    }
  }


  processGoods(product, availableGoods, shoppingCart, purchaseDetails)

  let feedback = prompt('Do you want another product, type y / n');
  feedback = feedback ?? 'n';
  feedback = feedback.toLowerCase();


  if (feedback === 'y') {
    showGoods(validUser)
    continue outer
  }


  let removeFeed = prompt("Do you want to remove any goods, type y/n");
  removeFeed = removeFeed ?? 'n'
  removeFeed = removeFeed.toLowerCase();


  if (removeFeed === 'y') {
    prdtRemover:
    while (true) {
      let prdt = prompt('Which product do you want to remove from cart before we proceed to payment: ')
      if (prdt === null || prdt === undefined || prdt === '') {
        console.log("Pls enter a valid product")
        showCart(shoppingCart)
        continue prdtRemover
      } else {
        removeProductFromCart(prdt)
        var total = checkoutCart(shoppingCart, availableGoods)
        console.log(`Hi ${validUser}, Total Price of goods you bought is ${total} dollars`)
        break prdtRemover
      }
    }
  } else {
    var total = checkoutCart(shoppingCart, availableGoods)
    console.log(`Hi ${validUser}, Total Price of goods you bought is ${total} dollars`)
  }



  inner:
  while (total != 0) {
    payer = prompt('Enter your mode of payment,   type mastercard or paypal')
    payer = payer ?? 'Another'
    payer.toLowerCase()

    if (payer === 'mastercard' || payer === 'paypal') {
      console.log(`Payment of ${total} dollars  Recieved with ${payer}`)
      break inner
    } else {
      console.log('Please enter mastercard / paypal')
      continue inner;
    }
  }

  console.log(`======================================================================`)
  showCart(shoppingCart)
  console.log(`Thank you for shopping with Kizito's Shopsoft`)
  break
}