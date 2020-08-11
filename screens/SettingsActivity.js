import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    Switch
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../screens/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

var deviceId;

class SettingsActivity extends Component {

    constructor(props) {
        super(props);
        this.logoutcall = this.logoutcall.bind(this);
        this.state = {
            tempstatus: false,
            tempstatusvalue: 'Low',
            heartstatus: false,
            heartstatusvalue: 'Low',
            spo2status: false,
            spo2statusvalue: 'Low',
            syncstatus: true,
            syncstatusvalue: 'Yes',
            bluetoothstatus: true,
            bluetoothstatusvalue: 'ON',
            logouturl: 'http://process.trackany.live/mobileapp/native/logout.php?',

 
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Settings'
    };

    componentDidMount() {


        
    }


    toggletempstatus = (value) => {

        if (value == true) {

            this.setState({ tempstatus: value })

            try {

                this.setState({ tempstatusvalue: "High" })
                AsyncStorage.setItem('@tempstatusvalue', "High");
            } catch (error) {
                console.log("Error saving data" + error);
            }

        }
        else {
            this.setState({ tempstatus: value })

            try {
                this.setState({ tempstatusvalue: "Low" })
                AsyncStorage.setItem('@tempstatusvalue', "Low");
            } catch (error) {
                console.log("Error saving data" + error);
            }
        }

        console.log("value===" + value);

    }

    toggleheartstatus = (value) => {

        if (value == true) {

            this.setState({ heartstatus: value })

            try {

                this.setState({ heartstatusvalue: "High" })
                AsyncStorage.setItem('@heartstatusvalue', "High");
            } catch (error) {
                console.log("Error saving data" + error);
            }

        }
        else {
            this.setState({ heartstatus: value })

            try {
                this.setState({ heartstatusvalue: "Low" })
                AsyncStorage.setItem('@heartstatusvalue', "Low");
            } catch (error) {
                console.log("Error saving data" + error);
            }
        }

        // console.log("value===" + value);

    }

    togglespo2status = (value) => {

        if (value == true) {

            this.setState({ spo2status: value })

            try {

                this.setState({ spo2statusvalue: "High" })
                AsyncStorage.setItem('@spo2statusvalue', "High");
            } catch (error) {
                console.log("Error saving data" + error);
            }

        }
        else {
            this.setState({ spo2status: value })

            try {
                this.setState({ spo2statusvalue: "Low" })
                AsyncStorage.setItem('@spo2statusvalue', "Low");
            } catch (error) {
                console.log("Error saving data" + error);
            }
        }

        // console.log("value===" + value);

    }

    togglesyncstatus = (value) => {

        if (value == true) {

            this.setState({ syncstatus: value })

            try {

                this.setState({ syncstatusvalue: "Yes" })
                AsyncStorage.setItem('@syncstatusvalue', "Yes");
            } catch (error) {
                console.log("Error saving data" + error);
            }

        }
        else {

            this.setState({ syncstatus: value })

            try {
                this.setState({ syncstatusvalue: "No" })
                AsyncStorage.setItem('@syncstatusvalue', "No");
            } catch (error) {
                console.log("Error saving data" + error);
            }
        }

        // console.log("value===" + value);

    }

    togglebluettothstatus = (value) => {

        if (value == true) {

            this.setState({ bluetoothstatus: value })

            try {

                this.setState({ bluetoothstatusvalue: "ON" })
                AsyncStorage.setItem('@bluetoothstatusvalue', "ON");
            } catch (error) {
                console.log("Error saving data" + error);
            }

        }
        else {

            this.setState({ bluetoothstatus: value })

            try {
                this.setState({ bluetoothstatusvalue: "OFF" })
                AsyncStorage.setItem('@bluetoothstatusvalue', "OFF");
            } catch (error) {
                console.log("Error saving data" + error);
            }
        }

        // console.log("value===" + value);

    }


    logoutcall() {
        deviceId = DeviceInfo.getUniqueId();
        console.log('device id ===' + deviceId)

        let formdata = new FormData();

        formdata.append('device_id', deviceId)
        formdata.append('token', '1234')

        var url = this.state.logouturl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then((response) => response.json())
            .then(responseJson => {
                this.hideLoading();

                console.log("response json===" + JSON.stringify(responseJson))
                AsyncStorage.setItem('@is_login', '0');

                this.props.navigation.navigate('Login')

             

            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }



   



    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                        <Text style={styles.screentitle}>Smart Wristband</Text>

                    </TouchableOpacity>

                </View>


                <View style={{
                    flexDirection: 'column', backgroundColor: 'white',
                    flex: 1, width: '100%'
                }}>

                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/thermometer.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>


                        <View style={{ flex: .40 }}
                            onPress={() => { }} >

                            {/* <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>{this.state.tempstatusvalue}</Text> */}


                        </View>

                        <View style={{ flex: .45, marginRight: 20}}
                            onPress={() => { }} >

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10
                            }}>

                                <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>110.0F</Text>

                            </View>


                        </View>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />

                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/cardiogram.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>


                        <View style={{ flex: .40, margin: 10 }}
                            onPress={() => { }} >

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10
                            }}>

                                <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>50</Text>

                            </View>


                        </View>

                        <View style={{ flex: .40, margin: 10 }}
                            onPress={() => { }} >

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10
                            }}>

                                <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>110</Text>

                            </View>
                        </View>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />

                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/blood-drop.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>



                        <View style={{ flex: .40, margin: 10 }}
                            onPress={() => { }} >

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10
                            }}>

                                <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>91</Text>

                            </View>


                        </View>

                        <View style={{ flex: .40, margin: 10 }}
                            onPress={() => { }} >

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'black', borderWidth: 1, padding: 10
                            }}>

                                <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>100</Text>

                            </View>
                        </View>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />


                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/clock.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>


                        <TouchableOpacity style={{ flex: .60 }}
                            onPress={() => { }} >

                            <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>27/07/2020</Text>



                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >

                            <Image source={require('../images/calendar.png')}
                                style={styles.ImageIconStyle}
                            />

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1, 
                             opacity:.5,
                            marginTop: 10
                        }}
                    />

                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/sync.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>


                        <TouchableOpacity style={{ flex: .60 }}
                            onPress={() => { }} >

                            <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>{this.state.syncstatusvalue}</Text>



                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >

                            <Switch
                                onValueChange={this.togglesyncstatus}
                                value={this.state.syncstatus} />

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />

                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { }} >

                            <Image source={require('../images/bluetooth.png')}
                                style={styles.ImageIconStyle}
                            />


                        </View>


                        <TouchableOpacity style={{ flex: .60 }}
                            onPress={() => { }} >

                            <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>{this.state.bluetoothstatusvalue}</Text>



                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >

                            <Switch
                                onValueChange={this.togglebluettothstatus}
                                value={this.state.bluetoothstatus} />

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />

                    <TouchableOpacity style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'
                    }}
                        onPress={() => { this.logoutcall() }}>

                        <TouchableOpacity style={{
                            flex: .15, alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center', marginLeft: 15
                        }}
                            onPress={() => { this.logoutcall() }}>

                            <Image source={require('../images/logout_icon.png')}
                                style={styles.logouticonStyle}
                            />


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60 }}
                            onPress={() => { this.logoutcall() }}>

                            <Text style={{ color: '#4D4D4D', fontSize: RFPercentage(3), textAlign: 'center', fontWeight: 'bold' }}>logout</Text>


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .25, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { this.props.navigation.navigate('Login') }}>


                        </TouchableOpacity>

                    </TouchableOpacity>

                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            opacity:.5,
                            marginTop: 10
                        }}
                    />

                </View>


                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_inactive.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('TempratureHistoryTab') }}>

                        <Image source={require('../images/history_inactive-2.png')}
                            style={styles.StyleVideoTab} />

                        <Text style={styles.bottomvideotextstyle}>{stringsoflanguages.my_videos}</Text>

                    </TouchableOpacity>



                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Notification') }}>

                        <Image source={require('../images/bell_inactive.png')}
                            style={styles.styleNotificationTab} />

                        <Text style={styles.bottomnotificationtextstyle}>{stringsoflanguages.notification_small}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Settings') }}>

                        <Image source={require('../images/setting_inactive.png')}
                            style={styles.StyleProfileTab} />

                        <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.settings}</Text>


                    </TouchableOpacity>



                </View>




            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F9FE'
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading_text: {
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFC33B',
        fontWeight: 'bold'
    },
    input: {
        color: 'black',
        height: 50,
        padding: 10,
        flex: .5,
        textAlign: 'left',
        backgroundColor: 'transparent'
    },
    labeltextstyle: {
        color: '#4D4D4D',
        marginLeft: 21,
        fontSize: RFPercentage(2),
        textAlign: 'left'
    },

    subscribe_level_text: {
        color: '#4D4D4D',
        marginLeft: 10,
        marginTop: 10,
        fontSize: RFPercentage(2),
        textAlign: 'left'
    },

    bottomactivetextstyle: {
        color: "#0081C9",
        fontSize: 8,
        marginTop: 5,
        textAlign: 'center'
    },
    bottominactivetextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    StyleHomeTab: {
        marginTop: 5,
        width: 30,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleVideoTab: {
        marginTop: 5,
        width: 38,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomvideotextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
    },
    styleNotificationTab: {
        marginTop: 9,
        width: 25,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomnotificationtextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center'
    },
    StyleProfileTab: {
        marginTop: 9,
        width: 30,
        height: 30,
        tintColor: '#0081C9',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        margin: 5,
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    }
    ,
    tabButtonStyle: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        margin: 10,
        width: 300
    },
    StyleMenuIcon: {
        width: 30,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleNotificationIcon: {
        width: 33,
        height: 44,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleChangePassword: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleSubscribedVideo: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    second_half_view: {
        flex: .80,
        justifyContent: 'center',
        marginLeft: 5,
        alignSelf: 'center'
    },
    profileNameStyle: {
        color: 'white',
        marginLeft: 10,
        marginTop: 20,
        fontSize: RFPercentage(2),
        textAlign: 'center'

    },
    CircleShapeView: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        marginBottom: 50,
        backgroundColor: 'white',
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    plusiconstyle: {
        height: 30,
        width: 30,
        marginTop: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#0081C9'
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 35,
        width: 35,
        tintColor: '#0081C9',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logouticonStyle: {
        marginTop: 3,
        height: 40,
        width: 32,
        tintColor: '#0081C9',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingsActivity;

