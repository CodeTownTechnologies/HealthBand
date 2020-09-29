import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Platform,
    Linking,
    YellowBox,
    StatusBar,
    PermissionsAndroid,
    Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../screens/locales/stringsoflanguages';
//import our Custom menu component
import CustomMenuIcon from './custommenu/CustomMenuIcon';
import Eddystone from "@lg2/react-native-eddystone";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundJob from 'react-native-background-actions';
//import Geolocation from 'react-native-geolocation-service';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

var data = [];
var strdata = "", deviceId;

YellowBox.ignoreWarnings([""]);

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const taskRandom = async taskData => {
    if (Platform.OS === 'ios') {
        console.warn(
            'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
            'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
        );
    }
    await new Promise(async resolve => {
        // For loop with a delay
        const { delay } = taskData;
        for (let i = 0; BackgroundJob.isRunning(); i++) {

            try {
                setInterval(async () => {
                    if (strdata != "") {
                        //  console.log('str data interval===' + JSON.stringify(strdata))


                        Toast.show('Api calling', Toast.LONG);
                        console.log("strdata in api====" + JSON.stringify(strdata));


                        // this.callApi();

                    }


                }, 1000);
            } catch (e) {
                console.log(e);
            }

            //   console.log('Runned -> ', i);
            //  await BackgroundJob.updateNotification({taskDesc: 'Runned -> ' + i});
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'Health Band',
    taskDesc: 'Background Service running',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#0081C9',
    // linkingURI: 'exampleScheme://chat/jane',
    parameters: {
        delay: 1000,
    },
};


class DashboardActivity extends Component {
    playing = BackgroundJob.isRunning();

    constructor(props) {
        super(props);
        this.devicelist = this.devicelist.bind(this);
        this.onTelemetry = this.onTelemetry.bind(this);
        this.callApi = this.callApi.bind(this);
        this.dashboardCall = this.dashboardCall.bind(this);
        this.state = {
            data: [],
            date: '',
            url: 'http://process.trackany.live/asset_process/device_received_data_eddystone.php?SubscriberName=Zone/',
            devicelisturl: 'http://process.trackany.live/mobileapp/native/mBLEdevice.php?',
            dashboardurl: 'http://process.trackany.live/mobileapp/native/getNotifications.php?',
            temp: '',
            heartRate: '',
            oxygen: ''
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Dashboard'
    };



    componentDidMount() {

        
        deviceId = DeviceInfo.getUniqueId();
        console.log('device id ===' + deviceId)
        this.requestLocationPermission()
       // this.showLoading();
        // AsyncStorage.getItem('@mac_address').then((mac_address) => {
        //     if (mac_address) {
        //         this.setState({ mac_address: mac_address });
        //         console.log("mac data ====" + this.state.mac_address);
        //         this.dashboardCall();
        //     }
        // });


        AsyncStorage.getItem('@temp').then((temp) => {
            if (temp) {
                this.setState({ temp: temp });
                console.log("temp data ====" + this.state.temp);
            }
        });

        AsyncStorage.getItem('@heartRate').then((heartRate) => {
            console.log('heart rate===' + heartRate)
            if (heartRate) {
                this.setState({ heartRate: heartRate });
                console.log("heartRate ====" + this.state.heartRate);
            }
        });

        AsyncStorage.getItem('@oxygen').then((oxygen) => {
            if (oxygen) {
                this.setState({ oxygen: oxygen });
                console.log("oxygen ====" + this.state.oxygen);
            }
        });



        BluetoothStateManager.getState().then(bluetoothState => {
            switch (bluetoothState) {
                case 'Unknown':
                    console.log('Unknown ===');
                    break;
                case 'Resetting':
                    console.log('Resetting ===');
                    break;
                case 'Unsupported':
                    console.log('Unsupported ===');
                    break;
                case 'Unauthorized':
                    console.log('Unauthorized ===');
                    break;
                case 'PoweredOff':
                    console.log('powered off===');
                    break;
                case 'PoweredOn':
                    console.log('PoweredOn ===');
                    Eddystone.addListener('onTelemetryFrame', this.onTelemetry);
                    this.showLoading();
                    Toast.show('scanning start', Toast.LONG);
                    Eddystone.startScanning();


                    try {
                        setInterval(async () => {
                            if (strdata != "") {
                                this.callApi();
                                strdata = "";
                            }
                        }, 1000);
                    } catch (e) {
                        console.log(e);
                    }
                    break;

                default:
                    break;
            }
        });



        this.playing = !this.playing;
        if (this.playing) {
            try {
                console.log('Trying to start background service');
                BackgroundJob.start(taskRandom, options);

                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        }

        //  this.devicelist();



    }


 requestLocationPermission() 
    {
      try {
        const granted =  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
          //  'title': 'Example App',
           // 'message': 'Example App access to your location '

            
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
          alert("You can use the location");
        } else {
          console.log("location permission denied")
          alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }


    onTelemetry(telemetry) {

        //    console.log("telemetery data ==== " + JSON.stringify(telemetry))

        var str1 = telemetry.result.replace('ScanResult{', '')
        let str2 = str1.replace('mDevice=', '')
        let str3 = str2.replace(',', '')
        var str4 = str3.split(" ");
        var str5 = str4[0];


        var str6 = str4[21];
        var str7 = str6.replace('mRssi=', '');
        let rssi = str7.replace(',', '')


        this.hideLoading();


        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        var date_new = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;


        data.push({
            device_address: str5.toLowerCase(),
            rssi: rssi,
            dir: 1,
            temp: telemetry.tempnew,
            heart_rate: telemetry.heart_rate,
            oxygen: telemetry.oxygen,
            date: date_new
        });

        // console.log("data ==== " + JSON.stringify(data))



        this.setState({ data: data })

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {


                var tempinf = (parseInt(data[i].temp) * 9 / 5) + 32;

                console.log('temp in f====' + tempinf)

                this.setState({ temp: tempinf.toString() })
                this.setState({ heartRate: data[i].heart_rate })
                this.setState({ oxygen: data[i].oxygen })

                // console.log('heart rate state===' + this.state.heartRate)
                //  console.log('heart rate [i]]===' + data[i].heart_rate)

                AsyncStorage.setItem('@temp', tempinf.toString())
                AsyncStorage.setItem('@heartRate', data[i].heart_rate.toString())
                AsyncStorage.setItem('@oxygen', data[i].oxygen.toString())


                strdata = "|" + data[i].device_address + "," + data[i].rssi + "," + data[i].dir + "," + data[i].temp + "," + data[i].heart_rate + "," + data[i].oxygen + "," + data[i].date;
            }
        }


        // console.log("strdata ====" + JSON.stringify(strdata));

    }


    dashboardCall() {

        var url = this.state.dashboardurl + 'ble_mac=' + this.state.mac_address;
        console.log('url:' + url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();

                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    this.setState({ data: responseData });
                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }



    callApi() {
        Toast.show('Api calling', Toast.LONG);
        //  console.log("strdata in api====" + JSON.stringify(strdata));
        var url = this.state.url + deviceId;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': ''
            },
            body: strdata

        })
            .then(response => response)
            .then(responseData => {
                this.hideLoading();
                console.log('response object:', responseData);

            })
            .catch(error => {
                this.hideLoading();
                console.log('error:', error);
                //   console.error(error);
            })

            .done();
    }


    componentWillUnmount() {
        //Eddystone.stopScanning();
    }


    devicelist() {

        let formdata = new FormData();

        formdata.append('device_id', deviceId)
        formdata.append('token', '1234')

        console.log('form data===' + JSON.stringify(formdata))

        var that = this;
        var url = that.state.baseUrl;
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

                console.log("response json===" + JSON.stringify(responseJson.getBLEDetailsList))

                if (responseJson.getBLEDetailsList.length == '') {
                    this.setState({ isnoDataVisible: true })

                } else {
                    this.setState({ isnoDataVisible: false })
                    this.setState({ data: responseJson.getBLEDetailsList });

                }

            }).catch(err => {
                this.hideLoading();
                console.log(err)
            })

    }

    /**
  * Toggles the background task
  */
    toggleBackground = async () => {
        this.playing = !this.playing;
        if (this.playing) {
            try {
                console.log('Trying to start background service');
                await BackgroundJob.start(taskRandom, options);

                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        } else {
            console.log('Stop background service');
            await BackgroundJob.stop();
        }
    };

    render() {
        return (
            <>

                <SafeAreaView style={styles.container}>

                    <View style={styles.headerView}>
                        <View

                            style={{ alignItems: 'center', justifyContent: 'center', flex: .2 }}>



                        </View>

                        <TouchableOpacity
                            onPress={this.toggleBackground}
                            style={{ alignItems: 'center', justifyContent: 'center', flex: .6 }}>

                            {/* <Text style={styles.screentitle}>{deviceId}</Text> */}

                            <Text style={styles.screenHeading}>Smart Wristband</Text>


                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .2 }}>


                            <CustomMenuIcon
                                //Menu Text
                                menutext="Menu"
                                //Menu View Style
                                menustyle={{
                                    marginRight: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                                //Menu Text Style
                                textStyle={{
                                    color: 'white',
                                }}
                                //Click functions for the menu items
                                option1Click={() => {

                                    this.props.navigation.navigate('AddBluetoothDevice')


                                }}
                                option2Click={() => {
                                    this.props.navigation.navigate('BluetoothDeviceList')
                                }}

                            />

                        </TouchableOpacity>

                    </View>



                    <View style={styles.container}>

                        <View style={styles.row}>
                            <View style={styles.tempbox}>

                                <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#F5AB3F', alignItems: 'center', alignSelf: 'center' }}>


                                    <Text style={styles.boxtitle}>Temprature</Text>


                                </View>

                                <View style={{
                                    flex: .8, flexDirection: 'row', backgroundColor: '#F29600', borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20
                                }}>


                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>


                                        <Image source={require('../images/thermometer.png')}
                                            style={styles.iconstyle} />

                                    </View>




                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>


                                        <Text style={styles.screentitle}>{this.state.temp} F</Text>



                                    </View>

                                </View>



                            </View>

                        </View>

                        <View style={styles.row}>
                            <View style={styles.heartbox}>

                                <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#F67A96', alignItems: 'center', alignSelf: 'center' }}>


                                    <Text style={styles.boxtitle}>Heart Rate</Text>


                                </View>

                                <View style={{
                                    flex: .8, flexDirection: 'row', backgroundColor: '#EE3364', borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20
                                }}>


                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>



                                        <Image source={require('../images/cardiogram.png')}
                                            style={styles.iconstyle} />


                                    </View>

                                    {/* <View
                                    style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'white',
                                    }}
                                /> */}





                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>




                                        <Text style={styles.screentitle}>{this.state.heartRate} bpm</Text>

                                    </View>

                                </View>



                            </View>

                        </View>

                        <View style={styles.row}>
                            <View style={styles.blodbox}>

                                <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#FD835E', alignItems: 'center', alignSelf: 'center' }}>


                                    <Text style={styles.boxtitle}>Blood Oxygen SPO2</Text>


                                </View>
                                <View style={{
                                    flex: .8, flexDirection: 'row', backgroundColor: '#FB6230', borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20
                                }}>


                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>



                                        <Image source={require('../images/blood-drop.png')}
                                            style={styles.iconstyle} />

                                    </View>

                                    {/* <View
                                    style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'white',
                                    }}
                                />

 */}


                                    <View style={{ flex: .5, flexDirection: 'column', justifyContent: 'center' }}>

                                        <Text style={styles.screentitle}>{this.state.oxygen}%</Text>



                                    </View>

                                </View>





                            </View>

                        </View>


                    </View>




                    <View style={styles.tabStyle}>

                        <TouchableOpacity style={styles.tabButtonStyle}
                            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                            <Image source={require('../images/home_active.png')}
                                style={styles.StyleHomeTab} />

                            <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.Home}</Text>

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

                            <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.settings}</Text>


                        </TouchableOpacity>






                    </View>

                </SafeAreaView>
            </>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F9FE',
        flexDirection: 'column'
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
    thermometer_box: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        flex: .30,
        backgroundColor: '#F29600',
        alignSelf: "center",
        flexDirection: "column",
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
        tintColor: '#0081C9',
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
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#0081C9'
    },
    screentitle: {
        color: "white",
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    screenHeading: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
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
    videoBottomView: {
        height: 50,
        width: 400,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    textblacktextstyle: {
        fontSize: 15,
        color: '#1B273E',
        fontWeight: 'bold',
    },
    textpinktextstyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FB3954',
        textAlign: 'right',
        marginRight: 3
    },
    playiconstyle: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    box: {
        flex: 1,
        height: 100,
        backgroundColor: '#333',
    },
    tempbox: {
        backgroundColor: '#F29600',
        flexDirection: 'column',
        flex: 1,
        margin: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    heartbox: {
        backgroundColor: '#EE3364',
        flex: 1,
        margin: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    blodbox: {
        backgroundColor: '#FB6230',
        flex: 1,
        margin: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    boxtitle: {
        color: "white",
        fontSize: 15,
        marginLeft: 10,
        textAlign: 'center'
    },
    iconstyle: {
        height: 70,
        width: 70,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    verticalline: {
        backgroundColor: 'white',
    },
    o2title: {
        color: "white",
        fontSize: 100,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    o2text: {
        color: "white",
        fontSize: 20,
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 40
    },

});

export default DashboardActivity;

