import React, { Component } from 'react';
import { 
    View, Text, StatusBar, StyleSheet, Dimensions, ActivityIndicator,
    FlatList, PanResponder,
    Animated,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import Header from '../components/Header';
import { MyText } from '../components/common/index';
import GStyles from '../assets/styles/GeneralStyles';
import { checkXterLength } from '../helpers';
import { similarHousesFetch } from '../Actions';
import HouseDetail from './HouseDetail';


class SimilarHouses extends Component {
    static navigationOptions = ({ navigation }) => {
        const {bedrooms, status} = navigation.getParam('house', {});
       return {
        headerShown: true,
        headerTitle: 'Similar Houses - '+bedrooms+'bedrooms for '+status
       }
    };

    componentDidMount() {
        //console.log(this.props.similarHouses);
        const {bedrooms, status} = this.props.navigation.state.params.house;
        this.props.similarHousesFetch(bedrooms, status);
    }

    loading = () => {
        const { container, horizontal} = activityIndicatorStyles;
        return (
          <View style={[container, horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      };

      renderItem = house => {
        return (
          <HouseDetail house={house.item} key={house.item.house_id} navigation={this.props.navigation} />
        );
      };

    render_content = () => {
        //console.log(this.props.similarHouses.houses.length);
        if(this.props.similarHouses.houses != null) {
            return (
                <View>
                    <View>
                        <FlatList
                        numColumns={2}
                        data={this.props.similarHouses.houses}
                        renderItem={this.renderItem}
                        keyExtractor={house => `${house.house_id}`}
                         />
                    </View>
                </View>
            );
        }else{
            return <View>{this.loading()}</View>;
        }
    }

    render() {
        console.log('similar Houses: ', this.props.similarHouses);
        return(
            <View style={{marginBottom: 20, flex: 1, minHeight: 300,}}>
                {this.render_content()}
            </View>
        );
    }

}
const activityIndicatorStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginTop: 200,
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    },
  });

const styles = StyleSheet.create({
    swipperContainer: {
        height: 320
    },
    activityContainer: {
        flex: 1,
        justifyContent: "center"
      },
    
});

const mapStateToProps = state => {
    const {similarHouses} = state;
    return {similarHouses};
  };
  
  export default connect(
    mapStateToProps,
    {similarHousesFetch},
  )(SimilarHouses);