import React, { Component } from "react";
import { AppContext } from '../App'
import { connect } from "react-redux";
import {
  fetchBooksStart,
  addToCartStart,
  removeFromCartStart,
} from "../actions/booksActions";
import { Helmet } from "react-helmet";
import axios from "axios";

import "../styles/orderDetails.scss";

class OrderDetails extends Component {
  static contextType = AppContext;

  async componentDidMount() {
    /**
     * getting the data from local file because of the api is not working otherwise the api call in booksApi.js file will get the books dynamically
     * storing it in local storage because of the apis are not available. i will maintain the books in local storage and maintain them using sagas
     */
    if (localStorage.getItem("books") === null) {
      const response = await axios("http://localhost:3000/books.json");
      localStorage.setItem("books", JSON.stringify(response.data));
    }
    this.props.fetchBooksStart();
    const book = this.props.books.filter(
      (book) => book.isbn === this.props.match.params.bookid
    )[0];
    this.context.dispatch({ type: 'UPDATE_PAGE_NAME', data: book? "| "+book.title : ""});

  }
  goToCart(book) {
    this.props.addToCartStart(book.isbn);
    this.props.history.push("/cart");
  }

  addToCart(book) {
    this.props.addToCartStart(book.isbn);
  }

  removeFromCart(book) {
    this.props.removeFromCartStart(book.isbn);
  }

  showAddToCartOrRemoveFromCart(book) {
    let returnContent = "";
    if (book.addToCart) {
      returnContent = (
        <button
          onClick={() => {
            this.removeFromCart(book);
          }}
        >
          Remvoe from Cart{" "}
        </button>
      );
    } else {
      returnContent = (
        <button
          onClick={() => {
            this.addToCart(book);
          }}
        >
          Add to Cart{" "}
        </button>
      );
    }
    return returnContent;
  }
  renderOrderDetails() {
    const book = this.props.books.filter(
      (book) => book.isbn === this.props.match.params.bookid
    )[0];
    return book ? (
      <div className="detailsInner">
        <div className={`detailsImage ${book.thumbnailUrl ? "hasImage" : ""}`}>
          {book.thumbnailUrl ? (
            <img src={book.thumbnailUrl} alt={book.thumbnailUrl} />
          ) : null}
        </div>
        <div className="details">
          {book.title && (
            <div>
              <h2>{book.title}</h2>
            </div>
          )}
          {book.price > 0 && (<div>
            <b>Book Price</b>
          <span>${book.price}</span>
          </div>)}

          {book.authors && (<div>
            <b>Author Name</b>
            <span>{this.getAuthorName(book.authors)}</span>
          </div>)}

          {book.pageCount > 0 && (<div>
            <b>Page Count</b>
            <span>{book.pageCount}</span>
          </div>)}
        
          {book.isbn && (<div>
            <b>ISBN</b>
            <span>{book.isbn}</span>
          </div>)}

          <div className="cartBtns">
            <div>{this.showAddToCartOrRemoveFromCart(book)}</div>
            <div>
              <button
                onClick={() => {
                  this.goToCart(book);
                }}
              >
                Buy Now{" "}
              </button>
            </div>
          </div>

          {book.longDescription && (<div className="description">
            {book.longDescription}
          </div>)}
          
        </div>
      </div>
    ) : null;
  }

  getAuthorName(authors) {
    let authorNames = authors.join(", ")
    return authorNames;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>My Orders Details Page</title>
          <meta property="og:title" content="My Orders Details Page" />
          <meta property="og:description" content="All my orders details" />
        </Helmet>
        <div className="orderDetailsContainer">
          <ul>{this.renderOrderDetails()} </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.books };
}
//
//function loadData(store){
// return //store.dispatch(fetchOrderDetails());
//}

export default {
  component: connect(mapStateToProps, {
    fetchBooksStart,
    addToCartStart,
    removeFromCartStart,
  })(OrderDetails),
};
