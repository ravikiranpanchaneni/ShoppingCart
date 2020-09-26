import { actionTypes } from '../actions/booksActions';

const INITIAL_STATE = {
		books: [],
};

export default (state=INITIAL_STATE, action) =>{
	switch(action.type){
	case actionTypes.FETCH_BOOKS_SUCESS: 
		
			return {
		...state,
		books: action.payload
		}
	case actionTypes.ADD_TO_CART_SUCESS: 
		const addCartbooks = [...state.books]
		for (var addIndex in addCartbooks) {
			  if(addCartbooks[addIndex].isbn === action.payload){
				  addCartbooks[addIndex].addToCart = true;
				  break;
			  }
			}
		return {
			...state,
			books: addCartbooks
		}
	case actionTypes.REMOVE_FROM_CART_SUCESS: 
		const removeCartBooks = [...state.books]
		for (var removeIndex in removeCartBooks) {
			  if(removeCartBooks[removeIndex].isbn === action.payload){
				  removeCartBooks[removeIndex].addToCart = false;
				  break;
			  }
			}
		return {
			...state,
			books: removeCartBooks
		}
	default: 
		return state;
	

	}
}