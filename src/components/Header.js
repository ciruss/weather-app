import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from './Search';

class Header extends Component {
	render() {
		return (
			<header className='header'>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					{/* <Link to='/' title='HomePage' > */}
					<a className="navbar-brand" href="#">Weather App</a>
					{/* </Link> */}
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								<a className="nav-link" href="#">Favorites <span className="sr-only">(current)</span></a>
							</li>
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