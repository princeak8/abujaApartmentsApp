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
import { realtorPortfolioFetch } from '../Actions';
import HouseDetail from './HouseDetail';


class RealtorPortfolio extends Component {
    static navigationOptions = ({ navigation }) => {
        const profile_name = navigation.getParam('profile_name', {});
        const name = navigation.getParam('name', {});
       return {
        headerShown: true,
        headerTitle: name+' Portfolio'
       }
    };

    componentDidMount() {
        this.props.realtorPortfolioFetch(this.props.navigation.state.params.profile_name);
        //console.log('navigation: ', this.props.navigation.state.params.name);
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
          <HouseDetail house={house.item} key={house.item.id} navigation={this.props.navigation} />
        );
      };

    render_content = () => {
        if(this.props.realtorHouses.length > 0) {
            return (
                <View>
                    <View>
                        <FlatList
                        numColumns={2}
                        data={this.props.realtorHouses}
                        renderItem={this.renderItem}
                        keyExtractor={house => `${house.id}`}
                         />
                    </View>
                </View>
            );
        }else{
            return <View>{this.loading()}</View>;
        }
    }

    render() {
        console.log('profile_name', 'Hello');
        console.log('realtor Houses: ', this.props.realtorHouses);
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
    const {realtorHouses} = state;
    return {realtorHouses};
  };
  
  export default connect(
    mapStateToProps,
    {realtorPortfolioFetch},
  )(RealtorPortfolio);