
export const actionTypes = {
		FETCH_ORDERS_START: 'fetch_orders_start',
		FETCH_ORDERS_SUCESS: 'fetch_orders_sucess',
		FETCH_ORDERS_FAILED: 'fetch_orders_failed'
}

export const fetchOrdersStart = () => ({
type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSucess = (orders) => ({
type: actionTypes.FETCH_ORDERS_SUCESS,
payload: orders
});
