import React,{Component} from 'react';
import './style.scss';
import {Icon, Popup, Confirm, Modal, Button} from 'semantic-ui-react';

export default class Menu extends Component{
	constructor(props){
		super(props);
		this.menu = [];
		this.setRefMenu = element =>{
			this.menu.push(element);
			
		}
	}
	state = {
		show: false,
		open: false,
		openInstructions: false 
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

	render(){
		let {show} = this.state;
		let content = [];
		if(show){
			content.push(
				<div ref={this.setRefMenu} className="main">
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