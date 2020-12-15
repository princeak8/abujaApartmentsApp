import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class MyText extends Component {
  render() {
    const {textStyles} = styles;
    const {style} = this.props;
    return <Text style={[textStyles, style]}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  textStyles: {
    // fontFamily: 'Raleway-Regular',
    fontFamily: 'Nunito-Regular'
  },
});

export {MyText};
