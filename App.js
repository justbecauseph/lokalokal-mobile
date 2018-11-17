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
          centerComponent={{
            text: "LOFT x LokaLokal",
            style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
          }}
          backgroundColor="rgba(45, 161, 219, 1)"
        />
        <Text style={{ textAlign: "center" }} h1>
          500
        </Text>
        <Text style={{ textAlign: "center" }} h4>
          Points
        </Text>
        <Divider style={{ backgroundColor: "blue" }} />
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={l.description}
            subtitleStyle={{ fontWeight: "normal" }}
            onPress={() => this.props.navigation.navigate("Details")}
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
        <Image
          style={{ width: 300, height: 200 }}
          source={{
            uri:
              "https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/10/28/59f4f0107ab10.jpeg"
          }}
        />
        <Text h4 style={{ textAlign: "center" }}>
          Item Name
        </Text>
        <Text style={{ textAlign: "center" }}>Costs 30 Points</Text>
        <Text>Item Details Lorem Ipsum Dolor</Text>
        <Button
          title="Maybe Later"
          buttonStyle={{
            backgroundColor: "rgba(45, 161, 219, 1)",
            width: 150,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
        <Button
          title="Pay Now"
          icon={<Icon name="payment" size={15} color="white" />}
          buttonStyle={{
            backgroundColor: "rgba(45, 161, 219, 1)",
            width: 150,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
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
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={{ textAlign: "center" }}>
            Scan the QR Code below to score awesome coffee!
          </Text>
        }
      />
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
        <SearchBar
          placeholder="Search for Rewards"
          containerStyle={{ backgroundColor: "rgba(45, 161, 219, 1)" }}
        />
        {list.map((l, i) => (
          <ListItem
            key={i}
            title={l.name}
            subtitle={l.description}
            subtitleStyle={{ fontWeight: "normal" }}
            onPress={() => this.props.navigation.navigate("Details")}
          />
        ))}
      </View>
    );
  }
}

AppRegistry.registerComponent("default", () => QRScreen);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    QR: QRScreen,
    Shop: ShopScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(TabNavigator);
