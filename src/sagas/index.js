import booksSagas from './booksSagas';
import cartSagas from './cartSagas';
import orderSagas from './orderSagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
	yield all([
		...booksSagas,
		...cartSagas,
		...orderSagas
	])
}

