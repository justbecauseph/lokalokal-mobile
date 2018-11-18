/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity,
    Linking,
    Image,
    ActivityIndicator
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";
import {
    ThemeProvider,
    Button,
    Text,
    Divider,
    ListItem,
    Header,
    Input,
    Card,
    Avatar,
    SearchBar
} from "react-native-elements";
import {Icon} from "react-native-elements";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false
        };
    }

    componentDidMount() {
        var myRequest = new Request('https://lokalocal.ph/api/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic dXNlckBsb2thbG9jYWwucGg6dXNlcg==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let list = [];

        fetch(myRequest)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View>
                <Header
                    height
                    centerComponent={{
                        text: "LOFT x LocaLokal",
                        style: {color: "#fff", fontSize: 18}
                    }}
                    backgroundColor="black"
                />
                <View style={{padding: 10}}>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                        h1
                    >
                        {this.state.dataSource.wallet.amount}
                    </Text>
                    <Text style={{textAlign: "center", color: "black"}}>Points</Text>
                </View>
                <View>
                    {this.state.dataSource.transactions.map((l, i) => (
                        <ListItem
                            key={i}
                            title={l.sku ? l.sku.name : 'Topup!'}
                            subtitle={l.amount}
                            subtitleStyle={{fontWeight: "normal", fontSize: 12}}
                            onPress={() => this.props.navigation.navigate("Details")}
                            style={{
                                paddingBottom: 20,
                                paddingTop: 20
                            }}
                            badge={{
                                value: l.type,
                                textStyle: {color: "white"},
                                containerStyle: {marginTop: -20}
                            }}
                            containerStyle={{
                                borderBottomWidth: 0.25
                            }}
                            hideChevron={true}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View>
                <Image
                    style={{width: 480, height: 360}}
                    source={{
                        uri:
                            "https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/10/28/59f4f0107ab10.jpeg"
                    }}
                />
                <View style={{justifyContent: "center", padding: 10}}>
                    <Text h4 style={{textAlign: "center"}}>
                        Item Name
                    </Text>
                    <Text style={{textAlign: "center"}}>30 Points</Text>
                </View>
                <View style={{flexDirection: "row", height: 130, padding: 20}}>
                    <Text style={{fontSize: 16}}>
                        It turns out that a few thousands random coffees can be the key to
                        breaking ... Can a few bucks spent on a cup of coffee change the
                        culture of a company?
                    </Text>
                </View>
                <View style={{flexDirection: "row-reverse"}}>
                    <Button
                        title="Redeem"
                        buttonStyle={{
                            backgroundColor: "black",
                            width: 150,
                            height: 45,
                            borderColor: "transparent",
                            borderRadius: 10,
                            paddingTop: 10
                        }}
                        onPress={() => this.props.navigation.navigate("QR")}
                    />
                </View>
            </View>
        );
    }
}

class QRScreen extends Component {
    onSuccess(e) {
        Linking.openURL(e.data).catch(err =>
            console.error("An error occured", err)
        );
    }

    render() {
        return (
            <View>
                <Header
                    height
                    centerComponent={{
                        text: "Scan QR",
                        style: {color: "#fff", fontSize: 18}
                    }}
                    backgroundColor="black"
                />
                <View>
                    <QRCodeScanner
                        onRead={this.onSuccess.bind(this)}
                        reactivate={true}
                        showMarker={true}
                        markerStyle={{borderColor: "white"}}
                        bottomContent={
                            <Text
                                style={{textAlign: "center", fontSize: 16, color: "white"}}
                            >
                                Align the QR Code to the markers
                            </Text>
                        }
                    />
                </View>
            </View>
        );
    }
}

class ShopScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            refreshing: false
        };
    }

    componentDidMount() {
        var myRequest = new Request('https://lokalocal.ph/api/skus', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic dXNlckBsb2thbG9jYWwucGg6dXNlcg==',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let list = [];

        fetch(myRequest)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <SearchBar
                    platform="android"
                    round
                    placeholder="Search for Rewards"
                    inputContainerStyle={{
                        backgroundColor: "transparent",
                        borderColor: "rgba(45, 161, 219, 1)"
                    }}
                    inputStyle={{fontSize: 14}}
                    containerStyle={{backgroundColor: "black"}}
                />
                {this.state.dataSource.map((l, i) => (
                    <ListItem
                        key={i}
                        title={l.name}
                        subtitle={l.desc}
                        subtitleStyle={{fontWeight: "normal", fontSize: 12}}
                        onPress={() => this.props.navigation.navigate("Details")}
                        hideChevron={true}
                        containerStyle={{
                            borderBottomWidth: 0.25
                        }}
                    />
                ))}
            </View>
        );
    }
}

AppRegistry.registerComponent("default", () => QRScreen);

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="home" size={35} color={tintColor}/>
                )
            }
        },
        Details: {
            screen: DetailsScreen,
            navigationOptions: {
                tabBarLabel: "Details",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="details" size={35} color={tintColor}/>
                )
            }
        },
        QR: {
            screen: QRScreen,
            navigationOptions: {
                tabBarLabel: "Scan QR",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="photo-camera" size={35} color={tintColor}/>
                )
            }
        },
        Shop: {
            screen: ShopScreen,
            navigationOptions: {
                tabBarLabel: "Shop",
                tabBarIcon: ({tintColor}) => (
                    <Icon name="shopping-cart" size={35} color={tintColor}/>
                )
            }
        }
    },
    {
        initialRouteName: "Home",
        tabBarOptions: {
            activeTintColor: "black",
            inactiveTintColor: "gray",
            style: {paddingTop: 10}
        }
    }
);

export default createAppContainer(TabNavigator);
