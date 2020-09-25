import axios from 'axios';
/**
 * we can use axios or any other api to store the data into database and get the appropriate data as of now i am using localStorage as apis are not available 
 */
let books: string = 'books';  //hard coded value because of no api present
let api: string = "http://localhost:3000/books.json"; // hard coded value api url 

export const getBooks = () =>{
	console.log("books api called");
		return JSON.parse(localStorage.getItem(books));
}

export const addToCart = (isbn) =>{
	console.log("adding to cart api", isbn);
	let addCartbooks = JSON.parse(localStorage.getItem(books)).data;
	for (var index in addCartbooks) {
		  if(addCartbooks[index].isbn === isbn){
			  addCartbooks[index].addToCart = true;
			  break;
		  }
		}
	localStorage.removeItem(books);
    localStorage.setItem(books, JSON.stringify({data: addCartbooks}));
	return axios.get(api)
}

export const removeFromCart = (isbn) =>{
	console.log("removing from cart api", isbn);
	let addCartbooks = JSON.parse(localStorage.getItem(books)).data;
	for (var index in addCartbooks) {
		  if(addCartbooks[index].isbn === isbn){
			  addCartbooks[index].addToCart = false;
			  break;
		  }
		}
	localStorage.removeItem(books);
    localStorage.setItem(books, JSON.stringify({data: addCartbooks}));
	return axios.get(api)
}
