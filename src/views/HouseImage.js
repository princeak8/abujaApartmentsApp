import React from 'react';
import {View, Text, Image} from 'react-native';
//import {CachedImage} from 'react-native-img-cache';

const HouseImage = ({imageUrl}) => {
  const {imageStyle} = styles;

  return (
    <Image style={imageStyle} resizeMode="contain" source={{uri: imageUrl}} />
  );
};

const styles = {
  imageStyle: {
    flex: 1,
    width: null,
    height: 250,
  },
};

export default HouseImage;
