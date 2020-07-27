import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Menu from '../components/menu';
import soundHit from './hit.mp3';

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
		this.audioHit = new Audio(soundHit);
	}
	state = {
			img: '',
			id: '', 
			game: [{path: require('../img/cat2.png')}, {path: require('../img/cat3.png')}],
			hit: [],
			end: false,
			fator: 10000,
			rd: [],
			random: [],
			nivel: 1,
		};

	click = (i) =>{
		const {game, fator, rd, random, nivel} = this.state;
		
		if(this.state.id === (i-fator) || (this.state.id-fator) === i){//caso tenha acertado
			
			//SOM DE ACERTO
			const playedPromise = this.audioHit.play();
			if (playedPromise) {
		        playedPromise.catch((e) => {
		            if (e.name === 'NotAllowedError' ||
		                e.name === 'NotSupportedError') {
		                //console.log(e.name);
		            }
		        });
		    }
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
			
				//this.btnM1[n1].style.background = '#555555';
				//this.btnM1[n2].style.background = '#555555';
				//bloc-selected
				this.btnM1[n1].className = 'bloc-selected';
				this.btnM1[n2].className = 'bloc-selected';
				this.btnM1[n1].disabled = true;
				this.btnM1[n2].disabled = true;
					
			
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
		let {game} = this.state;
		let nivel = localStorage.getItem("nivel") === null ? 1 : localStorage.getItem("nivel");

		let cont = [];
		let cont2 = [];
		let i = 0;

		
		nivel = parseInt(nivel);
		if(nivel >= 2){
			game.push({path: require('../img/cat4.png')});
			game.push({path: require('../img/cat5.png')});
			this.setState({game});
		
		}
		if(nivel >= 3){
			game.push({path: require('../img/cat6.png')});
			game.push({path: require('../img/cat7.png')});
			this.setState({game});
		
		}
		if(nivel >= 4){
			game.push({path: require('../img/cat8.png')});
			game.push({path: require('../img/cat9.png')});
			this.setState({game});
		
		}
		if(nivel >= 5){
			game.push({path: require('../img/cat10.png')});
			game.push({path: require('../img/cat11.png')});
			this.setState({game});
		
		}
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
		this.setState({nivel})
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

	nextLevel = () => {
		let {nivel, game} = this.state;
		nivel = (parseInt(nivel) + 1);
		this.setState({nivel});

		localStorage.removeItem("nivel");		
		localStorage.setItem("nivel", nivel);

		this.setState({end: false});
		document.location.reload(true);

	}

	render(){
		let {game, id, fator, hit, rd, random, nivel} = this.state;
		let show = [];
		let size = game.length;
		let arm = [];
		let j =0;
		let col = game.length;
		let sz = nivel === 1 ? 1 : 3;
		if(size%4 === 0 || size%3 === 0){
			col = 4;
		}
		if(size >= 10){
			if(size%3 === 0){
				col = 6;
			}
			else if(size%5 === 0){
				col = 5;
			}	
			sz = 4;
		}
		

		for(let i=random[j]; j<random.length; j++){ 
			i = random[j];
			
			let n = random[j]+fator;
			
			if(arm.indexOf(i) < 0){
				show.push(
					<div className={"col-"+col} key={j}>
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(i)}>
							{this.criaRes(i)}
						</button>
					</div>	
				);
			}else{
				show.push(
						<div className={"col-"+col} key={j}>
						<button ref={this.setRefbtnM1} className="bloc" onClick={()=>this.click(n)}>
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
		

						{this.state.end === false ? <div className={"modif-"+sz}>
						<div className="game row">
								{show}
						</div></div> : 
						<div className="end">
							<div className="neons col-12">
								<h1>Nível {this.state.nivel} concluído com sucesso!</h1>
				         		<h2>Muito obrigado por ajudar o gatinho a encontrar seus amigos  <em className="heart">♡</em></h2>
							</div>
							<img src={require('../img/hug.gif')}/>
							<button className="btn" onClick={()=>this.nextLevel()}>Continuar</button>
							<br/><br/>
						</div>}

					</div>
					<Menu/>
				</div>
				)
	}
}