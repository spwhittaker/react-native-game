import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Number extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  handlePress = () => {
    if (this.props.isDisabled) {
      return;
    }
    this.props.onPress(this.props.id);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text
          style={[
            styles.randomNumber,
            this.props.isDisabled && styles.disabled,
          ]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  randomNumber: {
    backgroundColor: '#999',
    width: 100,
    fontSize: 35,
    textAlign: 'center',
    marginHorizontal: 15,
    marginVertical: 25,
  },
  disabled: {opacity: 0.3},
});
