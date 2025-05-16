import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Traffic from './traffic/traffic';
import Prices from './prices/prices';
import Account from './account/account';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default createBottomTabNavigator(    
    {
        
        traffic: {
            screen: Traffic,
            navigationOptions: {
                tabBarLabel: " ",
                tabBarIcon: ({tintColor}) => <Icon name = "directions-car" color = {tintColor} size = {20}/>
            }
        },
        prices: {
            screen: Prices,
            navigationOptions: {
                tabBarLabel: " ",
                tabBarIcon: ({tintColor}) => <Icon name = "place" color = {tintColor} size = {20}/>
            }
        },
        account: {
            screen: Account,
            navigationOptions: {
                tabBarLabel: " ",
                tabBarIcon: ({tintColor}) => <Icon name = "account-circle" color = {tintColor} size = {20}/>,
            }
        }
    },
    {
        initialRouteName : "traffic",
        tabBarOptions: {
            activeTintColor: "#E76F51",
            inactiveTintColor: "#707070",
            style:{
                backgroundColor: "#fff",
                height: 50,
                elevation: 10,
                paddingTop: 15
            },
            labelStyle:{
                fontSize: 12,
            },
        }
    
    }
)