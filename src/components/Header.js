// Import Libraries for making a component
import React, {Component} from 'react';
import {Text, View, Image, ImageBackground, StyleSheet, StatusBar, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import { MyText } from '../components/common/index';
import GStyles from '../assets/styles/GeneralStyles';
import {Button} from '../components/common';
import {abortFiltering} from '../Actions';

// Make a component
class Header extends Component {
  toggle_filter = () => {
    this.props.filterModal();
  }

  render_filter = () => {
    const {leftContainer, filterStyle} = styles;
    if(this.props.showModal) {
      return(
        <TouchableWithoutFeedback
          onPress={this.toggle_filter}
        >
          <View style={leftContainer}>
            <Image style={filterStyle} source={require('../assets/images/icon/filter.png')} />
          </View>
        </TouchableWithoutFeedback>
      );
    }else{
      return(
        <TouchableWithoutFeedback 
            onPress={() => {this.props.navigation.navigate('Home')}}
        >
          <View style={{flex:1, color: '#FFF'}}>
            <Icon name="chevron-left" type="feather" color="#FFF" size={40} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  home_page = () => {
    console.log('homepage');
    if(this.props.filtering) {
      this.props.filters.price_range_id = [];
      this.props.filters.house_type_id = [];
      this.props.filters.location_id = [];
      this.props.filters.filteredHouses = [];
      this.props.filtered.price_ranges = [];
      this.props.filtered.house_types = [];
      this.props.filtered.locations = [];
      this.props.abortFiltering();
    }
    if(this.props.navigation.state.routeName == 'House') {
      console.log(this.props.navigation.state.routeName);
      this.props.navigation.navigate('Home');
    }
  }


  render() {
    const {textStyle, viewStyle, imageBgStyles, headerContainer, rightContainer, logoStyle} = styles;
    const { textH3Style, textH2Style, textNunitoBold, textWhite } = GStyles

    return (
      <View>
        
        <ImageBackground style={imageBgStyles} resizeMode="cover" source={require('../assets/images/header/header.png')}>
          <View style={headerContainer}>
            {this.render_filter()}

            <View style={rightContainer}>
              <View>
                <Image style={logoStyle} source={require('../assets/images/logo/logo.png')} />
              </View>
              <MyText style={[textWhite, textH2Style, textNunitoBold]}>Abuja Apartments</MyText>
            </View>
            <View style={{height: 38, width: 60, paddingTop: 0, marginTop: 0}}>
              <Button style={{marginTop: 0, paddingTop: 0}} onPress={this.home_page.bind(this)}>
                HOME
              </Button>
            </View>
          </View>

        </ImageBackground>
        {/* <View style={viewStyle}>
          <Image
            style={{width: 30, height: 50}}
            resizeMode="contain"
            source={require('../../assets/images/logo/logo.png')}
          />
          <Text style={textStyle}>{props.headerText}</Text>
        </View> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageBgStyles: {
    width: '100%', height: 95,
  },
  headerContainer: {
    display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10
  },
  leftContainer: {
    flex: 1
  },
  filterStyle: {
    width: 23, height: 21
  },
  rightContainer: {
    flex: 5,
    display: 'flex', flexDirection: 'row'
  },
  logoStyle: {
    width: 35, height: 37, marginRight: 10
  },
  viewStyle: {
    height: 60,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row',
  },

  textStyle: {
    fontSize: 20,
    color: '#00688B',
  },
});

// Make the component available to other part of the app

const mapStateToProps = state => {
  const {filtering, filters, filtered} = state;
  return {filtering, filters, filtered};
};

export default connect(mapStateToProps, {abortFiltering})(Header);
