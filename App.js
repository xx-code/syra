import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
import {Image} from 'react-native';
import Onboarding from './screen/onboarding/onboarding';
import Login from './screen/login-logup/login';
import SplashScreen from 'react-native-splash-screen';
import Logup from './screen/login-logup/logup';
import Dashboard from './screen/dashboard/dashboard';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'; 
import rootReducer from './reducers/reducers';

/*const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);*/

const Root = createStackNavigator({
    onboarding: Onboarding,
    login: Login,
    logup: Logup,
    dashboard: {screen: Dashboard,
        navigationOptions: () => ({
            headerLeft: null,
            headerTitle:(<Image style = {{width: 32.2, height: 32.2, flex: 1}} resizeMode="contain" source = {require('./images/logo-light-white.png')}/>),
            headerStyle:{
                backgroundColor: "#E76F51",
                elevation:0
            },
        }) 
    }
},
{
    initialRouteName: "onboarding"
}
)

export default class App extends Component{
    // desactive le splashScreen quand la partie intro est monter
    componentDidMount(){
        SplashScreen.hide();
    }
    render(){
       return(<Root/>)
    }
}

