import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashActivity from './screens/SplashActivity';
import LoginActivity from './screens/LoginActivity';
import SignupActivity from './screens/SignupActivity';
import DashboardActivity from './screens/DashboardActivity';
import NotificationActivity from './screens/NotificationActivity';
import SettingsActivity from './screens/SettingsActivity';
import MyVideosActivity from './screens/MyVideosActivity';



const NavStack = createStackNavigator(
    {
        Splash: { screen: SplashActivity },
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        Dashboard: { screen: DashboardActivity },
        Notification: { screen: NotificationActivity },
        Settings: { screen: SettingsActivity },
        MyVideos : {screen : MyVideosActivity}
       
        
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none'

    }

);

const Apps = createAppContainer(NavStack);

export default class App extends React.Component {

    render() {


        return <Apps />;
    }
}