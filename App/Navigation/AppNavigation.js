import React from 'react';
import { Text, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import TabBarBadge from '../Containers/TabBarBadge';

import { Colors } from '../Themes'
import LaunchScreen from '../Containers/LaunchScreen';
import Home from '../Containers/Home';
import Search from '../Containers/Home/Search';
import Product from '../Containers/Product';
import Store from '../Containers/Store';
import Cart from '../Containers/Cart';
import Profile from '../Containers/Profile';
import Password from '../Containers/Profile/Password';
import Checkout from '../Containers/Checkout';
import styles from './Styles/NavigationStyles'


const HomeNav = StackNavigator({
  Home: {
    screen: Home
  },
  Search: {
    screen: Search
  },
  Product: {
    screen: Product
  },
  Store: {
    screen: Store
  },
},{
  mode: 'card',
  headerMode: 'none'
})

const ProfileNav = StackNavigator({
  Profile: {
    screen: Profile
  },
  Password: {
    screen: Password
  }
},{
  mode: 'card',
  headerMode: 'none'
})

const Tabs = TabNavigator({
  Home: {
    screen: HomeNav,
    navigationOptions: {
      tabBarLabel: 'Test',
      tabBarIcon: ({ tintColor, focused }) => <Icon size={30} name={focused ? 'ios-home' : 'ios-home-outline'} color={tintColor} />
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor, focused }) => 
      (
        <TabBarBadge tintColor={tintColor} focused={focused} />
      )
    })
  },
  Profile: {
    screen: ProfileNav,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => <Icon size={30} name={focused ? 'ios-contact' : 'ios-contact-outline'} color={tintColor} />
    }
  }
},{
 tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  //backBehavior: 'none',
  tabBarOptions: {
    activeTintColor: Colors.app,
    inactiveTintColor: Colors.charcoal,
    showLabel: false,
    showIcon: true, //setting for android
    pressColor: Colors.app,
    iconStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: Platform.OS==='ios'?'auto': 40,
      height: Platform.OS==='ios'?'auto': 30,
    },
    style: {
      backgroundColor: 'rgba(255,255,255, 0.97)',
      borderTopColor: "transparent",
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // bottom: 0,
      // zIndex: 2,
    },
    tabStyle: {
      //borderTopColor: "transparent",
      elevation: 1,
      //backgroundColor: 'white',
      padding: 3,
      height: Platform.OS==='ios'?'auto': 45,
      //opacity: 0.98,
    },
    indicatorStyle: {
      backgroundColor: 'transparent', //transparent bottom line for android
    },
  },
  
})

const Root = StackNavigator({
  Tabs: {
    screen: Tabs
  },
  Checkout: {
    screen: Checkout
  },
},{
  mode: 'modal',
  headerMode: 'none'
})

export default Root
