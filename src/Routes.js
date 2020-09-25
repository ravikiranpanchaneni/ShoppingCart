import App from './App';
import HomePage from './pages/HomePage';
import MyOrdersPage from './pages/MyOrdersPage';
import CartPage from './pages/MyCartPage';
import MyOrderDetailsPage from './pages/MyOrderDetailsPage';

export default [
	{
		...App,
		routes: [
			{
				...HomePage,
				path: '/',
				exact: true
			},
			{
				...MyOrdersPage,
				path: '/myorders',
			},
			{
				...CartPage,
				path: '/cart',
			},
			{
				...MyOrderDetailsPage,
				path: '/orderdetails/:bookid',
			}
		]
	}
	
];