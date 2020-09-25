import {takeEvery, takeLatest, call, fork, put} from "redux-saga/effects";
import * as actions from "../actions/booksActions";
import * as  api from '../api/booksApi';

function* getBooks(){
	try{
		const result  = yield call(api.getBooks);
		yield put(actions.fetchBooksSucess( result.data ))
	}catch(e){
		
	}
}

function* watchFetchBooksStart(){
	yield takeEvery(actions.actionTypes.FETCH_BOOKS_START, getBooks);
} 

function* addToCart(action){
	try{
		 yield call(api.addToCart, action.payload);
		yield put(actions.addToCartSucess( action.payload));
		//yield call(getBooks);
	}catch(e){
		
	}
}

function* watchAddToCartStart(){
	yield takeLatest(actions.actionTypes.ADD_TO_CART_START, addToCart);
} 


function* removeFromCart(action){
	try{
		yield call(api.removeFromCart, action.payload);
		yield put(actions.removeFromCartSucess( action.payload));
		//yield call(getBooks);
	}catch(e){
		
	}
}

function* watchRemoveFromCartStart(){
	yield takeLatest(actions.actionTypes.REMOVE_FROM_CART_START, removeFromCart);
} 
const booksSagas = [
	fork(watchFetchBooksStart),
	fork(watchAddToCartStart),
	fork(watchRemoveFromCartStart)
]

export default booksSagas;