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
			rd: []
		};

	click = (i) =>{
		const {game, fator, rd} = this.state;
		if(this.state.id === (i-fator) || (this.state.id-fator) === i){//caso tenha acertado
			
			let hit = this.state.hit;
			hit.push(this.state.id);
			hit.push(i);
			this.setState({hit});

			let n = i;
			
			if(i >= fator){
				for(let j=0; j<rd.length; j++){
					if(rd[j] === (i-fator)){
						n = j;
					}
				}
				this.btnM1[i-fator].style.background = '#555555';
				this.btnM2[n].style.background = '#555555';


			}
			else{
				for(let j=0; j<rd.length; j++){
					if(rd[j] === i){
						n = j;
					}
				}
			
				this.btnM1[i].style.background = '#555555';
				this.btnM2[n].style.background = '#555555';
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
	
	componentDidMount = () => {
		const {fator, game} = this.state;
		let rd = [];
		let cont = [];
		let i=0
		
		while(i< game.length){
			let j = Math.floor(Math.random() * game.length + 0); //gera num aleatorio de 0 ate o fator
			//console.log(j);
			//console.log(cont.indexOf(j));
			if(cont.indexOf(j) < 0){
				cont.push(j);
				i++;
			}
		}
		this.setState({rd: cont});
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
		/*else if(hit.indexOf(rd[i]) === 0)
		{
			console.log('teste');
			let v = i-fator;
			console.log(v);
				return game[v].img;
		}*/
							
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
		let {heart, game, id, fator, hit, rd} = this.state;
		let show = [];
		let size = game.length;
		//console.log(hit);
		

		for(let i=0; i<size; i++){ 
			show.push(
					<div className="col-4" key={i}>
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(i)} disabled={hit.indexOf(i) === 0 ? true : false}>
							{this.criaRes(i)}
						</button>
					</div>	
				);
		}
		//Math.floor(Math.random() * 10 + 0)
		let rand = [];
		let i = rd[0];
		let j = 0;
		//console.log(this.state.rd);
		//console.log(this.state.game);
		//console.log('sai');
		for(let i=rd[j]; j<rd.length; j++){ 
			i = rd[j];
			let n = rd[j]+fator;
			show.push(
						<div className="col-4" key={j+fator}>
						<button ref={this.setRefbtnM2} className="bloc" onClick={()=>this.click(n)} disabled={hit.indexOf(rd[j]) === 0 ? true : false}>
							{this.criaRes(rd[j]+fator)}
						</button>
						</div>
							
					);
			
			//console.log(rd[j]);
		}
		
		/*for(let i=0; i<size; i++){ 
			show.push(
						<div className="col-4">
						<button ref={this.setRefbtnM2} className="bloc" onClick={()=>this.click(i+fator)} disabled={hit.indexOf(i) === 0 ? true : false}>
							{this.criaRes(i+fator)}
						</button>
						</div>
							
					);
			
		}*/
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