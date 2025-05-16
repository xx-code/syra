import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Button, Text, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

export default class AlertAnswere extends Component{

    state = {
        fadeOut: new Animated.Value(-1000)
    }

    componentDidMount(){
        Animated.timing(this.state.fadeOut,
            {
                toValue: 0,
                duration: 1000
            }).start();
    }

    render(){
        const {iconAlert, address, proximite, typeAlert, id} = this.props

        let confirm = proximite ?   <View style = {styles.contentBtn}>
                                        <TouchableOpacity style = {styles.btn} onPress = {() => this.props.accept(id)}>
                                            <IconMaterial name = "done" size = {22} color = "#264653"/>
                                            <Text style = {styles.textBtn}>CONFIRMER</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style = {[styles.btn, {marginLeft: 23}]} onPress = {() => this.props.decline(id)}>
                                            <IconMaterial name = "clear" size = {22} color = "#264653"/>
                                            <Text style = {styles.textBtn}>REFUSER</Text>
                                        </TouchableOpacity>         
                                    </View>: <View></View>

        return(
            <Animated.View style = {[styles.container, {bottom: this.state.fadeOut}]}>
                <View style = {styles.contentAddress}>
                    <Icon style = {styles.iconView} name = {iconAlert} size = {37} color = "#264653"/>
                    <View style = {styles.contentAdv}>
                        <Text style = {styles.textAddress}>{typeAlert}</Text>
                        <Text style = {styles.subtext}>{address}</Text>
                    </View>
                </View>
                <Text style = {styles.subtext}>
                    Si vous vous trouver près des lieux vous pouvez confirmer ou refuter cette alerte
                </Text>
                {
                    confirm
                }
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "#fff"
    },
    contentAddress:{
        flexDirection: "row",
        marginBottom: 22
    },
    iconView:{
        marginRight: 22
    },
    textAddress:{
        color: "#264653",
        fontSize: 20
    },
    subtext:{
        color: "#707070",
        fontSize: 14
    },
    textBtn:{
        color: "#264653",
        fontSize: 14,
        marginLeft: 7
    },
    contentBtn:{
        flexDirection: "row",
        marginTop: 17
    },
    btn:{
        flexDirection: "row"
    }
})