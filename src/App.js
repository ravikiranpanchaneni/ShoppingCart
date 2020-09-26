import React, { useReducer }  from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {

    pageName: '',

};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_PAGE_NAME':
            return {
                pageName: action.data
            };


        default:
            return initialState;
    }
}
const App = ({ route }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="appContainer">
			<AppContext.Provider value={{ state, dispatch }}>
			<Header className="navContainer" />
			
			<div className="routeContainer">
				{renderRoutes(route.routes)}
			</div>
			</AppContext.Provider>
		</div>);
}

export default {
	component: App
}