/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Linking,
  Image
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
import { Icon } from "react-native-elements";

class HomeScreen extends React.Component {
  render() {
    const list = [
      {
        name: "Coffee",
        description: "Best brew there is... probably."
      },
      {
        name: "Espresso",
        description: "IDK what this is but they seem to rave about it."
      },
      {
        name: "Coffee 2",
        description: "Best brew there is... probably."
      },
      {
        name: "Espresso 2",
        description: "IDK what this is but they seem to rave about it."
      }
    ];
    return (
      <View>
        <Header
          height
          centerComponent={{
            text: "LOFT x LokaLokal",
            style: { color: "#fff", fontSize: 18 }
          }}
          backgroundColor="black"
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              textAlign: "center"
            }}
            h1
          >
            500
          </Text>
          <Text style={{ textAlign: "center" }}>Points</Text>
        </View>
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={l.description}
            subtitleStyle={{ fontWeight: "normal", fontSize: 12 }}
            onPress={() => this.props.navigation.navigate("Details")}
            style={{
              paddingBottom: 20,
              paddingTop: 20
            }}
            badge={{
              value: "Credit",
              textStyle: { color: "white" },
              containerStyle: { marginTop: -20 }
            }}
            hideChevron={true}
          />
        ))}
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Header
          height
          centerComponent={{
            text: "LOFT x LokaLokal",
            style: { color: "#fff", fontSize: 18 }
          }}
          backgroundColor="black"
        />
        <Image
          style={{ width: 480, height: 360 }}
          source={{
            uri:
              "https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/10/28/59f4f0107ab10.jpeg"
          }}
        />
        <View style={{ justifyContent: "center", padding: 10 }}>
          <Text h4 style={{ textAlign: "center" }}>
            Item Name
          </Text>
          <Text style={{ textAlign: "center" }}>30 Points</Text>
        </View>
        <View style={{ flexDirection: "row", height: 100, padding: 20 }}>
          <Text style={{ fontSize: 14 }}>
            It turns out that a few thousands random coffees can be the key to
            breaking ... Can a few bucks spent on a cup of coffee change the
            culture of a company?
          </Text>
        </View>
        <View style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            title="Redeem"
            buttonStyle={{
              backgroundColor: "black",
              width: 150,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 10
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
            style: { color: "#fff", fontSize: 18 }
          }}
          backgroundColor="black"
        />
        <Text style={{ textAlign: "center" }}>
          Scan the QR Code below to score awesome coffee!
        </Text>
        <View>
          <QRCodeScanner onRead={this.onSuccess.bind(this)} />
        </View>
      </View>
    );
  }
}

class ShopScreen extends Component {
  render() {
    const list = [
      {
        name: "Coffee",
        description: "Best brew there is... probably."
      },
      {
        name: "Espresso",
        description: "IDK what this is but they seem to rave about it."
      },
      {
        name: "Coffee 2",
        description: "Best brew there is... probably."
      },
      {
        name: "Espresso 2",
        description: "IDK what this is but they seem to rave about it."
      }
    ];
    return (
      <View>
        <Header
          height
          centerComponent={{
            text: "Shop",
            style: { color: "#fff", fontSize: 18 }
          }}
          backgroundColor="black"
        />
        <SearchBar
          platform="android"
          round
          placeholder="Search for Rewards"
          inputContainerStyle={{
            backgroundColor: "transparent",
            borderColor: "rgba(45, 161, 219, 1)"
          }}
          inputStyle={{ fontSize: 14 }}
          containerStyle={{ backgroundColor: "black" }}
        />
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={l.description}
            subtitleStyle={{ fontWeight: "normal" }}
            onPress={() => this.props.navigation.navigate("Details")}
            hideChevron={true}
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
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={35} color={tintColor} />
        )
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        tabBarLabel: "Details",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="details" size={35} color={tintColor} />
        )
      }
    },
    QR: {
      screen: QRScreen,
      navigationOptions: {
        tabBarLabel: "Scan QR",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="photo-camera" size={35} color={tintColor} />
        )
      }
    },
    Shop: {
      screen: ShopScreen,
      navigationOptions: {
        tabBarLabel: "Shop",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="shopping-cart" size={35} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray",
      style: { paddingTop: 10 }
    }
  }
);

export default createAppContainer(TabNavigator);
