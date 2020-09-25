import React from 'react';
 
function CartItems(props) {
  return props.cartItems.map((cartItem) => {
		return <li key={cartItem.isbn}>{cartItem.title}</li>
	});
}
 
export default CartItems;