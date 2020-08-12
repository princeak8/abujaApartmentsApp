/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, {Component} from 'react';
import {
    Text, View, TouchableOpacity, TouchableHighlight, Image, 
    StyleSheet, Modal, FlatList, ScrollView, SafeAreaView, TouchableWithoutFeedback
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import { statusCheck, triggerFiltering, filter } from '../Actions';
import ReduxThunk from 'redux-thunk';
import {Spinner, Section, Button} from '../components/common';
import GStyles from '../assets/styles/GeneralStyles';
import { ThemeProvider, CheckBox, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class RealtorDetailsModal extends Component {

// Toggle the Filter Modal
    toggle_modal = () => {
        this.props.toggle_realtorDetailsModalState();
    }

    View_portfolio = () => {
        this.props.toggle_realtorDetailsModalState();
        let name = this.props.realtor.firstname;
        if(this.props.realtor.lastname != null && this.props.realtor.lastname.length > 0) {
            name = name+' '+this.props.realtor.lastname;
        }
        this.props.navigation.navigate('Realtor', {profile_name: this.props.realtor.profile_name, name: name});
    }

  render() {
      console.log('realtor: ', this.props.realtor);
    const 
    { 
        ModalContainerStyle, ModalContentStyle, verifiedStyle, realtorImageStyle, TopContentStyle, 
        RealtorNameContainer, ViewPortfolioStyle
    } = styles;
    const { textH3Style, textBrandColor, textBold, imgStyle, flexRow, textWhite, textH4Style, textCenter, textNunito, textNunitoBold,
        textH5Style } = GStyles
    const {id, biz_name, firstname, lastname, profile_name, phones, profile_photo_url} = this.props.realtor;
    return (
        <View style={{marginTop: 0, marginLeft: '2%'}}>
            <Modal
            scrollVertical={true}
            animationType="slide"
            transparent={true}
            visible={this.props.realtorDetailsModalState}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}>
                <ScrollView>
                <View style={ModalContainerStyle}>
                    <LinearGradient colors={['rgba(3, 121, 201, 0.95)', 'rgba(6, 94, 153, 0.95)']} style={TopContentStyle}>
                        <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>

                            <View style={{marginLeft: 10}}>
                                <Text style={{color: '#FFF'}}>Realtor Details</Text>
                            </View>

                            <View style={{position: 'absolute', right: 0, marginRight: 20, marginTop: 5}}>
                                <View>
                                    <TouchableWithoutFeedback 
                                        style={{marginLeft: 100}}
                                        onPress={() => {this.toggle_modal();}}
                                    >
                                        <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 16}}>X</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>

                        <View style={ModalContentStyle}>
                            <View style={realtorImageStyle}>
                                <Image source={{uri:profile_photo_url }} style={imgStyle} resizeMode="cover" />
                            </View>
                            <View style={verifiedStyle}>
                                <Text style={{color: '#FFF', textAlign: 'center'}}>Verified</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={RealtorNameContainer}>
                        <Text style={{textAlign: 'center', fontWeight: '200', fontSize: 16}}>
                            {firstname}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', paddingLeft: '25%', paddingRight: '20%', marginTop: 50}}>
                        <Icon name='envelope' type='font-awesome' color='#517fa4' style={{marginRight: 5}}/>
                        <Text style={{textAlign: 'center'}}>akalodave@gmail.com</Text>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', paddingLeft: '25%', paddingRight: '20%', marginTop: 20}}>
                        <Icon name='phone' type='font-awesome' color='#517fa4' style={{marginRight: 5}}/>
                        {phones.map((phone) => {
                            return (<Text key={phone.phone.toString()}>{phone.phone} | </Text>);
                        })}
                    </View>

                    <LinearGradient colors={['rgba(3, 121, 201, 0.95)', 'rgba(6, 94, 153, 0.95)']} style={ViewPortfolioStyle}>
                        <TouchableWithoutFeedback onPress={() => {this.View_portfolio();}}>
                            <Text style={{color: '#FFF', textAlign: 'center'}}>View Portfolio</Text>
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                </View>
                </ScrollView>
            </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  ModalContainerStyle: {
    marginTop: 0, 
    marginLeft: '2%',
    paddingHorizontal: '1%',
    minHeight: 500,
    width: '95%',
    backgroundColor: '#FFF',
  },
  ModalContentStyle: {
      textAlign: 'center'
  },
  labelWrapStyle: {
    marginRight: 30
  },
  labelStyle: {
    marginRight: 30
  },
  TopContentStyle: {
    height: 230,
    borderRadius: 20,
  },
  realtorImageStyle: {
    width:100, height:100, justifyContent: 'center', backgroundColor: '#C4C4C4',
    marginLeft: 130, borderRadius: 114
  },
  verifiedStyle: {
    marginLeft: 130, width: 100, height: 25, backgroundColor: '#0BAE9B', 
    marginTop: 10, paddingTop: 3
  },
  RealtorNameContainer: {
    position: "absolute", top: 200, left: "10%", backgroundColor: "#FFF", 
    width: "80%", height: 100, borderRadius: 10, paddingTop: 5,
    shadowColor: "rgba(0, 0, 0, 0.25)", shadowOffset: {height:0,width:0}, shadowRadius: 20,
  },
  ViewPortfolioStyle: {
    width:140, height:40, marginLeft: '25%', marginTop: 20, paddingTop: 10
  }
});
export default RealtorDetailsModal;
