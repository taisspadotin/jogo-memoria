import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';

export default class Game extends Component{
	constructor(props){
		super(props);
		this.btnM1 = [];
		this.setRefbtnM1 = element =>{
			this.btnM1.push(element);
			
		}
		this.btnM2 = [];
		this.setRefbtnM2 = element =>{
			this.btnM2.push(element);
			
		}
	}
	state = {
			img: '',
			id: '', 
			game: [{path: require('../img/cat2.png'), op: 'a'}, {path: require('../img/cat3.png'), op: 'b'}],
			hit: []
		};

	click = (i) =>{
		const game = this.state.game;
		const fator = 10000;
		if(this.state.id === (i-fator) || (this.state.id-fator) === i){//caso tenha acertado
			
			let hit = this.state.hit;
			hit.push(this.state.id);
			hit.push(i);
			this.setState({hit});

			//alterando os que ja foram acertados
			if(i >= fator){
				this.btnM1[i-fator].style.background = '#555555';
				this.btnM2[i-fator].style.background = '#555555';
				/*this.btnM1[i-fator].style.display = 'none';
				this.btnM2[i-fator].style.display = 'none';	*/
			}
			else{
				this.btnM1[i].style.background = '#555555';
				this.btnM2[i].style.background = '#555555';
				/*this.btnM1[i].style.display = 'none';
				this.btnM2[i].style.display = 'none';*/
			}

			if(hit.length === (game.length*2)){ //A PESSOA ACERTOU TODAS
				alert('fim');
			}
		
		}
		
		if(i<this.state.game.length){
			
			let img = <img src={game[i].path}/>;
			let id = i;
			this.setState({img, id});
		}
		else{
			//const game = this.state.game;
			let v = (i-fator);
			//console.log(v);
			let img = <img src={game[v].path}/>;
			let id = i;
			this.setState({img, id});	
		}
		
	}
	
	componentDidMount = () =>{
		
	}
	
	criaRes = (i) => {
		let id = this.state.id;
		let hit = this.state.hit;
		const game = this.state.game;
		let fator = 10000;

		if(id === i)
		{
			return this.state.img;
		}
		else if(hit.indexOf(i) === 0)
		{
			if(i >= fator){
				return game[fator-i].img;
			}
			else{
				return game[i].img;
			}
		}
							
	}

	render(){
		const game = this.state.game;
		//console.log(game);
		let show = [];
		let id = this.state.id;
		let size = game.length;
		let fator = 10000;
		let hit = this.state.hit;
		//console.log(hit);

		for(let i=0; i<size; i++){ 
			show.push(
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(i)} disabled={hit.indexOf(i) === 0 ? true : false}>
							{this.criaRes(i)}
						</button>
						
				);
		}
		for(let i=0; i<size; i++){ 
			show.push(
					<button ref={this.setRefbtnM2} className="bloc" onClick={()=>this.click(i+fator)} disabled={hit.indexOf(i) === 0 ? true : false}>
						{this.criaRes(i+fator)}
					</button>
						
				);
		}
		//show.push(</div></div>);
		return(
				<div className="intro">
					<div className="i-2">
						<div className="game">
								{show}
						</div>	
					</div>
				</div>
				)
	}
}