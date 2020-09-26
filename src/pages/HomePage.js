import React, { Component  } from "react";
import { AppContext } from '../App'
import { connect } from "react-redux";
import {
  fetchBooksStart,
  addToCartStart,
  removeFromCartStart,
} from "../actions/booksActions";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/homePage.scss";

class Home extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.showMoreBooks = this.showMoreBooks.bind(this);
  }

  state = {
    booksItemsCount: 5,
    incriment: 5,
  };

  showMoreBooks() {
    this.setState({
      booksItemsCount: this.state.booksItemsCount + this.state.incriment,
    });
  }

  async componentDidMount() {
    
    this.context.dispatch({ type: 'UPDATE_PAGE_NAME', data: ""});

    /**
     * getting the data from local file because of the api is not working otherwise the api call in booksApi.js file will get the books dynamically
     * storing it in local storage because of the apis are not available. i will maintain the books in local storage and maintain them using sagas
     */
    if (localStorage.getItem("books") === null) {
      const response = await axios("http://localhost:3000/books.json");
      localStorage.setItem("books", JSON.stringify(response.data));
    }
    this.props.fetchBooksStart();
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
          - Cart{" "}
        </button>
      );
    } else {
      returnContent = (
        <button
          onClick={() => {
            this.addToCart(book);
          }}
        >
          + Cart
        </button>
      );
    }
    return returnContent;
  }
  loadMoreBooks = () => {};
  renderBooks() {
    return this.props.books
      .filter((value, index) => index < this.state.booksItemsCount)
      .map((book) => {
        return (
          <li key={book.isbn}>
            <div className="bookItem">
              <div className="bookImageLink">
                <Link to={`/orderdetails/${book.isbn}`}>
                  <img
                    src={
                      "https://res.cloudinary.com/ravikiranpanchaneni/image/fetch/c_fill,g_auto,dpr_2.0,f_auto/" +
                      book.thumbnailUrl
                    }
                    alt={book.thumbnailUrl}
                  />
                </Link>
              </div>
              <div className="bookInfo">
                <div className="bookTitle" title={book.title}>
                  {book.title}
                </div>
                <div className="bookDescription">{book.shortDescription}</div>
                <div className="bookAddToCartBtn">
                  {this.showAddToCartOrRemoveFromCart(book)}
                </div>
              </div>
            </div>
          </li>
        );
      });
  }

  render() {
    return (
      <div className="homePageContainer">
        <Helmet>
          <title>Books Home Page </title>
          <meta property="og:title" content="Books Home Page" />
          <meta property="og:description" content="All books page" />
        </Helmet>
        <div className="booksContainer">
          <ul>{this.renderBooks()} </ul>
        </div>
        {this.props.books.length > 0 && this.state.booksItemsCount <= this.props.books.length && (
          <div className="showMore">
            <div>Viewing {this.state.booksItemsCount} / {this.props.books.length} </div>
            <div onClick={this.showMoreBooks}>  Show More </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books.books };
}

function loadData(store) {
  return store.dispatch(fetchBooksStart());
}

export default {
  loadData: loadData,
  component: connect(mapStateToProps, {
    fetchBooksStart,
    addToCartStart,
    removeFromCartStart,
  })(Home),
};
