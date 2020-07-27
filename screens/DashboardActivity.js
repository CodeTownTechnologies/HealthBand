import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../screens/locales/stringsoflanguages';



class DashboardActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {

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


    }

    render() {
        return (
            <SafeAreaView style={styles.container}>


                <View style={styles.headerView}>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                        <Text style={styles.screentitle}>Smart Wristband</Text>

                    </TouchableOpacity>

                </View>



                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={styles.tempbox}>

                            <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#F5AB3F', alignItems: 'center', alignSelf: 'center' }}>


                                <Text style={styles.boxtitle}>Live Temprature</Text>


                            </View>

                            <View style={{ flex: .8, flexDirection: 'row', width: '100%', backgroundColor: '#F29600' }}>


                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>


                                    <Text style={styles.screentitle}>MAX</Text>
                                    <Text style={styles.screentitle}>89.60</Text>



                                </View>

                                <View
                                    style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'white',
                                    }}
                                />



                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>

                                    <Text style={styles.screentitle}>MIN</Text>
                                    <Text style={styles.screentitle}>89.60</Text>



                                </View>

                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>


                                    <Image source={require('../images/thermometer.png')}
                                        style={styles.iconstyle} />


                                </View>

                            </View>



                        </View>

                    </View>

                    <View style={styles.row}>
                        <View style={styles.heartbox}>

                            <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#F67A96', alignItems: 'center', alignSelf: 'center' }}>


                                <Text style={styles.boxtitle}>Live Heart Rate(8 PM)</Text>


                            </View>

                            <View style={{ flex: .8, flexDirection: 'row', width: '100%', backgroundColor: '#EE3364' }}>


                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>


                                    <Text style={styles.screentitle}>MAX</Text>
                                    <Text style={styles.screentitle}>64</Text>



                                </View>

                                <View
                                    style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'white',
                                    }}
                                />



                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>

                                    <Text style={styles.screentitle}>MIN</Text>
                                    <Text style={styles.screentitle}>64</Text>



                                </View>

                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>


                                    <Image source={require('../images/cardiogram.png')}
                                        style={styles.iconstyle} />


                                </View>

                            </View>



                        </View>

                    </View>

                    <View style={styles.row}>
                        <View style={styles.blodbox}>

                            <View style={{ flex: .2, flexDirection: 'row', width: '100%', backgroundColor: '#FD835E', alignItems: 'center', alignSelf: 'center' }}>


                                <Text style={styles.boxtitle}>Live Blood Oxygen (SPO2)%</Text>


                            </View>
                            <View style={{ flex: .8, flexDirection: 'row', width: '100%', backgroundColor: '#FB6230' }}>


                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>


                                    <Text style={styles.screentitle}>MAX</Text>
                                    <Text style={styles.screentitle}>95%</Text>



                                </View>

                                <View
                                    style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'white',
                                    }}
                                />



                                <View style={{ flex: .33, flexDirection: 'column', justifyContent: 'center' }}>

                                    <Text style={styles.screentitle}>MIN</Text>
                                    <Text style={styles.screentitle}>95%</Text>



                                </View>

                                <View style={{ flex: .33, flexDirection: 'row', justifyContent: 'center' }}>


                                    {/* <Image source={require('../images/cardiogram.png')}
                                        style={styles.iconstyle} /> */}

                                    <Text style={styles.o2title}>0</Text>
                                    <Text style={styles.o2text}>2</Text>

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
                        onPress={() => { this.props.navigation.navigate('MyVideos') }}>

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
    },
    heartbox: {
        backgroundColor: '#EE3364',
        flex: 1
    },
    blodbox: {
        backgroundColor: '#FB6230',
        flex: 1
    },
    boxtitle: {
        color: "white",
        fontSize: 20,
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
        justifyContent:'center',
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

