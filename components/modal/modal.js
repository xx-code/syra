import React, {Component} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Button, Text, Animated} from 'react-native';
import {ButtonAlert} from '../button/button_ui';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ModalView = (props) => {
    return(
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {props.visible}
            onRequestClose = {props.onPressBack}>
            <View style = {styles.modalView}>
                {props.children}
                <View style = {styles.viewClose}>
                    <TouchableOpacity style = {styles.close}
                        onPress = {props.onPressBack}>
                        <Icon name = "clear" color = "#FFF" size = {30}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export const ModalView2 = (props) => {
    return(
        <Modal
            animationType = "slide"
            transparent = {false}
            visible = {props.visible}
            onRequestClose = {props.onPressBack}>
            <View style = {styles.modalView2}>
                <View style = {styles.barModalView}>
                    <TouchableOpacity style = {styles.closeView}
                            onPress = {props.onPressBack}>
                        <Icon name = "clear" color = "#fff" size = {30}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.tabBarModal}>
                    <Text style = {styles.titleModalView}>{props.titleModal}</Text>
                </View>
                {props.children}
            </View>
        </Modal>
    )
}

export class ModalAlert extends Component {
    state = {
        fade: new Animated.Value(-1000)
    }

    anime = (value) => {
        Animated.timing(this.state.fade,
            {
                toValue: value,
                duration: 1000
            }).start();
    }

    render(){
        this.props.visible ? this.anime(this.props.position) : this.anime(-1000)

        return(
            <Animated.View style = { [styles.modalAlert, {bottom: this.state.fade}] }>
                {this.props.children}
            </Animated.View>
        )
    }
    
}


const styles = StyleSheet.create({
    back : {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    viewClose:{
        position: "absolute",
        width: "100%",
        alignItems: "flex-end"
    },
    close:{
        backgroundColor: "#E76F51",
        width: 40,
        height: 40,
        marginRight: 16,
        marginTop: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    modalAlert:{
        backgroundColor: "#fff",
        padding: 10,
        position: "absolute",
        width: "100%",
        zIndex: 100
    },
    backAlert:{
        flex: 1,
        justifyContent: "flex-end"
    },
    alertContentButton:{
        flexDirection: "row",
        justifyContent: "space-around"
    },
    alterTitle:{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8
    },
    alterMessage:{
        marginBottom: 8
    },
    modalView:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modalView2:{
        flex: 1,
        backgroundColor: "#EAEAEA"
    },
    barModalView:{
        
        backgroundColor: "#E76F51",
        alignItems:"flex-end",
    },
    closeView:{
        marginRight: 14,
        marginTop: 13
    },
    tabBarModal:{
        backgroundColor: "#E76F51"
    },
    titleModalView:{
        color: "#FFF",
        textAlign: "center",
        paddingVertical: 10
    }
})

