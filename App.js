import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashActivity from './screens/SplashActivity';
import LoginActivity from './screens/LoginActivity';
import SignupActivity from './screens/SignupActivity';
import DashboardActivity from './screens/DashboardActivity';
import NotificationActivity from './screens/NotificationActivity';
import TempratureHistoryTabActivity from './screens/HistoryTabs/TempratureHistoryTab';
import InteractionHistoryTabActivity from './screens/HistoryTabs/InteractionHistoryTab';
import AddBluetoothDeviceActivity from './screens/AddBluetoothDeviceActivity';
import BluetoothDeviceListActivity from './screens/BluetoothDeviceListActivity';
import SettingsActivity from './screens/SettingsActivity';

const NavStack = createStackNavigator(
    {
        Splash: { screen: SplashActivity },
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        Dashboard: { screen: DashboardActivity },
        Notification: { screen: NotificationActivity },
        TempratureHistoryTab: { screen: TempratureHistoryTabActivity },
        InteractionHistoryTab: { screen: InteractionHistoryTabActivity },
        AddBluetoothDevice: { screen: AddBluetoothDeviceActivity },
        BluetoothDeviceList: { screen: BluetoothDeviceListActivity },
        Settings: { screen: SettingsActivity }
      

        
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