import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider, CheckBox, Icon } from 'react-native-elements';
import { locationCheck, locationNameCheck } from '../Actions';

class LocationCheckbox extends Component {

    is_checked(id) {
        if(this.props.filters.location_id.includes(id)) {
            return true;
        }else{
            return false;
        }
    }

    check(id, name) {
        console.log(name);
        this.props.locationCheck(id);
        this.props.locationNameCheck(name);
    }

    checked = () => {
        const { boxStyle, checkedStyle, locationStyle } = styles
        const { id, name } = this.props.location;
        const isChecked = this.is_checked(id);
        //console.log('checked', isChecked);
        if(isChecked) {
          return (
            <View style={locationStyle}>
                <TouchableOpacity style={[boxStyle, checkedStyle]} onPress={this.check.bind(this, id, name)}>
                <View>
                    <Icon name="md-checkmark" type="ionicon" size={15} color={'blue'} />
                </View>
                </TouchableOpacity>
                <Text>{name}</Text>
            </View>
          )
        } else {
          return (
            <View style={locationStyle}>
                <TouchableOpacity style={[boxStyle]} onPress={this.check.bind(this, id, name)}></TouchableOpacity>
                <Text>{name}</Text>
            </View>
          )
        }
    }

    render() {
        const { id, name } = this.props.location;
        const { boxStyle, checkedStyle } = styles;
        return (
            <View style={{display:'flex', flexWrap:'wrap',marginTop:5}}>
                <View>
                    {this.checked()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxStyle: {
        height: 20, width: 20, borderWidth: 2, borderColor: '#007aff', marginRight: 10, borderRadius: 2, display: 'flex',
        justifyContent: 'center', alignItems: 'center'
    },
    checkedStyle: {
        backgroundColor: '#007aff'
    },
    locationStyle: {
        flexDirection: 'row', marginLeft: 5, marginRight: 5, width: 150
    }
})

const mapStateToProps = state => {
    const { filters, filtered } = state;
    return { filters, filtered };
};

export default connect(mapStateToProps, { locationCheck, locationNameCheck })(LocationCheckbox);