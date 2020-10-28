import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, StatusBar } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';
import { MyText, Spinner } from '../components/common/index';
import {
    housesFetch, locationsFetch, houseTypesFetch, priceRangesFetch, searchChanged, filter,
  } from '../Actions';
import { connect } from 'react-redux';

class Splash extends Component {
    static navigationOptions = {
        headerShown: false,
    };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { houseTypesFetch, housesFetch, locationsFetch, priceRangesFetch } = this.props
    housesFetch();
    locationsFetch();
    houseTypesFetch();
    priceRangesFetch();
    setTimeout(() => {
        this.linkToHouses()
    }, 3000);
  }

  linkToHouses = () => {
      this.props.navigation.navigate('Home')
  }

  render() {
    const { imgStyle, textH4Style, textH3Style, textNunitoBold, textWhite } = GStyles
    const { containerImg, imgContainer } = styles
    return (
      <View>
        <StatusBar backgroundColor="#0379C9" />
        <ImageBackground source={require('../assets/images/splash.png')} style={containerImg} resizeMode="cover">
            <View style={imgContainer}>
                <Image source={require('../assets/images/logo/logo.png')} style={imgStyle} resizeMode="contain" />
            </View>
            <MyText style={[textH3Style, textNunitoBold, textWhite, { marginBottom: 20}]}>Let’s find  that house together</MyText>
            <Spinner />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    containerImg: {
        height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'
    },
    imgContainer: {
        width: 50, height: 70, marginBottom: 30
    }
});

export default connect(null, {housesFetch, locationsFetch, houseTypesFetch, priceRangesFetch, filter} )(Splash);
