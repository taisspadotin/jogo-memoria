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
			game: [{path: require('../img/cat2.png')}, {path: require('../img/cat3.png')}, {path: require('../img/cat4.png')}],
			hit: [],
			end: false,
			fator: 10000
		};

	click = (i) =>{
		const {game, fator} = this.state;
		if(this.state.id === (i-fator) || (this.state.id-fator) === i){//caso tenha acertado
			
			let hit = this.state.hit;
			hit.push(this.state.id);
			hit.push(i);
			this.setState({hit});


			//alterando os que ja foram acertados
			if(i >= fator){
				this.btnM1[i-fator].style.background = '#555555';
				this.btnM2[i-fator].style.background = '#555555';
			}
			else{
				this.btnM1[i].style.background = '#555555';
				this.btnM2[i].style.background = '#555555';
			}

			if(hit.length === (game.length*2)){ //A PESSOA ACERTOU TODAS
				this.setState({end: true});
			}
		
		}
		
		if(i<this.state.game.length){
			
			let img = <img src={game[i].path}/>;
			let id = i;
			this.setState({img, id});
		}
		else{
			let v = (i-fator);
			let img = <img src={game[v].path}/>;
			let id = i;
			this.setState({img, id});	
		}
		
	}
	
	componentDidMount = () =>{
		
	}
	
	criaRes = (i) => {
		let {id, hit, game, fator} = this.state;

		if(id === i)
		{
			return this.state.img;
		}
		else if(hit.indexOf(i) === 0)
		{
			if(i >= fator){
				let v = i-fator;
				return game[v].img;
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
		let fator = this.state.fator;
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
						{this.state.end === false ? <div className="game">
								{show}
						</div> : 
						<div className="end">
						{/*<h3>Muito obrigado por ajudar o gatinho a encontrar seus amigos</h3>*/}
						<div class="neons col-12">
				         <h1><em>Muito obrigado por ajudar o gatinho a encontrar seus amigos</em></h1>
				      </div>
						<img src={require('../img/f4.gif')}/>
						</div>}
					</div>
				</div>
				)
	}
}