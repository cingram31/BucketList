import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
	AUTH_USER, 
	UNAUTH_USER,
	AUTH_ERROR
} from './types';
import authReducer from '../reducers/auth_reducer';

const ROOT_URL = 'http://localhost:3000';

export const CREATE_POSTS = 'CREATE_POSTS';



export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
}

export function signinUser({ email, password }){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
			.then(response => {
				dispatch({ type: AUTH_USER });
					console.log(response)

				localStorage.setItem('token', response.data.token);
				browserHistory.push('/newitem');
			})
				.catch(response => dispatch(authError("Bad login info")));
			
		}
	}
		
		
export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
		};
	}

export function signoutUser(){
	localStorage.removeItem('token');

	return {type: UNAUTH_USER};
}
	





//Action Constant Names
/*const SELECT_BAND = 'SELECT_BAND';

export function selectBand(band) {
	console.log("You have selected:", band.name);
	//selectBand is an ActionCreator, it needs to return an action
	//which is an object that must have a type property

	return {
		type: SELECT_BAND,
		payload: band
	};
}*/