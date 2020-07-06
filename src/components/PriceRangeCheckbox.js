import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking , TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider, CheckBox , Icon} from 'react-native-elements'
import { priceRangeCheck, priceRangeNameCheck } from '../Actions';

class PriceRangeCheckbox extends Component {

    is_checked(id) {
        if(this.props.filters.price_range_id.includes(id)) {
            return true;
        }else{
            return false;
        }
    }

    check(id, name) {
        //console.log(id);
        this.props.priceRangeCheck(id);
        this.props.priceRangeNameCheck(name);
    }

    checked = () => {
        const { boxStyle, checkedStyle, priceRangeStyle } = styles
        const { price_range_id, display } = this.props.price_range;
        const isChecked = this.is_checked(price_range_id);
        //console.log('priceRangeId ', price_range_id);
        //console.log('checked', this.props.filters.price_range_id);
        if(isChecked) {
          return (
            <View style={priceRangeStyle}>
                <TouchableOpacity style={[boxStyle, checkedStyle]} onPress={this.check.bind(this, price_range_id, display)}>
                <View>
                    <Icon name="md-checkmark" type="ionicon" size={15} color={'blue'} />
                </View>
                </TouchableOpacity>
                <Text>{display}</Text>
            </View>
          )
        } else {
          return (
            <View style={priceRangeStyle}>
                <TouchableOpacity style={[boxStyle]} onPress={this.check.bind(this, price_range_id, display)}></TouchableOpacity>
                <Text>{display}</Text>
            </View>
          )
        }
    }

    render() {
        const { id, minimum, maximum, display } = this.props.price_range;

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
    priceRangeStyle: {
        flexDirection: 'row', marginLeft: 5, marginRight: 5, width: 250
    }
})

const mapStateToProps = state => {
    const { filters, filtered } = state;
    return { filters, filtered };
};

export default connect(mapStateToProps, { priceRangeCheck, priceRangeNameCheck })(PriceRangeCheckbox);