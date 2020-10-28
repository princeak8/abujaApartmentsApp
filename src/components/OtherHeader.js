// Import Libraries for making a component
import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import { MyText } from './common/index';
import GStyles from '../assets/styles/GeneralStyles';
import {Button} from './common';
import {abortFiltering} from '../Actions';
import colors from '../colors';

// Make a component
class OtherHeader extends Component {
  toggle_filter = () => {
    this.props.filterModal();
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
 
  
  render() {
    const {textStyle, container, iconStyle, titleContainer } = styles;
    const { textH3Style, textH2Style, textWhite, flexRow, textBlue, textNunitoBold } = GStyles
    const { title } = this.props

    return (
      <View style={[container, flexRow]}>
          <TouchableOpacity style={iconStyle} onPress={this.goBack}>
            <Icon type="feather" name="chevron-left" color={colors.blue} size={35} style={{ marginLeft: -10}} />
          </TouchableOpacity>
          <View style={titleContainer}>
            <MyText style={[textH2Style, textBlue, textNunitoBold]}>{title}</MyText>
          </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%', paddingVertical: 22, paddingHorizontal: 20, alignItems: 'center',
    backgroundColor: colors.white
  },
  iconStyle: {
    flex: 1, alignItems: 'flex-start',
    // borderWidth: 1,
  },
  titleContainer: {
    flex: 9, alignItems: 'center', paddingRight: 20
  }
});

// Make the component available to other part of the app

const mapStateToProps = state => {
  const {filtering, filters, filtered} = state;
  return {filtering, filters, filtered};
};

export default connect(mapStateToProps, {abortFiltering})(OtherHeader);
