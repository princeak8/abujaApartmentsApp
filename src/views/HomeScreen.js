import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Header from '../components/Header';
import Houses from './Houses';

class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    filterModalVisible: false,
  };

  setFilterModalVisible = () => {
    this.setState({filterModalVisible: !this.state.filterModalVisible});
  }

  render() {
    //console.log('navigate ', this.props.navigation);
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* <StatusBar backgroundColor="#0379C9" /> */}
        <Header 
          headerText="Abuja Apartments" 
          logo="1" 
          showModal={true} 
          filterModal={this.setFilterModalVisible} 
        />
        <Houses 
          navigation={this.props.navigation} 
          style={{elevation: 0}} 
          toggle_filterModalState={this.setFilterModalVisible}
          filterModalState={this.state.filterModalVisible} 
        />
      </View>
    );
  }
}

export default HomeScreen;
