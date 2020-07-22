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
			game: [{path: require('../img/cat2.png')}, {path: require('../img/cat3.png')}, {path: require('../img/cat4.png')}, {path: require('../img/cat5.png')}, {path: require('../img/cat6.png')}, {path: require('../img/cat7.png')}],
			hit: [],
			end: false,
			fator: 10000,
			heart: '',
			rd: [],
			random: []
		};

	click = (i) =>{
		const {game, fator, rd, random} = this.state;
		
		if(this.state.id === (i-fator) || (this.state.id-fator) === i){//caso tenha acertado
			
			let hit = this.state.hit;
			hit.push(this.state.id);
			hit.push(i);
			this.setState({hit});

			let n = i;
			let n1=0, n2=0;
			for(let k=0; k<random.length; k++){
				if(n1 === 0){
					let j = i;
					if(i >= fator){	j = i-fator;}
						if(random[k] === j){
							n1 = k;
						}
					
				}
				else{
					let j = i;
					if(i >= fator){	j = i-fator;}
					
					if(random[k] === j){
						n2 = k;
					}	
				}
				
			}
			
			
			if(i >= fator){
				this.btnM1[n1].style.background = '#555555';
				this.btnM1[n2].style.background = '#555555';
			}
			else{
				this.btnM1[n1].style.background = '#555555';
				this.btnM1[n2].style.background = '#555555';
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
			let v = (parseInt(i)-parseInt(fator));
			
			let img = <img src={game[v].path}/>;
			let id = i;
			this.setState({img, id});	
		}
		
	}

	randOrd = () => {
		  return (Math.round(Math.random())-0.5);
	}
	
	componentDidMount = () => {
		const {game} = this.state;
		let cont = [];
		let cont2 = [];
		let i=0
		
		while(i< game.length){
			let j = Math.floor(Math.random() * game.length + 0); //gera num aleatorio de 0 ate o tamanho do jogo
			if(cont.indexOf(j) < 0){
				cont.push(j);
				i++;
			}
		}
		this.setState({rd: cont});

		i = 0;
		while(i< game.length){
			let j = Math.floor(Math.random() * game.length + 0); //gera num aleatorio de 0 ate o tamanho do jogo
			if(cont2.indexOf(j) < 0){
				cont2.push(j);
				i++;
			}
		}
		
		
		
		let a = cont2;
		let random = cont;
		let size = game.length;

		for(let j=0; j<size; j++){
			a.push(random[j]);
		}
		random.sort(this.randOrd);
		this.setState({random: cont2});
		
	}
	
	criaRes = (i) => {
		let {id, hit, game, fator, rd} = this.state;


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

	coracao = () => {
		if(this.state.heart !== ''){
			this.setState({heart: ''});
		}
		else{
			this.setState({heart: <img className="coracoes" src={require('../img/coracoes.gif')}/>});
		}	
	}

	render(){
		let {heart, game, id, fator, hit, rd, random} = this.state;
		let show = [];
		let size = game.length;
		let arm = [];
		let j =0;
		for(let i=random[j]; j<random.length; j++){ 
			i = random[j];
			
			let n = random[j]+fator;
			
			if(arm.indexOf(i) < 0){
				show.push(
					<div className="col-4" key={j}>
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(i)} disabled={hit.indexOf(i) === 0 ? true : false}>
							{this.criaRes(i)}
						</button>
					</div>	
				);
			}else{
				show.push(
						<div className="col-4" key={j}>
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(n)} disabled={hit.indexOf(random[j]) === 0 ? true : false}>
							{this.criaRes(n)}
						</button>
						</div>
							
					);
			}
			arm.push(i)
			
		}
return(
				<div className="intro">
					<div className="i-2">

						{this.state.end === false ? <div className="modif-3"><div className="game row">
								{show}
						</div></div> : 
						<div className="end">
							<div className="neons col-12">
				         		<h1>Muito obrigado por ajudar o gatinho a encontrar seus amigos  <em className="heart" onClick={()=>this.coracao()}>♡</em></h1>
							</div>
							<img src={require('../img/hug.gif')}/>
							{heart}
						</div>}

					</div>
				</div>
				)
	}
}