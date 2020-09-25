import axios from 'axios';
/**
 * we can use axios or any other api to store the data into database and get the appropriate data as of now i am using localStorage as apis are not available 
 */
let cartBooks: string = 'books';  //hard coded value because of no api present
let api: string = "http://localhost:3000/books.json"; // hard coded value api url 

export const checkOutCart = ({books, isbnIds}) =>{
	console.log("checkout books isbns api ", isbnIds);
	let checkOutBooks = JSON.parse(localStorage.getItem(cartBooks)).data;
	for (var index in checkOutBooks) {
		let isISBNPresent = isbnIds.includes(checkOutBooks[index].isbn);
		  if(isISBNPresent){
			  checkOutBooks[index].bought = true;
			  checkOutBooks[index].addToCart = false;
			  checkOutBooks[index].purchaseDate = new Date().toDateString();
		  }
		}
	localStorage.removeItem(cartBooks);
    localStorage.setItem(cartBooks, JSON.stringify({data: checkOutBooks}));
	return axios.get(api)
}