import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
	AUTH_USER, 
	UNAUTH_USER,
	AUTH_ERROR,
	CREATE_POSTS,
	FETCH_POSTS
} from './types';
import authReducer from '../reducers/auth_reducer';

const ROOT_URL = 'http://localhost:3000';

var config = {
	headers: { authorization: localStorage.getItem('token') }
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
		
	export function signoutUser(){
	localStorage.removeItem('token');

	return {type: UNAUTH_USER};
}
	
export function signupUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({type: AUTH_USER});
          
          //update the token
          localStorage.setItem('token', response.data.token);
          browserHistory.push('/items');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}


export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
		};
	}

export function createPost(props) {
  return function(dispatch){
    axios.post(`${ROOT_URL}/newitem`, { props }, config )
    .then(request => {
        dispatch({
          type: CREATE_POSTS,
          payload: request
        });
      browserHistory.push('/items');
    });
  }
}

export function fetchPosts() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/items`, config)
		.then( (response) => {
			console.log("Response", response)
			dispatch({
				type: FETCH_POSTS,
				payload: response
			});
		});
	}
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