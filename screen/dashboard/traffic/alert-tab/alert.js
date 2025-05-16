import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator, Alert} from 'react-native';
import CardAlert from './card-alert';
import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoder';
import { ModalView } from '../../../../components/modal/modal';
import MapView from 'react-native-maps'
import coordinateBase from '../../../../components/utils/static-data';
import FilterTab from './filterTab';
import { FilterValues } from '../../../../components/utils/PickerValues';
import geolib from 'geolib';
import AlertAnswere from './alertAnswere';

const filterByConfirmation  =  (array) =>  {
    let newArray = [];
    for(let i = 0; i < array.length; i++){
        if(array[i].like.length > array[i].unlike.length){
            newArray.push(array[i])
        }
    }
    return newArray;
}

export default class AlertComponent extends Component{

    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('alert');
        this.unsubscribe = null;
        this.user = null;
        this.state = {
            alerts : [],
            filertAlerts : [],
            showMap : false,
            location : coordinateBase,
            selectValue : FilterValues[1].value,
            selectedAddress : "",
            selectedIcon : "",
            selectedProximite: false,
            selectedIdAlert : "",
            selectedtypeAlert : "",
            searchingAlert: false 
        };
    }

    componentDidMount(){
        this.unsubscribe = this.ref.orderBy("timestamp", "ASC").onSnapshot(this.getAlert)
        firebase.auth().onAuthStateChanged(user => {
            this.user = user;
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getAlert = (querySnapshot) => {
        this.setState({searchingAlert: true});
        const alerts = [];

        querySnapshot.forEach(doc => {
            const { alertIcon, alertType, location, like, unlike } = doc.data();
            const id = doc.id
            
            let latLng ={
                lat: location.latitude,
                lng: location.longitude
            }

            Geocoder.geocodePosition(latLng).then(res => {
                const newAlert = {
                    key :  id,
                    alertIcon : alertIcon,
                    alertType : alertType,
                    location : res[0].formattedAddress,
                    locationAddress: res[1].subLocality,
                    latLng : latLng,
                    unlike : unlike,
                    like : like,
                }
    
                alerts.unshift(newAlert);
    
                this.setState({alerts: alerts, filertAlerts: alerts, searchingAlert: false})

            })
            
        });
    }

    like = (idAlert) => {
        const idUser = this.user.uid
        const { alerts } = this.state;
        let index, i;
        for(i = 0; i < alerts.length; i++){
            if(alerts[i].key === idAlert)
                index = i;
        }
    
        const like = alerts[index].like;

        const unlike = alerts[index].like;

        if(like.includes(idUser) || unlike.includes(idUser)){

            if(like.includes(idUser)){
                Alert.alert(
                    "Attention!",
                    "Vous ne pouvez pas valider l'alerte plus d'une fois.",
                )
            }

            if(unlike.includes(idUser)){
                Alert.alert(
                    "Attention!",
                    "Vous avez invalider cette alerte. Voulez vous la valider?",
                    [
                        {
                            text: 'valider', 
                            onPress: () => {
                                let index;
                            
                                index = unlike.indexOf(idUser);
                                unlike.splice(index, 1);

                                like.push(idAlert)
    
                                this.ref.doc(idAlert).update({
                                    like : like,
                                    unlike : unlike
                                }).then(done => {
                                    Alert.alert(
                                        "Félicitation",
                                        "Vous venez de valide cette alerte"
                                    )
                                })
                            }
                        },
                        {
                            text: 'Annuler',
                            style: 'cancel'
                        }
                    ]
                )
            }
            
        }else{
            like.push(idUser);
            this.ref.doc(idAlert).update({
                like : like
            }).then(done => {
                Alert.alert(
                    "Félicitation",
                    "Merci d'avoir confirmer cette alerte "
                )
            })
        }
        
    }

    unlike = (idAlert) => {
        const idUser = this.user.uid
        const { alerts } = this.state;
        let index, i;
        for(i = 0; i < alerts.length; i++){
            if(alerts[i].key === idAlert)
                index = i;
        }
    
        const like = alerts[index].like;

        const unlike = alerts[index].unlike;

        if(unlike.includes(idUser) || like.includes(idUser)){

            if(unlike.includes(idUser)){
                Alert.alert(
                    "Attention!",
                    "Vous ne pouvez pas invalider l'alerte plus d'une fois.",
                )
            }

            if(like.includes(idUser)){
                Alert.alert(
                    "Attention!",
                    "Vous avez valider cette alerte. Voulez vous l'invalider?",
                    [
                        {
                            text: 'valider', 
                            onPress: () => {
                                let index;
                            
                                index = unlike.indexOf(idUser);
                                unlike.splice(index, 1);

                                like.push(idAlert)
    
                                this.ref.doc(idAlert).update({
                                    like : like,
                                    unlike : unlike
                                }).then(done => {
                                    Alert.alert(
                                        "Merci",
                                        "Vous venez d'invalider cette alerte"
                                    )
                                })
                            }
                        },
                        {
                            text: 'Annuler',
                            style: 'cancel'
                        }
                    ]
                )
            }
        }else{
            unlike.push(idUser);
            this.ref.doc(idAlert).update({
                unlike : unlike,
            }).then(done => {
                Alert.alert(
                    "Merci",
                    "Vous venez d'invalider cette alerte"
                )
            })
        } 
    }

    showRealPosition = (lat, lng, icon, add, typAdd ,id) => {
        let location = {
            latitude : lat,
            longitude : lng,
            longitudeDelta : 0.0112,
            latitudeDelta : 0.0112 * Dimensions.get('window').width / Dimensions.get('window').height 
        }
        navigator.geolocation.getCurrentPosition(pos => {
            let ok = false; 
            if(geolib.isPointInCircle({latitude: pos.coords.latitude, longitude: pos.coords.longitude}, 
                {latitude:  lat, longitude: lng}, 2000)){
                ok = true
            }
            this.setState({location: location, showMap: true, 
                            selectedAddress : add, selectedIcon : icon,
                            selectedProximite : ok, selectedIdAlert : id,
                            selectedtypeAlert : typAdd
                         })
        })
        
    }

    onValueChange = (value) => {
        switch(value){
            case FilterValues[1].value:        
                this.setState({filertAlerts: this.state.alerts, selectValue: FilterValues[0].value,})
                break;
            case FilterValues[0].value:
                navigator.geolocation.getCurrentPosition(pos => {
                    let newArray = [];
                    for(let i = 0; i < this.state.alerts.length; i++){
                        if(geolib.isPointInCircle({latitude: pos.coords.latitude, longitude: pos.coords.longitude}, 
                            {latitude:  this.state.alerts[i].latLng.lat, longitude:  this.state.alerts[i].latLng.lng}, 2000)){
                            newArray.push( this.state.alerts[i])
                        }
                    }
                    this.setState({filertAlerts: newArray, selectValue: FilterValues[1].value})
                })
                
                break;
            case FilterValues[2].value:
                let array = filterByConfirmation(this.state.alerts);
                this.setState({filertAlerts: array, selectValue: FilterValues[2].value})
                break;
            default:
                break;
        }
    }

    render(){

        const { showMap, location, selectValue, filertAlerts, 
                selectedAddress, selectedIcon, selectedProximite, 
                selectedtypeAlert, selectedIdAlert, searchingAlert } = this.state;

        const { navigation } = this.props;

        const sameAlert = navigation.getParam('alert', null);

        if(sameAlert !== null){
            this.showRealPosition(  sameAlert.latLng.lat, 
                                    sameAlert.latLng.lng, 
                                    sameAlert.alertIcon,
                                    sameAlert.location, 
                                    sameAlert.alertType, 
                                    sameAlert.key);
        }

        let content;

        if(searchingAlert){
            content =   <View style = {{justifyContent: "center"}}>
                            <ActivityIndicator color = "" size = "large" />
                        </View>
        }else{
            if(filertAlerts.length <= 0){
            content =   <View>
                            <Text style = {styles.noAlert}>Aucune Alerte a été detecter par les utilisateurs</Text>
                        </View>
            }else{

                content = <FlatList
                            data = {filertAlerts}
                            onRefresh = {this.unsubscribe}
                            refreshing = {searchingAlert}
                            keyExtractor = {(item, index) => item.key}
                            renderItem = { ({item}) => <CardAlert  alertType = {item.alertType} id = {item.key}
                                                            address = {item.location} icon = {item.alertIcon} address2 = {item.locationAddress}
                                                            showPosition = {this.showRealPosition} latLng = {item.latLng}/>}
                            />
            }
        }   

        

        return(
            <View style = {styles.container}>
                <FilterTab
                    selectValue = {selectValue}
                    values = {FilterValues}
                    onValueChange = {this.onValueChange}
                    />
                    {content}
                <ModalView
                    visible = {showMap}
                    onPressBack = {() => {this.props.navigation.setParams({alert: null}); 
                                        this.setState({showMap : false, location : coordinateBase}) } }>
                    <MapView
                        style = {{flex: 1}}
                        region = {location}>
                        {
                            marker = showMap ? <MapView.Marker coordinate = {location}/> : null
                        }
                    </MapView>
                    <AlertAnswere iconAlert = {selectedIcon} 
                        address = {selectedAddress} 
                        proximite = {selectedProximite}
                        accept = {this.like}
                        id = {selectedIdAlert}
                        decline = {this.unlike}
                        typeAlert = {selectedtypeAlert}/>
                </ModalView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    noAlert:{
        textAlign: "center"
    },
})