import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import RandomNumber from './RandomNumber';
export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {selectedNumbers: [0, 4]};
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(Math.random() * 10),
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  // TODO: Shuffle random numbers

  isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randNum, index) => (
            <RandomNumber
              key={index}
              number={randNum}
              styles={styles.random}
              isSelected={this.isNumberSelected(index)}
            />
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {backgroundColor: '#ddd', flex: 1, paddingTop: 30},
  target: {
    fontFamily: 'monospace',
    margin: 10,
    color: 'purple',
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
});
