import axios from 'axios';

export const CREATE_POSTS = 'CREATE_POSTS';

const ROOT_URL = 'http://rest.learncode.academy/api/paul';

export function createPost(props) {
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return {
		type: CREATE_POSTS,
		payload: request
	};
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