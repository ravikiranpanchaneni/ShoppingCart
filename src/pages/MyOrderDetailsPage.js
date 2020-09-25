import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBooksStart, addToCartStart, removeFromCartStart } from '../actions/booksActions';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class OrderDetails extends Component{

	async  componentDidMount(){
		/**
		 * getting the data from local file because of the api is not working otherwise the api call in booksApi.js file will get the books dynamically 
		 * storing it in local storage because of the apis are not available. i will maintain the books in local storage and maintain them using sagas
		 */
		if(localStorage.getItem('books') === null){
			const response = await axios("http://localhost:3000/books.json");
		    localStorage.setItem('books', JSON.stringify(response.data));
		}
		this.props.fetchBooksStart();
	}
	goToCart(book){
		this.props.addToCartStart(book.isbn);
		this.props.history.push('/cart')
	}
	
	addToCart(book){
		this.props.addToCartStart(book.isbn);
	}
	
	removeFromCart(book){
		this.props.removeFromCartStart(book.isbn);
	}
	
	showAddToCartOrRemoveFromCart(book){
		let returnContent = "";
		if(book.addToCart){
			returnContent = <button onClick={()=>{this.removeFromCart(book)}}>Remvoe from Cart </button>
		}else{
			returnContent = <button onClick={()=>{this.addToCart(book)}}>Add to Cart </button>
		}
		return returnContent;
	}
	renderOrderDetails(){
		const book = this.props.books.filter(book => book.isbn ===  this.props.match.params.bookid)[0]
		return  ( book ? <div>
		
		{ book.thumbnailUrl ? <img src={book.thumbnailUrl} alt={book.thumbnailUrl} /> : null }
		{ book.price ? <label> BookPrice {book.price}</label> : null}
		<br/>
		{ book.authors ? <label> Author Name {this.getAuthorName(book.authors)}</label> : null }
		<br/>
		{ book.pageCount ? <label>  Page Count: {book.pageCount}</label> : null}
		<br/>
		{ book.isbn ? <label> ISBN: {book.isbn}</label> : null}
		<br/>
		{this.showAddToCartOrRemoveFromCart(book)}
		
		<button onClick={()=>{this.goToCart(book)}}>Buy Now </button>
		
		<br/>
		{  book.longDescription ? <label> {book.longDescription}</label> : null}
		</div> : null);
	}
	
	getAuthorName(authors){
		let authorNames = ""
		for (let entry of authors) {
			authorNames = authorNames + entry +", ";
			}
		return authorNames;
	}

	render(){
		return(
		<div>
		<Helmet>
		<title>My Orders Details Page</title>
		<meta property="og:title" content="My Orders Details Page"  />
		<meta property="og:description" content="All my orders details" />
		</Helmet>
		here is the big list of orderDetails: 
		<ul>{this.renderOrderDetails()} </ul>
		</div>
		);
	}
}

function mapStateToProps(state){
	return ({books: state.books.books});
}
//
//function loadData(store){
// return //store.dispatch(fetchOrderDetails()); 
//}

export default {
	component: connect(mapStateToProps, { fetchBooksStart, addToCartStart, removeFromCartStart }) (OrderDetails)
}