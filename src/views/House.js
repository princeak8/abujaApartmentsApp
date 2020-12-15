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
import OtherHeader from '../components/OtherHeader';
import { MyText } from '../components/common/index';
import GStyles from '../assets/styles/GeneralStyles';
import { checkXterLength } from '../helpers';
import {Button} from '../components/common';
import RealtorDetailsModal from '../components/RealtorDetailsModal';
import { similarHousesFetch } from '../Actions';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../colors'


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
        const { footerContainer, footerItemContainer } = styles
        const { textH4Style, textWhite, textH3Style, textCenter, textNunitoBold } = GStyles
        return (
            <View style={footerContainer}>           
                <TouchableWithoutFeedback onPress={this.toggle_realtorDetailsModalState}>
                    <LinearGradient colors={['#0379C9', '#065E99']} style={footerItemContainer}>
                        <Icon name="user" type="feather" color="white" size={20}  />
                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginTop: 5}]}>Realtor Details</MyText>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback
                    onPress={() => { 
                        this.props.navigation.navigate('SimilarHouses', { 
                            navigation: this.props.navigation,
                            house: this.props.navigation.getParam('house')
                        })
                    }}
                >
                    <LinearGradient colors={['#0379C9', '#065E99']} style={footerItemContainer}>
                        <Icon name="home" type="feather" color="white" size={20} />
                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginTop: 5}]}>Similar Houses</MyText>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        
        // console.log('house', this.props.navigation.getParam('house'));
        const { 
            title, id, location, price, status, photo_url, house_photos, bedrooms,
            bathrooms, toilets, service_charge, agent_fee, description, house_type
        } = this.props.navigation.getParam('house');
        //console.log('house Photos: ', house_photos);
        if(bathrooms == null) {
            console.log('bathroom empty');
        }else{
            console.log('bathroom not empty ', bathrooms);
        }
        const { 
            titleStyle,locationStyle, priceStyle, statusStyle, swipperContainer,
            textStyle, containerStyle, housePropertyStyle, propertyTextStyle, headerContainer, titleContainer, bodyContainer, textContainer,
            contentContainer, locationContainer, priceContainer, contentContainer2, detailHeaderStyle, detailContainerStyle, itemDetail, divider
        } = styles;
        const { 
            textH3Style, textBrandColor, textBold, imgStyle, flexRow, textWhite, textNunitoBold, textDarkBlue, textGreyColor,
            textH4Style, textCenter, textNunito 
        } = GStyles

        return(
            <View style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
                {this.render_realtor_details_moadal()}
                <StatusBar backgroundColor={colors.white} />
                <View style={headerContainer}>
                    <OtherHeader title="House Details" {...this.props} />
                </View>
                <ScrollView>
                    <View style={containerStyle}>
                        <View style={titleContainer}>
                            <MyText style={[textH4Style, textBold, textDarkBlue, textCenter]}>{title}</MyText>
                        </View>
                        <View style={bodyContainer}>
                            <View style={contentContainer}>
                                <View style={[flexRow, locationContainer]}>
                                    <Icon type="ionicon" name="ios-pin" size={20} style={{ marginRight: 10}} color={colors.darkBlue} />
                                    <MyText style={[textH4Style, textBold, textDarkBlue]}>{location}</MyText>
                                </View>
                                <Swiper style={swipperContainer} showsButtons={true} index={0}>
                                    {this.render_house_photos()}
                                </Swiper>
                                <LinearGradient colors={['#0379C9', '#065E99']} style={[flexRow, priceContainer]}>
                                    <View style={[priceStyle]}>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}>
                                            ₦ {price}
                                        </MyText>
                                    </View>
                                    <View style={statusStyle}>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}>
                                            {status}
                                        </MyText>
                                    </View>
                                </LinearGradient>
                                
                            </View>

                            <View style={contentContainer2}>
                                <View style={detailHeaderStyle}>
                                    <MyText style={[textH3Style, textNunitoBold, textCenter, textGreyColor]}>House Details</MyText>
                                </View>
                                <View style={detailContainerStyle}>
                                    <LinearGradient colors={['#0379C9', '#065E99']} style={itemDetail}>
                                        <Icon name="bed" type="font-awesome" color="#FFF" size={25}  />
                                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginVertical: 5}]}>Bedrooms</MyText>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}>{bedrooms}</MyText>
                                    </LinearGradient>

                                    <LinearGradient colors={['#0379C9', '#065E99']} style={itemDetail}>
                                        <Icon name="shower" type="font-awesome" color="#FFF" size={25}  />
                                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginVertical: 5}]}>Bathrooms</MyText>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}> 
                                            {(bathrooms == null) ? 'N/A' : bathrooms}
                                        </MyText>
                                    </LinearGradient>

                                    <LinearGradient colors={['#0379C9', '#065E99']} style={itemDetail}>
                                        <Icon name="bath" type="font-awesome" color="#FFF" size={25}  />
                                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginVertical: 5}]}>Toilets</MyText>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}> 
                                            {(toilets == null) ? 'N/A' : toilets}
                                        </MyText>
                                    </LinearGradient>

                                    <LinearGradient colors={['#0379C9', '#065E99']} style={itemDetail}>
                                        <Icon name="home" type="font-awesome" color="#FFF" size={25}  />
                                        <MyText style={[textH4Style, textWhite, textNunitoBold, { marginVertical: 5}]}>House Type</MyText>
                                        <MyText style={[textH4Style, textNunitoBold, textWhite]}> 
                                            {house_type}
                                        </MyText>
                                    </LinearGradient>
                                </View>

                                <View>
                                    <MyText style={[textH4Style, textNunitoBold, textCenter, textGreyColor, { marginVertical: 10}]}>Description</MyText>
                                    <View style={divider}></View>
                                    <View style={textContainer}>
                                        <MyText style={[textH4Style, textGreyColor]}>{description}</MyText>
                                    </View>
                                </View>

                            </View>
                        </View>


                        
                            <View style={housePropertyStyle}>
                                <View>
                                    

                                    {this.agentFee_ServiceCharge()}
                                </View>

                            </View>
                        
                        
                    </View>
                </ScrollView>
                {this.render_footer_buttons()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    swipperContainer: {
        height: 320, borderWidth: 2
    },
    headerContainer: {
        position: 'absolute', zIndex: 10, top: 0, left: 0, width: '100%'
    },
    containerStyle: {
        paddingTop: 80
    },
    titleContainer: {
        paddingHorizontal: 20, paddingVertical: 10
    },
    bodyContainer: {
        paddingHorizontal:5
    },
    contentContainer: {
        elevation: 3, backgroundColor: colors.white, borderRadius: 8, marginTop: 10, marginBottom: 10, overflow: 'hidden'
    },
    contentContainer2: {
        elevation: 3, backgroundColor: colors.white, borderRadius: 8, marginTop: 10, marginBottom: 10, overflow: 'hidden'
    },
    locationContainer: {
        justifyContent: 'center', paddingVertical: 10
    },
    imageContainerStyle: {
        height: 330
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
    priceContainer: {
        paddingVertical: 10,
    },
    priceStyle: {
        flex: 1, alignItems: 'center'
    },
    statusStyle: {
        flex: 1, alignItems: 'center'
    },
    detailHeaderStyle: {
        paddingVertical: 10, borderBottomColor: colors.lightGrey, borderBottomWidth: 1
    },
    detailContainerStyle: {
        padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
    },
    itemDetail: {
        width: '48.5%', borderRadius: 8, justifyContent: 'center', alignItems: 'center',
        paddingVertical: 15, marginBottom: 15
    },
    textContainer: {
        paddingHorizontal: 10, paddingVertical: 10
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
    },
    footerContainer: {
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, zIndex: 1
    },
    footerItemContainer: {
        width: '48.5%', borderTopLeftRadius: 15, borderTopRightRadius: 15,
        paddingVertical: 8, justifyContent:'center', alignItems: 'center'
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
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