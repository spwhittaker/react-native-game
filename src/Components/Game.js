import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber';
export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };
  state = {selectedIds: [], remainingSeconds: this.props.initialSeconds};
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(Math.random() * 10),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  // TODO: Shuffle random numbers

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        (prevState) => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = (numberIndex) =>
    this.setState((prevState) => {
      return {selectedIds: [...prevState.selectedIds, numberIndex]};
    });
  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce(
      (acc, curr) => acc + this.randomNumbers[curr],
      0,
    );
    if (this.state.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randNum, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randNum}
              styles={styles.random}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {backgroundColor: '#ddd', flex: 1, paddingTop: 30},
  target: {
    fontFamily: 'monospace',
    margin: 10,
    color: 'black',
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#ddd',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
