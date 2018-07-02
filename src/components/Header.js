import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';

class Header extends Component {
	render() {
		return (
			<header className='header'>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<Link to='/' title='HomePage' >
						<p className="navbar-brand">Weather App</p>
					</Link>
					<Link to='/favorites' title='Favorites' >
						<span className="navbar-text navbar-text__favorites">Favorites</span>
					</Link>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav mr-auto">
						</ul>
						<span className="navbar-text">
              Come get your weather, while it's still hot!!
						</span>
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;