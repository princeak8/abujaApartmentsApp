import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text, 
    StatusBar,
    StyleSheet, 
    Dimensions,
    PanResponder,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import Header from '../components/Header';
import { MyText } from '../components/common/index';
import GStyles from '../assets/styles/GeneralStyles';
import { checkXterLength } from '../helpers';
import {Button} from '../components/common';
import RealtorDetailsModal from '../components/RealtorDetailsModal';
import { similarHousesFetch } from '../Actions';
import LinearGradient from 'react-native-linear-gradient';

class House extends Component {
    state = {
        realtorDetailsModalState: false
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('house'));
    }

    toggle_realtorDetailsModalState = () => {
        console.log('show realtor details');
        this.setState({realtorDetailsModalState: !this.state.realtorDetailsModalState});
    }

    static navigationOptions = ({ navigation }) => {
        const house = navigation.getParam('house', {});
        if(house.length==0) {
            houseTitle = 'House Page';
        }else{
            houseTitle = house.title;
        }
       return {
        headerShown: false,
       }
    };

    agentFee_ServiceCharge = () => {
        const {status, service_charge, agent_fee} = this.props.navigation.getParam('house');
        const {propertyTextStyle} = styles;
        if(status == 'rent') {
            return(
                <View>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <Text style={propertyTextStyle}>
                            Service Charge: 
                            <Text style={{fontStyle:'italic'}}> 
                                {(service_charge == null) ? 'Nil' : 'N'+service_charge}
                            </Text>
                        </Text>
                    </View>
                                        
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <Text style={propertyTextStyle}>
                            Agent Fee: 
                            <Text style={{fontStyle:'italic'}}> 
                                {(agent_fee == null) ? 'Nil' : 'N'+agent_fee}
                            </Text>
                        </Text>
                    </View>
                </View>
            );
        }
    }

    render_house_photos = () => {
        const { house_photos } = this.props.navigation.getParam('house');
        const { imageContainerStyle, imageStyle } = styles;
        return house_photos.map((item, index) => {
            return (
                <View style={imageContainerStyle} key={index}>
                    <Image source={{ uri: item }} style={imageStyle} resizeMode="cover" />
                </View>
            )
        })
    }

    render_realtor_details_moadal = () => {
        return (
          <View>
            <RealtorDetailsModal 
                navigation={this.props.navigation}
                realtorDetailsModalState={this.state.realtorDetailsModalState} 
                toggle_realtorDetailsModalState={this.toggle_realtorDetailsModalState}
                realtor={this.props.navigation.getParam('house').realtor}
            />
          </View>
        );
      }
//tyas TYSA
    go_to_similar_houses = () => {
        console.log('go ');
        const {status, bedrooms} = this.props.navigation.getParam('house');
        this.props.similarHousesFetch(bedrooms, status);
        console.log('similar Houses: ',this.props.similarHouses);
    }
    render_realtor_details_moada = () => {
        console.log('go ');
        const {status, bedrooms} = this.props.navigation.getParam('house');
        this.props.similarHousesFetch(bedrooms, status);
        console.log('similar Houses: ',this.props.similarHouses);
        this.props.navigation.navigate('SimilarHouses', { 
            navigation: this.props.navigation
        })
    }

    render_footer_buttons = () => {
        return (
            <View style={{height: 40, flexDirection: 'row', paddingTop: 0, marginTop: 0}}>           
                <TouchableWithoutFeedback style={{marginTop: 0, paddingTop: 0}} onPress={this.toggle_realtorDetailsModalState}>
                    <LinearGradient colors={['#0379C9', '#065E99']} style={{height:40,width:'40%', borderRadius: 10}}>
                        <Text style={{color: '#FFF', textAlign: 'center', marginTop: 10}}>Realtor Details</Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback style={{marginTop: 0, paddingTop: 0}} 
                    onPress={() => { 
                        this.props.navigation.navigate('SimilarHouses', { 
                            navigation: this.props.navigation,
                            house: this.props.navigation.getParam('house')
                        })
                    }}
                >
                    <LinearGradient colors={['#0379C9', '#065E99']} style={{height:40,width:'40%', borderRadius: 10}}>
                        <Text style={{color: '#FFF', textAlign: 'center', marginTop: 10}}>Similar Houses</Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        
        console.log('house', this.props.navigation.getParam('house'));
        const { 
            title, id, location, price, status, photo_url, house_photos, bedrooms,
            bathrooms, toilets, service_charge, agent_fee, description
        } = this.props.navigation.getParam('house');
        //console.log('house Photos: ', house_photos);
        if(bathrooms == null) {
            console.log('bathroom empty');
        }else{
            console.log('bathroom not empty ', bathrooms);
        }
        const { 
            titleStyle,locationStyle, priceStyle, statusStyle, swipperContainer,
            textStyle, containerStyle, housePropertyStyle, propertyTextStyle
        } = styles;
        const { 
            textH3Style, textBrandColor, textBold, imgStyle, flexRow, textWhite, 
            textH4Style, textCenter, textNunito 
        } = GStyles

        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                {this.render_realtor_details_moadal()}
                <StatusBar backgroundColor="#0379C9" />
                <Header navigation={this.props.navigation}  headerText="Abuja Apartments" logo="1" />
                <ScrollView>
                    <View style={containerStyle}>
                        
                        <View style={{flexDirection: 'row'}}>
                            <View style={statusStyle}>
                                <Text style={{backgroundColor: '#FFF', fontWeight: 'bold', fontSize: 16}}>
                                    {status}
                                </Text>
                            </View>
                            <View style={priceStyle}>
                                <Text style={{backgroundColor: '#FFF', fontWeight: 'bold', fontSize: 16}}>
                                    N{price}
                                </Text>
                            </View>
                        </View>

                        <Swiper style={swipperContainer} showsButtons={true} index={0}>
                                {this.render_house_photos()}
                        </Swiper>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={titleStyle}>
                                <Text style={[textStyle, {fontWeight: 'bold', fontSize: 18}]}>
                                    {title}
                                </Text>
                            </View>
                            
                            <View style={locationStyle}>
                                <Text style={[textStyle, {fontWeight: 'bold', fontSize: 18}]}>{location}</Text>
                            </View>
                        </View>

                        <View style={{backgroundColor: '#00688B', minHeight: 150}}>
                            <View style={housePropertyStyle}>
                                <View>
                                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                                        <Icon name="bed" type="font-awesome" color="#FFF" size={14}  />
                                        <Text style={propertyTextStyle}>Bedrooms: {bedrooms}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                                        <Icon name="shower" type="font-awesome" color="#FFF" size={14}  />
                                        <Text style={propertyTextStyle}>
                                            Bathrooms: 
                                            <Text style={{fontStyle:'italic', marginHorizontal: '20%'}}> 
                                                {(bathrooms == null) ? 'Info Not Available' : bathrooms}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                                        <Text style={propertyTextStyle}>
                                            Toilets:
                                            <Text style={{fontStyle:'italic'}}> 
                                                {(toilets == null) ? 'Info Not Available' : toilets}
                                            </Text>
                                        </Text>
                                    </View>

                                    {this.agentFee_ServiceCharge()}
                                </View>

                            </View>
                        </View>
                        {this.render_footer_buttons()}
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    swipperContainer: {
        height: 320
    },
  
    imageContainerStyle: {
        height: 300
    },
    imageStyle: {
        flex: 1, 
        width: null,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    titleStyle: {
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: 5
    },
    locationStyle: {
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 5
    },
    priceStyle: {
        alignItems: 'flex-end', 
        flex: 1,
        marginRight: 5
    },
    statusStyle: {
        alignItems: 'flex-start', 
        flex: 1,
        marginLeft: 5
    },
    textStyle: {
        textAlign: 'left'
    },
    containerStyle: {
        elevation: 1,
    },
    housePropertyStyle: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        marginTop: 20, 
        marginHorizontal: '5%',
    },
    propertyTextStyle: {
        fontSize: 14, 
        color: 'white',
        marginLeft: '2%'
    }
});

const mapStateToProps = state => {
    const {similarHouses} = state;
    return {similarHouses};
  };
  
  export default connect(
    mapStateToProps,
    {similarHousesFetch},
  )(House);  