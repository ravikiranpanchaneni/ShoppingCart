import React from 'react';
 
function OrderItems(props) {
  return props.orderItems.map((orderedItem) => {
		 
return  ( orderedItem ? <div key={orderedItem.isbn}>
		
{orderedItem.purchaseDate ? <label> Book ordered date {orderedItem.purchaseDate}</label> : null}
<label> Status  {orderedItem.bought? 'Delivered' : 'Ordered'} </label>
{ orderedItem.thumbnailUrl ? <img src={orderedItem.thumbnailUrl} alt={orderedItem.thumbnailUrl} /> : null }
		
		<br/>
		{ orderedItem.title ? <label> Title {orderedItem.title}</label> : null }
		<br/>
		{ orderedItem.authors ? <label> Author Name {getAuthorName(orderedItem.authors)}</label> : null }
		<br/>
		{ orderedItem.price ? <label> BookPrice {orderedItem.price}</label> : null}
		</div> : null)
		
	});
}
 
	function getAuthorName(authors){
		let authorNames = ""
		for (let entry of authors) {
			authorNames = authorNames + entry +", ";
			}
		return authorNames;
	}
export default OrderItems;