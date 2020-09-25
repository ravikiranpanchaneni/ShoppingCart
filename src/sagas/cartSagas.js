import { takeEvery, call, fork, put } from "redux-saga/effects";
import * as actions from "../actions/cartActions";
import * as  api from '../api/cartApi';

function* checkOutCart(action){
	try{
		yield call(api.checkOutCart, action.payload);
		yield put(actions.checkoutCartSucess(action.payload))
	}catch(e){
		
	}
}

function* watchCheckoutCartStart(){
	yield takeEvery(actions.actionTypes.CHECKOUT_CART_START, checkOutCart);
} 


const cartSagas = [
	fork(watchCheckoutCartStart)
]

export default cartSagas;