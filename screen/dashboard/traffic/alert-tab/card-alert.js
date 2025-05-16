import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const CardAlert = (props) => {

    const { alertType, address, address2, icon, latLng, id } = props

    return(
        <View style = {styles.container}>
            <View style = {styles.content}>
                <View>
                    <Text style = {styles.typeAlert}>{alertType}</Text>
                    <Text style = {styles.address}>{address}</Text>
                    <Text style = {styles.address}>{address2 != null ? address2 : ""}</Text>
                </View>
                <View style = {styles.iconContent}>
                    <Icon style = {{marginBottom: 14}} name = {icon} size = {50}  color = "#264653"/>
                </View>
            </View>
            
            <View style = {styles.contentAction}>
                {/*<View style = {styles.thumbs}>
                    <TouchableOpacity style = {styles.thumbs} onPress = {() => props.likeFunction(idAlert, userId)}>
                        <IconMaterial name = "thumb-up" size = {25} color = {colorlike}/>
                        <Text style = {styles.likeNumber}>{like.length}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.thumbs} onPress = {() => props.unlikeFunction(idAlert, userId)}>
                        <IconMaterial name = "thumb-down" size = {25} color = {colorunlike}/>
                        <Text style = {styles.likeNumber}>{unlike.length}</Text>
                    </TouchableOpacity>
                </View>
                */}
                <TouchableOpacity style = {styles.map} onPress = {() => props.showPosition(latLng.lat, latLng.lng, icon, address, alertType, id)}>
                    <IconMaterial name = "map" size = {25} color = "#264653"/>
                    <Text style = {styles.likeNumber}>voir sur la map</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor: "#fff",
        marginBottom: 5,
        padding: 12
    },
    content:{
        flexDirection : "row",
        justifyContent: "space-between",
       
    },
    contentLike:{
        flexDirection: "row",

    },
    contentAction:{
        flexDirection: "row",
        alignItems: "flex-start",
        
    },
    thumbs:{
        flexDirection: "row",
        marginRight: 21,
        alignItems: "center"
    },
    map:{
        flexDirection: "row",
        alignItems: "center",
    },
    typeAlert:{
        color: "#264653",
        fontWeight: "bold",
    },
    address:{
        color: "#264653",
        fontSize: 12
    },
    likeNumber:{
        color: "#264653",
        marginLeft: 5,
        fontSize: 12
    },
    iconContent:{
        alignItems: "flex-end"
    }
})

export default CardAlert