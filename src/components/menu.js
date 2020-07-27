import React,{Component} from 'react';
import './style.scss';
import {Icon, Popup, Confirm, Modal, Button} from 'semantic-ui-react';
import sound from './sound.mp3';
import { saveMusic, saveSound, getMusic } from "../services/music";

export default class Menu extends Component{
	constructor(props){
		super(props);
		this.menu = [];
		this.setRefMenu = element =>{
			this.menu.push(element);
			
		}
		this.audio = new Audio(sound);
	}
	state = {
		show: false,
		open: false,
		openInstructions: false,
		music: true
	}

	showMenu = () => {
		const {show} = this.state;
		
		if(show){
			this.setState({show: false});	
		}
		else{
			this.setState({show: true});
		}
	}
	playSound = (audio) => {
		const playedPromise = audio.play();
		if (playedPromise) {
		        playedPromise.catch((e) => {
		            if (e.name === 'NotAllowedError' ||
		                e.name === 'NotSupportedError') {
		                //console.log(e.name);
		            }
		        });
		    }
	}
	pauseSound = (audio) => {
		const playedPromise = audio.pause();
	}

	newGame = () => {
		//confirme
		localStorage.removeItem("nivel");		
		localStorage.setItem("nivel", 1);
		document.location.reload(true);

	}
	
	open = () => this.setState({ open: true })
  	close = () => this.setState({ open: false })

  	openInstructions = () => this.setState({ openInstructions: true })
  	closeInstructions = () => this.setState({ openInstructions: false })

  	setMusic = () => {
  		const {music} = this.state;
  		if(music){
  			this.setState({ music: false });
  			saveMusic(false);
			this.pauseSound(this.audio);
  		}
  		else{
  			this.setState({ music: true });
  			saveMusic(true);
			this.playSound(this.audio);
  		}
  		
  	}
  	
  	componentDidMount = () => {
  		let music = getMusic();
  		//console.log(music);
		if(music === 'true'){this.playSound(this.audio);}
		
  	}

	render(){
		let {show, music} = this.state;
		let content = [];
		if(show){
			content.push(
				<div ref={this.setRefMenu} className="main" >
					<div className="header">
						<img src={require('../img/f2.gif')}/>
					</div>
					<button className="btn-main" onClick={()=>this.showMenu()}>
						<Icon name="play"/> Continuar
					</button>
					<button className="btn-main"  onClick={this.openInstructions}>
						<Icon name="info"/> Instruções
					</button>
					<button className="btn-main" onClick={this.open}>
						<Icon name="undo"/> Reiniciar
					</button>
					<div>
						<Icon className="op" name={music === true ? "volume off": "volume up"} onClick={()=>this.setMusic()} title={music === true ? "Desligar música": "Ligar música"}/>
					</div>

				</div>);
		}
		return(
				<>
				<div className="menu">
					<div className="item">
						<Popup content='Menu' position='top right' offset='0, 10px' trigger={<Icon onClick={()=>this.showMenu()} name={show === true ? "play circle": "pause circle"}/>}/>
					</div>
				</div>
				 
				 <Confirm open={this.state.open}
				 content='Deseja realmente voltar ao nível 1?'
         		 cancelButton='Cancelar'
          	     confirmButton="Sim"
				 onCancel={this.close} 
				 onConfirm={()=>this.newGame()}/>

				 <Modal onClose={this.closeInstructions}  open={this.state.openInstructions}>
				    <Modal.Header>Instruções</Modal.Header>
				    <Modal.Content>
				      <Modal.Description>
				        <p>
				          Basta clicar em uma das cartas e quando a mesma virar irá revelar o gatinho.<br/>
				          Assim que todos os pares dos gatinhos forem formados você poderá passar de nível.
				        </p>
				      <Button onClick={this.closeInstructions}>Entendi!</Button> 
				      </Modal.Description>
				    </Modal.Content>
				  </Modal>
				
				{content}
				</>
			)
	}
}