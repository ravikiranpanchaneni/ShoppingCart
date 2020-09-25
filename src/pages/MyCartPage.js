import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkoutCartStart } from '../actions/cartActions';
import { fetchBooksStart } from '../actions/booksActions';
import { Helmet } from 'react-helmet';
import CartItems from '../components/CartItems'
import PaymentInfo from '../components/PaymentInfo';
import axios from 'axios';

class Cart extends Component{
	
	constructor(props) {
	    super(props);
	    this.checkOut = this.checkOut.bind(this);
	    this.cancelCheckout = this.cancelCheckout.bind(this);
	  }
	
	async  componentDidMount(){
		/**
		 * getting the data from local file because of the api is not working otherwise the api call in booksApi.js file will get the books dynamically 
		 * storing it in local storage because of the apis are not available. i will maintain the books in local storage and maintain them using sagas
		 */
		if(localStorage.getItem('books')===null){
			const response = await axios("http://localhost:3000/books.json");
		    localStorage.setItem('books', JSON.stringify(response.data));
		}
		this.props.fetchBooksStart();
	}
	
	checkOut(total){
		if(total<=0){
			return;
		}
		let cartItems = this.props.books.filter(this.getCartItems);
		let len = cartItems.length;
		let isbnIds = [];
		for(let i=0; i< len; i++){
			isbnIds.push(cartItems[i].isbn);
		}
		//ugly code need to find a best way
		this.props.checkoutCartStart( this.props.books, isbnIds)
		//this.props.history.push('/myorders')
	}

	cancelCheckout(){
		this.props.history.push('/')
	}
	getCartItems(element, index, array){
		return element.addToCart===true;
	}
	
	renderCartItems(){
		
		let cartItems = this.props.books.filter(this.getCartItems);
		
		return (
			     <div>
				<ul> <CartItems cartItems={cartItems} > </CartItems> </ul>
				<PaymentInfo cartItems={cartItems}  checkOut={this.checkOut} cancelCheckout={this.cancelCheckout}> </PaymentInfo>
				</div>
				)
	}

	render(){
		
		//ugly code : need to find a new way
		if(this.props.checkedOut === true){
			this.props.history.push('/myorders')
		}
		//ugly code ends
		
		return(
		<div>
		<Helmet>
		<title>Cart Page </title>
		<meta property="og:title" content="Cart Page" />
		<meta property="og:description" content="All items in the cart" />
		</Helmet>
		here is the big list of cartItems: 
		{this.renderCartItems()} 
		</div>
		)
	}
}

function mapStateToProps(state){
	return ({books: state.books.books, checkedOut: state.cartItems.checkedOut});
}

//function loadData(store){
// return store.dispatch(checkoutCartStart()); 
//}

export default {
	component: connect(mapStateToProps, { checkoutCartStart, fetchBooksStart }) (Cart)
}