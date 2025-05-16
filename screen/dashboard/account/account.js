import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Navigation}  from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';

const ItemBtn = (props) => {
    return(
        <TouchableOpacity style = {styles.itemBtn} onPress = {props.onPress}>
            <Icon style = {styles.iconBtn} name = {props.icon} size = {24} color = "rgba(0,0,0,0.5)"/>
            <Text style = {styles.itemName}>{props.itemName}</Text>
        </TouchableOpacity>
    )
}

export default class Account extends Component{

    static navigationOptions =  {
        headerStyle: {
            paddingVertical: 24
        }
    }

    constructor(props){
        super(props)
        this.ref = firebase.firestore().collection("users");
        this.state = {
            pseudo : "...",
            points: 0
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.ref.doc(user.uid).get().then(doc =>{
                    const {pseudo, points} = doc.data();
                    this.setState({
                        pseudo: pseudo,
                        points: points
                    });
                });
            }
            
        });
    }

    logout = () => {
        firebase.auth().signOut().then(done => {
            const Navigation = this.props.navigation
            Navigation.navigate("login");
        });
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.profile}>
                    <View style = {styles.infoProfile}>
                        <Text style = {styles.name}>{this.state.pseudo}</Text>
                        <Text style = {styles.points}>{this.state.points} points</Text>
                    </View>
                    <Image style = {styles.imgProfile} source = {require('../../../images/Avatar.png')}/>
                </View>
                <View style = {styles.contentItemBtn}>
                    <Text style = {styles.titleContent}>Découvrir</Text>
                    <ItemBtn icon = "whatshot" onPress = {() => {}} itemName = "Classement"/>
                    <ItemBtn icon = "shopping-cart" onPress = {() => {}} itemName = "Partenaires"/>
                </View>
                <View style = {styles.contentItemBtn}>
                    <Text style = {styles.titleContent}>Mon compte</Text>
                    <ItemBtn icon = "tune" onPress = {() => {}} itemName = "Paramètres"/>
                    <ItemBtn icon = "power-settings-new" onPress = {this.logout} itemName = "Se déconnecter"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    profile:{
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 33,
        paddingTop: 22,
        paddingBottom: 24,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    infoProfile:{

    },
    name:{
        color: "#264653",
        fontSize: 20
    },
    points:{
        color: "#264653",
        fontSize: 16
    },
    imgProfile:{
        width: 40,
        height: 40,
        borderRadius: 50
    },
    contentItemBtn:{
        backgroundColor: "#fff"
    },
    titleContent:{
        color: "#264653",
        fontSize: 18,
        paddingBottom: 17,
        paddingTop: 7,
        paddingLeft: 13
    },
    itemBtn:{
        flexDirection: "row",
        paddingLeft: 16,
    },
    iconBtn:{
        paddingVertical: 16
    },
    itemName:{
        color: "#000",
        fontSize: 16,
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 1,
        marginLeft: 32,
        paddingVertical: 16,
        width: "100%"
    }
})