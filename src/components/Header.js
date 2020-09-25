import React from 'react';
import { Link } from 'react-router-dom';
 
export default () =>{
	return (
			<div className="topnav">
			<div>
			eCommerce Suite
			</div>
			<div>
			<Link to="/"> Home </Link> 
			<Link to="/myorders"> My Orders </Link> 
			<Link to="/cart"> Cart </Link> 

			</div>

			</div>		
	)
}