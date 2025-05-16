import React, {Component} from 'react';
import {StyleSheet, Modal, Text, View, ActivityIndicator } from 'react-native';

export default class ModalLoading extends Component{
    render(){
        return(
            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {this.props.active}
                onRequestClose = {() => {

                }}>
                <View style = {styles.modal}>
                    <View style = {styles.modalView}>
                        <ActivityIndicator size="large" color = "#E76F51"/>
                        <Text style = {{textAlign: "center"}}>Chargement...</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    modalView: {
        backgroundColor: "#fff",
        padding: 50,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        borderColor: "#fff"
    }
})