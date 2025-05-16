import React, {Component} from 'react';
import {View} from 'react-native';

const HideView = (props) => {
    if(!props.hide){
        return null;
    }else{
        return (<View style = {props.style}>
                    {props.children}
                </View>)
    }
}

export default HideView;