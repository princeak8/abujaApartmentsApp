import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider, CheckBox, Icon } from 'react-native-elements';
import { houseTypeCheck, houseTypeNameCheck } from '../Actions';

class HouseTypeCheckbox extends Component {

    is_checked(id) {
        if(this.props.filters.house_type_id.includes(id)) {
            return true;
        }else{
            return false;
        }
    }

    check(id, type) {
       // console.log(id);
        this.props.houseTypeCheck(id);
        this.props.houseTypeNameCheck(type);
    }

    checked = () => {
        const { boxStyle, checkedStyle, houseTypeStyle } = styles
        const { id, type } = this.props.house_type;
        const isChecked = this.is_checked(id);
        //console.log('checked', isChecked);
        if(isChecked) {
          return (
            <View style={houseTypeStyle}>
                <TouchableOpacity style={[boxStyle, checkedStyle]} onPress={this.check.bind(this, id, type)}>
                <View>
                    <Icon name="md-checkmark" type="ionicon" size={15} color={'blue'} />
                </View>
                </TouchableOpacity>
                <Text>{type}</Text>
            </View>
          )
        } else {
          return (
            <View style={houseTypeStyle}>
                <TouchableOpacity style={[boxStyle]} onPress={this.check.bind(this, id, type)}></TouchableOpacity>
                <Text>{type}</Text>
            </View>
          )
        }
    }

    render() {

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
    houseTypeStyle: {
        flexDirection: 'row', marginLeft: 10, marginRight: 25, width: 100
    }
})

const mapStateToProps = state => {
    const { filters } = state;
    return { filters };
};

export default connect(mapStateToProps, { houseTypeCheck, houseTypeNameCheck })(HouseTypeCheckbox);