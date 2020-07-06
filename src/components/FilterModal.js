/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, {Component} from 'react';
import {
    Text, View, TouchableOpacity, TouchableHighlight, 
    StyleSheet, Modal, FlatList, ScrollView, SafeAreaView
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import { statusCheck, triggerFiltering, filter } from '../Actions';
import ReduxThunk from 'redux-thunk';
import {Spinner, Section, Button} from '../components/common';
import LocationCheckbox from '../components/LocationCheckbox';
import HouseTypeCheckbox from '../components/HouseTypeCheckbox';
import PriceRangeCheckbox from '../components/PriceRangeCheckbox';

import { ThemeProvider, CheckBox } from 'react-native-elements';

class FilterModal extends Component {
    constructor(props) {
        super(props);
        if(this.props.locations.length !== 0) {
            this.state = { 
                locationsLoading: false,
                locationVisible: false,
                houseTypeVisible: false,
                priceRangeVisible: false,
                showFilter: false
            };
        }else{
            this.state = { 
                locationVisible: false,
                houseTypeVisible: false,
                priceRangeVisible: false,
                showFilter: false
            };
        }
        this.toggleShowFilter();
    }

    is_checked() {
        return true;
    }
    check() {
        // console.log(id);
     }

    componentDidUpdate(prevProps) {
        this.toggleShowFilter();
        if (this.props.id !== prevProps.id) {
          this.setDefaultTranslation(this.props.context)
        }
    }

    filter() {
        this.toggle_filter();
        this.props.triggerFiltering();
        this.props.filter(this.props.filters);
    }

    //Shows the filter button when there is something to filter
    toggleShowFilter() {
        const { status, location_id, house_type_id, price_range_id} = this.props.filters;
        if(this.state.showFilter) {
            if(status == 'all' && (location_id===undefined || location_id.length==0) && (house_type_id===undefined || house_type_id.length==0) && (price_range_id===undefined || price_range_id.length==0)) {
                this.setState({ showFilter: false });
            }
        }else{
            if(status != 'all' || location_id > 0 || house_type_id > 0 || price_range_id > 0) {
                this.setState({ showFilter: true });
            }
        }
    }

    // Toggle the Filter Modal
    toggle_filter = () => {
      this.props.toggle_filterModalState();
      this.toggleShowFilter();
    }
  
    init_radioProp(radio_prop, status) {
        let init = '';
        radio_prop.forEach(function(label, key){ 
            if(status==label.value) {
            init = key;
            }
        })
        return init;
    }

    // Shows and hides the location on click
    toggleLocationVisible() {
        const visible = !this.state.locationVisible;
        this.setState({locationVisible: visible});
    }
    // Shows and hides the house_type on click
    toggleHouseTypeVisible() {
        const visible = !this.state.houseTypeVisible;
        this.setState({houseTypeVisible: visible});
    }
    // Shows and hides the price_range on click
    togglePriceRangeVisible() {
        const visible = !this.state.priceRangeVisible;
        this.setState({priceRangeVisible: visible});
    }

    //Assigned to a flatlist to render the location checkboxes
    renderLocation(location) {
        //console.log('check');
        return <LocationCheckbox location={location.item} />;
    }
    //Assigned to a flatlist to render the house_type checkboxes
    renderHouseType(house_type) {
        return <HouseTypeCheckbox house_type={house_type.item} />;
    }
    //Assigned to a flatlist to render the price_range checkboxes
    renderPriceRange(price_range) {
        return <PriceRangeCheckbox price_range={price_range.item} toggleCheckBox />;
    }

    renderLocationsCheckbox(){
        //this.state.locationVisible = true;
        //console.log('location visible: ', this.state.locationVisible);
        if(this.state.locationVisible) {
            //console.log('show');
            return(
                    <SafeAreaView style={{height:600, paddingTop: 10}}>
                        <FlatList
                            numColumns={2}
                            columnWrapperStyle={{marginBottom:20}}
                            data={this.props.locations}
                            renderItem={this.renderLocation}
                            keyExtractor={location => `key-${location.id}`}
                        />
                    </SafeAreaView>
            );
        }
    }
    renderHouseTypesCheckbox(){
        if(this.state.houseTypeVisible) {
            return(
                    <SafeAreaView style={{flexGrow:1, height:1000}}>
                        <FlatList
                            numColumns={2}
                            columnWrapperStyle={{marginBottom:20}}
                            data={this.props.house_types}
                            renderItem={this.renderHouseType}
                            keyExtractor={house_type => `key-${house_type.id}`}
                        />
                    </SafeAreaView>
            );
        }
    }
    renderPriceRangesCheckbox(){
        if(this.state.priceRangeVisible) {
            return(
                <SafeAreaView style={{flexGrow:1, height:1000, width:'100%'}}>
                    <FlatList
                        numColumns={1}
                        data={this.props.price_ranges}
                        renderItem={this.renderPriceRange}
                        keyExtractor={price_range => `key-${price_range.id}`}
                    />
                </SafeAreaView>
            );
        }
    }

    renderFilterButton() {
        if(this.state.showFilter) {
            return (
                <View style={{height:40, marginTop: 40}}>
                    <Button 
                        onPress={() => {this.filter()}}
                        style={{backgroundColor: 'skyblue'}}
                    >
                        FILTER
                    </Button>
                </View>
            );
        }
    }

  render() {
    //console.log(this.props.filters);
    //console.log('filtered: ', this.props.filtered);
    const { visible, toggleFilterModal } = this.props;
    const 
    { 
        ModalContainerStyle, ModalContentStyle, labelWrapStyle, labelStyle, toggleButtonsStyle
    } = styles;

    var radio_props = [
        {label: 'All', value: 'all' },
        {label: 'Rent', value: 'rent' },
        {label: 'Sale', value: 'sale' }
    ];
    //console.log('status: ', this.props.filters);
    const init_radio_prop = this.init_radioProp(radio_props, this.props.filters.status);
    return (
        <View style={{marginTop: 52, marginLeft: '2%'}}>
            <Modal
            scrollVertical={true}
            animationType="slide"
            transparent={true}
            visible={this.props.filterModalState}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}>
                <ScrollView>
                <View style={ModalContainerStyle}>
                    <View style={{alignItems: 'flex-end'}}>
                        <View style={{height: 40, width: '25%'}}>
                            <Button 
                                onPress={() => {this.toggle_filter();}}
                            >
                                CLOSE
                            </Button>
                        </View>
                    </View>

                    <View style={ModalContentStyle}>
                        <Text style={{textAlign: 'center'}}>FILTERS</Text>
                        
                        <View style={{marginTop: 20, paddingHorizontal: '2%'}}>
                            <View style={{width: '100%'}}>
                                <RadioForm
                                    radio_props={radio_props}
                                    initial={init_radio_prop}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    labelWrapStyle={labelWrapStyle}
                                    labelStyle={labelStyle}
                                    onPress={(value)=> {this.props.statusCheck(value)}}
                                />
                            </View>
                        </View>

                        <View>
                        <View>
                            <View style={toggleButtonsStyle}>
                                <Button onPress={this.toggleLocationVisible.bind(this)}>
                                    LOCATIONS
                                </Button>
                            </View>
                            {this.renderLocationsCheckbox()}
                        </View>

                        <View>
                            <View style={toggleButtonsStyle}>
                                <Button onPress={this.toggleHouseTypeVisible.bind(this)}>
                                    HOUSE TYPES
                                </Button>
                            </View>
                                {this.renderHouseTypesCheckbox()}
                        </View>

                        <View>
                            <View style={toggleButtonsStyle}>
                                <Button onPress={this.togglePriceRangeVisible.bind(this)}>
                                    PRICE RANGES
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', flexWrap: 'wrap', alignItems: 'center'}}>
                            {this.renderPriceRangesCheckbox()}
                            </View>
                        </View>
                        </View>

                        {this.renderFilterButton()}
                    </View>
                </View>
                </ScrollView>
            </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  ModalContainerStyle: {
    marginTop: 100, 
    marginLeft: '5%',
    paddingHorizontal: '1%',
    minHeight: 500,
    width: '90%',
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
  toggleButtonsStyle: {
    height: 40,
    marginTop: 30
  }
});

const mapStateToProps = state => {
    const { locations, house_types, price_ranges, filters, filtered } = state;

    return { locations, house_types, price_ranges, filters, filtered };
};

export default connect(mapStateToProps, { statusCheck, triggerFiltering, filter })(FilterModal);
