import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/home';
import Game from './pages/game';

class Rotas extends Component{
	render(){
		return(
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/game" component={Game} />
				<Route path="*" component={() => <h1>Page not found</h1>} />
			</Switch>
		</BrowserRouter>
	)
	}
}
export default Rotas;