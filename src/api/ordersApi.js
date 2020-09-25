
export const getOrders = () =>{
	console.log("getting Orders  api");
	return JSON.parse(localStorage.getItem('books'));
}