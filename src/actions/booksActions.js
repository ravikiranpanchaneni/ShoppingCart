
export const actionTypes = {
		FETCH_BOOKS_START: 'fetch_books_start',
		FETCH_BOOKS_SUCESS: 'fetch_books_sucess',
		FETCH_BOOKS_FAILED: 'fetch_books_failed',
		ADD_TO_CART_START: "add_to_cart_start",
		ADD_TO_CART_SUCESS: "add_to_cart_sucess",
		ADD_TO_CART_FAILED: "add_to_cart_failed",
		REMOVE_FROM_CART_START: "remove_from_cart_start",
		REMOVE_FROM_CART_SUCESS: "remove_from_cart_sucess",
		REMOVE_FROM_CART_FAILED: "remove_from_cart_failed"
		

}

export const fetchBooksStart = () => ({
type: actionTypes.FETCH_BOOKS_START
});

export const fetchBooksSucess = (books) => ({
type: actionTypes.FETCH_BOOKS_SUCESS,
payload: books
});

export const fetchBooksFailed = () => ({
	type: actionTypes.FETCH_BOOKS_FAILED,
	payload: []
	});


export const addToCartStart = (isbn) => ({
type: actionTypes.ADD_TO_CART_START,
payload: isbn
});

export const addToCartSucess = (books) => ({
	type: actionTypes.ADD_TO_CART_SUCESS,
	payload: books
	});

export const addToCartFailed = (books) => ({
	type: actionTypes.ADD_TO_CART_FAILED,
	payload: books
	});

export const removeFromCartStart = (isbn) => ({
type: actionTypes.REMOVE_FROM_CART_START,
payload: isbn
});

export const removeFromCartSucess = (books) => ({
	type: actionTypes.REMOVE_FROM_CART_SUCESS,
	payload: books
	});

export const removeFromCartFailed = (books) => ({
	type: actionTypes.REMOVE_FROM_CART_FAILED,
	payload: books
	});