# Jogo da memória

### `Funcionamento do sistema`
O jogo funciona da seguinte forma, ao iniciar o jogo é passado um array de objetos contendo o caminho das imagens, isso determinará o tamanho do jogo, ou seja ele sempre terá o dobro do tamanho do array informado.
As posições das peças na tela são completamente aleatórias e definidas no momento em que a página é carregada.
O nível do usuário é salvo no local storage, e a cada nível que o usuário passa as quantidades de peças vão aumentando.
Cada vez que o usuário acerta uma combinação um som de gatinho miando é produzido.
A pessoa pode reiniciar o jogo atraves do menu, no menu a pessoa pode também pausar a música e os sons do jogo.
Atualmente o jogo conta com 7 níveis, porém para adicionar um novo nível basta apenas adicionar a imagem ao nível que deseja.

<img src="https://raw.githubusercontent.com/taisspadotin/jogo-memoria/master/images/i1.png"/>
<img src="https://raw.githubusercontent.com/taisspadotin/jogo-memoria/master/images/i2.png"/>


### `Utilizando o sistema`
```
npm install
npm start
```
