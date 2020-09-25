import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersStart } from '../actions/ordersActions';
import { updateCheckOut } from '../actions/cartActions';
import { fetchBooksStart } from '../actions/booksActions';
import { Helmet } from 'react-helmet';
import OrderItems from '../components/OrderItems'
import axios from 'axios';


class MyOrdersPage extends Component{
	
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
		this.props.updateCheckOut();
	}
	
	getOrderedItems(element, index, array){
		return element.bought===true;
	}
	renderMyOrders(){
		let orderItems = this.props.books.filter(this.getOrderedItems);
		return  (<ul><OrderItems orderItems={orderItems} > </OrderItems> </ul>)
	}

	render(){
		return(
		<div>
		<Helmet>
		<title>My Orders Page</title>
		<meta property="og:title" content="My Orders Page"  />
		<meta property="og:description" content="All my orders" />
		</Helmet>
		here is the big list of myOrders: 
		<ul>{this.renderMyOrders()} </ul>
		</div>
		)
	}
}

function mapStateToProps(state){
	return ({books: state.books.books});
}

//function loadData(store){
// return store.dispatch(fetchOrdersStart()); 
//}

export default {
	component: connect(mapStateToProps, { fetchOrdersStart, updateCheckOut, fetchBooksStart }) (MyOrdersPage)
}