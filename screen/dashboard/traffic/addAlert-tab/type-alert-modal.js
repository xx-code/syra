import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase'

const CircleIcon = (props) => {
    return(
        <View style = {styles.circleIcon}>
            <TouchableOpacity
                style = {styles.buttonIcon}
                onPress = {props.onPress}>
                    <Icon name = {props.name} color = "#FFF" size = {50}/>
            </TouchableOpacity>
            <Text style = {styles.iconDetail}>{props.detail}</Text>
        </View>
        
    )
}

export default class ModalContent extends Component{

    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection('alert');
    }

    addAlert = (type, icon) => {
        const { locationAlert, back } = this.props;
        const newAlert = {
            location : locationAlert,
            alertType : type,
            alertIcon : icon,
            like : [],
            unlike : [],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        this.ref.add(newAlert).then(() => back())
    }

    render(){
       return(
           <View style = {styles.container}>
               <View style = {styles.contentRow}>
                   <CircleIcon name = "car-crash" onPress = {() => this.addAlert("Accident", "car-crash")} detail = "Accident"/>
                   <CircleIcon name = "car" onPress = {() => this.addAlert("Embouteillage", "car")} detail = "Embouteillage"/>
                   <CircleIcon name = "angry" onPress = {() => this.addAlert("Policiers", "angry")} detail = "Policiers"/>
                </View>
                <View style = {styles.contentRow}>
                   <CircleIcon name = "fire-extinguisher" onPress = {() => this.addAlert("Incendie", "fire-extinguisher")} detail = "Incendie"/>
                   <CircleIcon name = "exclamation-triangle" onPress = {() => this.addAlert("Route Barrée", "exclamation-triangle")} detail = "Route Barrée"/>
                   <CircleIcon name = "gas-pump" onPress = {() => this.addAlert("Station", "gas-pump")} detail = "Station"/>
               </View>
           </View>
       ) 
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor: "#EAEAEA"
    },
    buttonIcon:{
        backgroundColor: "#264653",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: 100
    },
    circleIcon:{
        flex: 1,
        alignItems: "center"
    },
    iconDetail:{
        marginTop: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#264653",
        fontSize: 15
    },
    contentRow:{
        flexDirection: "row",
        marginTop: 25
    }
})