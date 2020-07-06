/* eslint-disable no-unused-vars */
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  housesFetch, locationsFetch, houseTypesFetch, priceRangesFetch, searchChanged, filter,
} from '../Actions';
import HouseDetail from './HouseDetail';
import FilterModal from '../components/FilterModal';
import {Spinner, Section, Button} from '../components/common';

class Houses extends PureComponent {
  state = {
    loading: true,
    filtering: false,
    page: 1,
    loadingMore: false,
    stopLoadingMore: false,
  };
  componentDidMount() {
    this.props.housesFetch();
    this.props.locationsFetch();
    this.props.houseTypesFetch();
    this.props.priceRangesFetch();
    if (this.props.houses.totalNum > 0) {
      this.setState({loading: false});
    }
  }

  _handleLoadMore = () => {
    //console.log('loading more: ', this.state.page);
    if(this.state.page < this.props.houses.noPages) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true
        }),
        () => {
          console.log('loading more: ', this.state.page);
          this.props.housesFetch(this.state.page);
        }
      );
    }
  };

  _handleLoadMoreFilteredHouses = () => {
    //console.log('loading more: ', this.state.page);
    if(this.state.page < this.props.filters.noPages) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true
        }),
        () => {
          console.log('loading more: ', this.state.page);
          console.log('filters: ', this.props.filters);
          this.props.filter(this.props.filters, this.state.page);
        }
      );
    }
  };

  loading = () => {
    const { container, horizontal} = activityIndicatorStyles;
    return (
      <View style={[container, horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  toggle_filterModalState = () => {
    /*this.setState({
      page: 1,
      loadingMore: true
    });*/
    this.props.toggle_filterModalState();
  }

  renderItem = house => {
    return (
      <HouseDetail house={house.item} key={house.item.id} navigation={this.props.navigation} />
    );
  };

  status_title = (status) => {
    if(status != 'all') {
      return (
        <Text>{status}</Text>
      );
    }
  }

  location_title = (locations) => {
    if(Array.isArray(locations) && locations.length > 0) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: '300'}}>Location: </Text>
          {locations.map((loc) => {
            return (<Text key={loc.toString()}>{loc} | </Text>);
          })}
        </View>
      )
    }
  }

  houseType_title = (house_types) => {
    if(Array.isArray(house_types) && house_types.length > 0) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text>House Type:</Text>
          {house_types.map((house_type) => {
            return (<Text key={house_type.toString()}>{house_type} | </Text>);
          })}
        </View>
      )
    }
  }

  priceRange_title = (price_ranges) => {
    if(Array.isArray(price_ranges) && price_ranges.length > 0) {
      return( 
        <View style={{flexDirection: 'row'}}>
          <Text>Price Range:</Text>
          {price_ranges.map((price_range) => {
            return (<Text key={price_range.toString()}>{price_range} | </Text>);
          })}
        </View>
      )
    }
  }

  filtered_by= () => {
    var {price_ranges, house_types, locations} = this.props.filtered;
    var status = this.props.filters.status;
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text>Filtering By: </Text>
          {this.status_title(status)}
        </View>
        <View>
          <View>
            {this.location_title(locations)}
          </View>
          <View style={{flexDirection: 'row'}}> 
            {this.houseType_title(house_types)}
          </View>
          <View style={{flexDirection: 'row'}}> 
            {this.priceRange_title(price_ranges)}
          </View>
        </View>
      </View>
    );

  }

  render_filter_moadal = () => {
    return (
      <View>
        <FilterModal 
          filterModalState={this.props.filterModalState} 
          toggle_filterModalState={this.toggle_filterModalState}
        />
      </View>
    );
  }

  render_filtered_houses = () => {
    if(this.props.filters.filteredHouses) {
      return (
        <View>
          <View>
            {this.filtered_by()}

          </View>
          <FlatList
            numColumns={2}
            data={this.props.filters.filteredHouses}
            renderItem={this.renderItem}
            onEndReached={this._handleLoadMoreFilteredHouses}
            onEndReachedThreshold={0.5}
            initialNumToRender={this.props.houses.limit}
          />
        </View>
      );
    }else{
      <View>
        {this.loading()}
      </View>
    }
  }

  render_content = () => {
    //console.log(this.props.filterModalState);
    const {TopSectionStyle, TopLeftStyle, TopRightStyle, ButtonStyle} = styles;
    if(this.props.filtering) {
      return (
        <View>
          {this.render_filter_moadal()}
          
          {this.render_filtered_houses()}
        </View>
      );
    }else{
      if (this.props.houses.totalNum > 0) {
        return (
          <View style={{marginTop:0, paddingTop:0}}>
            {this.render_filter_moadal()}
            <View style={{marginBottom:50, paddingBottom:100}}>
              <FlatList
                numColumns={2}
                data={this.props.houses.loadedHouses}
                renderItem={this.renderItem}
                keyExtractor={house => `${house.id}`}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={this.props.houses.limit}
              />
            </View>
          </View>
        );
      } else {
        return <View>{this.loading()}</View>;
      }
    }
  };

  show_filters() {
    //Return this
  }
  render() {
    console.log('filtered houses: ', this.props.filters.filteredHouses);
    console.log('loaded houses: ', this.props.houses);
  // console.log('filters: ', this.props.filters);
    //console.log('filtered houses: ', this.props.filters.filteredHouses);
    const { container } = styles

    return <View style={container}>{this.render_content()}</View>;
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
  container: {
    // paddingHorizontal: 10
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  TopSectionStyle: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 0,
  },
  TopLeftStyle: {
    alignItems: 'flex-start',
    flex: 1,
  },
  TopRightStyle: {
    alignItems: 'flex-end',
    flex: 1,
  },
  ButtonStyle: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
});

const mapStateToProps = state => {
  const {houses, filters, filtering, filtered} = state;
  return {houses, filters, filtering, filtered};
};

export default connect(
  mapStateToProps,
  {housesFetch, locationsFetch, houseTypesFetch, priceRangesFetch, filter},
)(Houses);
