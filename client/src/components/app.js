import React, { Component } from 'react';
import Video from './video/video';
//import BandList from './containers/BandList';
import NavBarHeader from './Nav';
import Signin from './auth/signin';


	export default class App extends Component {
		render() {
			return (
				<div>
					<NavBarHeader />
					<Video />
					{this.props.children}
				</div>
			);
		}
	}

	