import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../App'


export default (props) => {
  const {state} = useContext(AppContext);
  return (
    <div className={`${props.className} topnav  navFixed`}>
      <div className="navInner">
        <div className="logoSection">eCommerce Suite {state.pageName} </div>
        <div className="navSection">
          <Link to="/"> Home </Link>
          <Link to="/myorders"> My Orders </Link>
          <Link to="/cart"> Cart </Link>
        </div>
      </div>
    </div>
  );
};
