import React from 'react';
 
function PaymentInfo(props) {
const itemsPrice = caliculateItemsPrice(props.cartItems);
const tax = caliculateTax(itemsPrice);
const shippingPrice = caliculateShippingPrice(itemsPrice);
const total = caliculateTotal(itemsPrice, tax, shippingPrice);
  return <div> 
  <label> Payment Info </label>
  <label>  itemPrice: {itemsPrice}  </label><br/>
  <label>  tax: {tax}  </label> <br/>
  <label>  shippingPrice: {shippingPrice}  </label> <br/>
  <label>  total: {total}  </label> <br/>
  <button onClick={()=>{props.checkOut(total)}} disabled={props.cartItems.length<0 ? 'disabled': ''}>Check Out </button> <br/>
  <button onClick={()=>{props.cancelCheckout()}}>Cancel </button> <br/>
  
</div>
}
 
function caliculateItemsPrice(items){
	let sum: number = 0;
items.forEach(item => sum += +item.price);
return sum;
}

function caliculateTax(itemsPrice){
return (itemsPrice*17/100);
}

function caliculateShippingPrice(itemsPrice){
	return (itemsPrice>=1000 || itemsPrice<=0) ? 0 : (itemsPrice <500 ? 100 :  itemsPrice*5/100)
}
function caliculateTotal(...props){
	let total: number = 0;
	props.forEach(item => total += +item);
	return total;
}
export default PaymentInfo;