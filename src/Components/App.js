import React, {Component} from 'react';
import v4 from 'uuid/v4';
import Game from './Game';
class App extends Component {
  state = {gameId: v4()};
  resetGame = () => {
    this.setState({gameID: v4()});
  };
  render() {
    return (
      <Game
        key={this.state.gameID}
        randomNumberCount={6}
        initialSeconds={10}
        onPlayAgain={this.resetGame}
      />
    );
  }
}

export default App;
