import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default class Home extends Component{
	render(){
		return(
				<div className="intro">
					<div className="i-1">
						<h1>Ajude o gatinho a encontrar seus amigos</h1>
						<div className="image">
							<img src={require('../img/cat1.png')}/>
						</div>
						<br/><br/>
						<div className="center">
							<Link to='/game'>
								<button className="btn">Vamos lá</button>
							</Link>
						</div>
						<br/>
					</div>
				</div>
			)
	}
}