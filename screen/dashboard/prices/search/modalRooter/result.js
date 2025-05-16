import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Navigation}  from 'react-native-navigation';
import PickerValues from '../../../../../components/utils/PickerValues';
import Picker from '../../../../../components/input-field/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StartItem = (props) => {
    return(
        <View style = {styles.contentPath}>
            <Icon name = "brightness-1" style = {{marginRight: 16}} color = "#264653" size = {10}/>
            <Text style = {styles.textBold}>{props.text}</Text>
        </View>
    )
}

const DestinationItems = (props) => {
    return(
        <React.Fragment>
            {
                props.destinations.map((destination, index) => {
                return(
                    <View style = {styles.contentDes} key = {index}>
                        <View style = {styles.contentPath}>
                            <Icon name = "brightness-1" style = {{marginRight: 16, marginLeft: 2.2}} color = "#264653" size = {5}/>
                        </View>
                        <View style = {styles.contentPath}>
                            <Icon name = "brightness-1" style = {{marginRight: 16, marginLeft: 2.2}} color = "#264653" size = {5}/>
                            <Text style = {styles.text}>{destination.price} FCFA</Text>
                        </View>
                        <View style = {styles.contentPath}>
                            <Icon name = "brightness-1" style = {{marginRight: 16, marginLeft: 2.2}} color = "#264653" size = {5}/>
                        </View>
                        <View style = {styles.contentPath}>
                            <Icon name = "brightness-1" style = {{marginRight: 16}} color = "#264653" size = {10}/>
                            <Text style = {styles.textBold}>{destination.des}</Text>
                        </View>
                    </View>
                )})  
            }
        </React.Fragment>
               
                
    )
}


export default class Congradulation extends Component{

    constructor(props){
        super(props)
        this.state = {
            pickerValue: PickerValues[0].value,
        }
    }

    render(){
        
        const { pickerValue } = this.state;
        const { navigation } = this.props;

        const start = navigation.getParam('start', 'nothing');
        const end = navigation.getParam('destinations', []);

        return(
            <View style = {styles.container}>
                <View style = {styles.content}>
                    <StartItem text = {start}/>
                    <DestinationItems destinations = {end}/>
                    <Picker style = {styles.picker} selectValue = {pickerValue} values = {PickerValues} 
                        onValueChange = {(itemValue, itemIdex) => this.setState({pickerValue: itemValue})}/>
                    <Text style = {styles.text}>Le meilleur tarif trouvé est de <Text style = {styles.textBold}>2500 FCFA</Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        marginHorizontal: 16,
    },
    content:{
        marginTop: 27,
        backgroundColor: "#FFF",
        padding: 28,
        borderRadius: 10
    },
    contentPath:{
        flexDirection: "row",
        alignItems: "center"
    },
    text:{
        color: "#264653",
    },
    picker: {
        borderWidth: 1,
        borderColor: "#264653",
        marginVertical: 17
    },
    textBold:{
        color: "#264653",
        fontWeight: "bold"
    },
    contentDes:{
        margin: 0,
        padding: 0,
        flexDirection: "column"
    }
})