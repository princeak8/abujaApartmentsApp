import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import HouseImage from './HouseImage';
import { MyText } from '../components/common/index';
import { Icon } from 'react-native-elements';
import GStyles from '../assets/styles/GeneralStyles';
import { checkXterLength } from '../helpers';

class HouseDetail extends Component {
  render() {
    //console.log('house', this.props.house);
    const {title, id, location, price, photo_url, status} = this.props.house;
    const { textH3Style, textBrandColor, textBold, imgStyle, flexRow, textWhite, textH4Style, textCenter, textNunito } = GStyles
   
    const {
      photoStyle, bedContainer, showerStyle, bedStyle, lowerContainer, statusContainer,
      locationStyle,
      priceStyle,
      textStyle,
      containerStyle,
    } = styles;

    return (
      <View style={containerStyle}>
        <View style={priceStyle}>
          <View>
            <MyText style={[textH4Style, textBold, textWhite]}>N {price}</MyText>
          </View>
        </View>

        <View style={locationStyle}>
          <Icon name="map-marker" type="font-awesome" color="#065E99" size={16} />
          <MyText style={[textBrandColor, textH3Style, textBold, {marginLeft: 5}]}>{location}</MyText>
        </View>

        <TouchableWithoutFeedback 
            onPress={() => {this.props.navigation.navigate('House', {
               house: this.props.house
             })
            }}
        >
          <View style={photoStyle}>
            <Image source={{uri:photo_url }} style={imgStyle} resizeMode="cover" />
          </View>
        </TouchableWithoutFeedback>

        <View style={bedContainer}>
          <View style={[flexRow, bedStyle]}>
            <MyText style={[textBold, textBrandColor, textH3Style, { marginRight: 10 }]}>3</MyText>
            <Icon name="bed" type="font-awesome" color="#065E99" size={14}  />
          </View>
          <View style={[flexRow, showerStyle]}>
            <MyText style={[textBold, textBrandColor, textH3Style,  { marginRight: 10 }]}>3</MyText>
            <Icon name="shower" type="font-awesome" color="#065E99" size={14}  />
          </View>
        </View>
        <View style={lowerContainer}>
          <MyText style={[textWhite, textH4Style, textWhite, textCenter, textNunito]}>
            {checkXterLength(title)}
          </MyText>

          <View style={statusContainer}>
            <MyText style={[textBrandColor, textH4Style, textBold]}>{status}</MyText>
          </View>
        </View>
        {/* <View style={imageContainerStyle}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate('House', {
                house: this.props.house,
              });
            }}>
            <HouseImage imageUrl={photo_url} />
          </TouchableWithoutFeedback>
        </View> */}

        {/* <View style={{flexDirection: 'row', position: 'absolute', zIndex: 1, bottom: -12}}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate('House', {
                house: this.props.house,
              });
            }}>
            <View style={titleStyle}>
              <Text style={textStyle}>{title}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: '3%', backgroundColor: 'white',
    display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',
    // width: '45%',
    // height: 180,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
    // borderColor: '#50A6C2',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationStyle: {
    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 8
  },
  titleStyle: {
    marginLeft: 10
  },
  photoStyle: {
    width: '92%', height: 150, borderRadius: 10, overflow: 'hidden'
  },
  bedContainer: {
    display: 'flex', flexDirection: 'row', marginVertical: 8
  },
  showerStyle: {
    alignItems: 'center', flex: 1, justifyContent: 'center'
  },
  bedStyle: {
    alignItems: 'center', flex: 1, justifyContent: 'center'
  },
  
  priceStyle: {
    position: 'absolute', backgroundColor: '#065E99', borderRadius: 8, left: -8, top: 50,
    paddingHorizontal: 10, paddingVertical: 8, zIndex: 2
  },
  lowerContainer: {
    backgroundColor: '#0379C9', paddingHorizontal: 5, paddingVertical: 10, alignItems: 'center',
    borderBottomLeftRadius: 10, borderBottomRightRadius: 10, width: '100%'
  },
  statusContainer: {
    backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 3,
    borderBottomLeftRadius: 30, borderTopRightRadius: 30, flex: 1, marginTop: 15, width: '45%', display: 'flex',
    alignItems: 'center'
  }
  
  
});

export default HouseDetail;
