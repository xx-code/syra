import React, {Component} from 'react';
import {StyleSheet, Picker, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import HideView from '../utils/HideView';

const Item = (props) => {
    return(
        <TouchableOpacity style = {styles.item}
            onPress = {() => props.click(props.value)}>
            <Text>{props.value.label}</Text>
        </TouchableOpacity>
    )
}

export const ElementPicker = (props) => {
    return(
        <View style = {[styles.picker, props.style]}>
            <Picker 
                selectedValue = {props.selectValue}
                onValueChange = {props.onValueChange}
                mode = "dropdown"
                style = {styles.pickerIn}>
                {
                    props.values.map((value, index) => {
                        return <Picker.Item key = {index} label = {value.label} value = {value.value}/>
                    })
                }
            </Picker>
        </View>
        
    )
}

export class  ElementPickerBackScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
            selectValue : {},
            visible: false
        }
    }

    componentDidMount(){
        this.setState({selectValue: this.props.selectValue})
    }

    onValueChange = (itemValue) => {
        this.props.onValueChange(itemValue);
        this.setState({visible: false, selectValue: itemValue});
    } 

    render(){
        return(
            <View style = {this.props.style}>
                <TouchableOpacity onPress = {() => this.setState({visible: !this.state.visible})} style = {styles.pickerBack}>
                    <Text style = {{color: "#fff", position: "relative"}}>{this.state.selectValue.label}</Text>
                </TouchableOpacity>
                <HideView style = {styles.hideView} hide = {this.state.visible}>
                    {
                        this.props.values.map((value, index) => {
                            return <Item key = {index} value = {value} click = {this.onValueChange}/>
                        })
                    }
                </HideView>
            </View>
        
    )
    }
    
}

export const FilterPicker = (props) => {
    return(
        <View style = {styles.filterView}>
            <Picker 
                style = {styles.filterContent}
                selectedValue = {props.selectValue}
                onValueChange = {props.onValueChange}
                mode = "dropdown">
                {
                    props.values.map((value, index) => {
                        return <Picker.Item key = {index}  label = {value.label} value = {value.value}/>
                    })
                }
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    picker :{
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingLeft: 16,
        paddingVertical: 3
    },
    pickerIn:{
        padding:0,
        backgroundColor:"#fff",
        margin: 0,
        marginRight: 2
    },
    filterView:{
        backgroundColor: "#fff", 
        marginTop: 5, 
        marginBottom: 5
    },
    filterContent:{
        display: "flex",
        padding: 0,
        color:  "#264653",
        justifyContent: "center"
    },
    pickerBack: {
        backgroundColor: "rgba(38, 70, 83, 0.25)",
        borderRadius: 20,
        paddingVertical: 9,
        paddingLeft: 15
    },
    item:{
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E3E3"
    },
    tintItem:{
        color :'black', 
        fontSize: 14
    },
    hideView:{
        backgroundColor: "#fff"
    }
})

export default ElementPicker