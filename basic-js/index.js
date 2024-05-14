// Example to show basic promise creation and resolution.

const cart = ["item1", "item2", "item3"];

//promise chaining and resolution and rejection.

const promise = createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    proceedToPayment(orderId);
  })
  .catch(function (err) {
    console.log(err.message);
  });

function createOrder(cart) {
  const createOrderPromise = new Promise(function (resolve, reject) {
    if (cart.length == 0) {
      const err = new Error("Cart is Not Valid");
      reject(err);
    } else {
      const orderId = "OK-OK-OK";
      resolve(orderId);
    }
  });

  return createOrderPromise;
}

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
      console.log("Payment Resolved for Order-Id " + orderId);
      resolve(orderId);
    }
  );
}
