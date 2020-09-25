import {takeEvery, call, fork, put} from "redux-saga/effects";
import * as actions from "../actions/ordersActions";
import * as  api from '../api/ordersApi';

function* getOrders(){
	try{
		const result  = yield call(api.getOrders);
		yield put(actions.fetchOrdersSucess( result.data ))
	}catch(e){
		
	}
}

function* watchFetchOrdersStart(){
	yield takeEvery(actions.actionTypes.FETCH_ORDERS_START, getOrders);
} 

const ordersSagas = [
	fork(watchFetchOrdersStart)
]

export default ordersSagas;