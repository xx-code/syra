import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Add from './add/add';
import Search from './search/search';

export default createMaterialTopTabNavigator(
    {
        search: {
            screen: Search,
            navigationOptions: {
                tabBarLabel: "Faire une recherche",
                tabBarTestID: "search"
            }
        },
        add: {
            screen: Add,
            navigationOptions: {
                tabBarLabel: "Ajouter une itineraire",
                tabBarTestID: "add"
            }
        }
    },
    {
        initialRouteName : "search",
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