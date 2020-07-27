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


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={styles.listItemStyle}>
                <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={styles.circle}>


                            <Text style={{ color: 'white', textAlign: 'center', fontSize: RFPercentage(1.9), fontWeight: 'bold', justifyContent: 'center' }}>+1</Text>


                        </View>

                        <View style={{ flex: .70, flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }}>

                            <Text style={{ color: 'black', fontSize: RFValue(14, 580) }}>{item.title}</Text>
                        </View>

                    </View>

                    <Text style={{ color: '#808080', fontSize: RFValue(12, 580) }}>{item.name}</Text>
                    <Text style={{ color: "#949494", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.time}</Text>
                </View>

            </View>
        </View>
    );
}


class NotificationActivity extends Component {

    constructor(props) {
        super(props);
        //  this.videoList = this.videoList.bind(this);
        this.state = {
            //    baseUrl: 'https://digimonk.co/fitness/api/Api/videoList',
            data: [
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "01/05/2020 12:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "02/05/2020 1:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "03/05/2020 2:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "04/05/2020 3:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "05/05/2020 4:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "06/05/2020 5:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "07/05/2020 6:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "08/05/2020 7:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "09/05/2020 8:00 AM",
                },
                {
                    "title": "BE CAREFUL",
                    "name": "you increased your interaction in the last hour by 1. ",
                    "time": "10/05/2020 9:00 AM",
                },
            ]
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Notification'
    };

    componentDidMount() {
        //  this.videoList();

    }

    // videoList() {

    //     var url = this.state.baseUrl;
    //     console.log('url:' + url);
    //     fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     //   body: JSON.stringify({
    //     //     secure_pin: 'digimonk',
    //     //     customer_id: this.state.userId
    //     //   }),
    //     })
    //       .then(response => response.json())
    //       .then(responseData => {
    //         this.hideLoading();
    //         if (responseData.status == '0') {
    //           alert(responseData.message);
    //         } else {
    //           this.setState({ data: responseData.data});
    //         }

    //         console.log('response object:', responseData);
    //       })
    //       .catch(error => {
    //         this.hideLoading();
    //         console.error(error);
    //       })

    //       .done();
    //   }

    actionOnRow(item) {

        // this.props.navigation.navigate('QuestionLogDetail', {
        //   item: item,
        //   question_id: item.question_id
        // })

        // console.log('Selected Item :', item);

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                    >

                        <Text style={styles.screentitle}>Smart Wristband</Text>

                    </TouchableOpacity>

                </View>



                {/* 
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refresh}
                            onRefresh={() => this.onRefresh()}
                            tintColor='#FFC33B'
                        />
                    }> */}

                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item} />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.time}
                    ListEmptyComponent={this.ListEmpty}
                />

                {/* </ScrollView> */}

                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_inactive.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

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
    listItem: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
    },
    bottomactivetextstyle: {
        color: "#FB3954",
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
        tintColor: '#0081C9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomnotificationtextstyle: {
        color: "#0081C9",
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
    },
    listItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        margin: 10,
        elevation: 20,
        shadowColor: 'grey',
        borderRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1
    },
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
    circle: {
        position: 'relative',
        width: 50,
        height: 50,
        justifyContent: 'center',
        borderRadius: 150 / 2,
        backgroundColor: '#F29600',
    },
});

export default NotificationActivity;

