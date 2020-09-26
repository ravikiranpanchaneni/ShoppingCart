import React from "react";

function PaymentInfo(props) {
  const itemsPrice = caliculateItemsPrice(props.cartItems);
  const tax = caliculateTax(itemsPrice);
  const shippingPrice = caliculateShippingPrice(itemsPrice);
  const total = caliculateTotal(itemsPrice, tax, shippingPrice);
  return (
    <div>
      <h4> Payment Info </h4>
      <div className="paymentInfo">
        <div>
          <span>Item Price:</span>
          <span>{`$${itemsPrice}`}</span>
        </div>
        <div>
          <span>Tax:</span>
          <span>{`$${tax}`}</span>
        </div>
        <div>
          <span> Shipping Charge:</span>
          <span>{`$${shippingPrice}`}</span>
        </div>
        <hr />
        <div>
          <span> Total:</span>
          <span>{`$${total}`}</span>
        </div>
      </div>
      <div className="paymentButtons">
        <button
          onClick={() => {
            props.checkOut(total);
          }}
          disabled={props.cartItems && props.cartItems.length === 0}
        >
          Check Out{" "}
        </button>
        <button
          onClick={() => {
            props.cancelCheckout();
          }}
        >
          Cancel{" "}
        </button>
      </div>
    </div>
  );
}

function caliculateItemsPrice(items) {
  let sum: number = 0;
  items.forEach((item) => (sum += +item.price));
  return sum;
}

function caliculateTax(itemsPrice) {
  return (itemsPrice * 17) / 100;
}

function caliculateShippingPrice(itemsPrice) {
  return itemsPrice >= 1000 || itemsPrice <= 0
    ? 0
    : itemsPrice < 500
    ? 100
    : (itemsPrice * 5) / 100;
}
function caliculateTotal(...props) {
  let total: number = 0;
  props.forEach((item) => (total += +item));
  return total;
}
export default PaymentInfo;
