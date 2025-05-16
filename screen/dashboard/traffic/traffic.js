import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Alert from './alert-tab/alert';
import AddAlert from './addAlert-tab/addAlert-tab';

export default createMaterialTopTabNavigator(
    {
        alert: {
            screen: Alert,
            navigationOptions: {
                tabBarLabel: "Toutes Les Alertes",
                tabBarTestID: "alert"
            }
        },
        addAlert: {
            screen: AddAlert,
            navigationOptions: {
                tabBarLabel: "Ajouter Une Alerte",
                tabBarTestID: "addAlert"
            }
        }
    },
    {
        initialRouteName : "alert",
        tabBarOptions:{
            labelStyle: {
                color: "#fff",
                fontSize: 10
            },
            indicatorStyle:{
                backgroundColor: "rgba(38, 70, 83, 0.25)",
                borderRadius:30,
                height: 40,
                marginBottom: 18,
                width:"42%",
                marginRight: 16,
                marginLeft: 16,
            },
            style:{
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: "#E76F51",
                elevation: 0
            }
        }
    }
)