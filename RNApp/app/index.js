import React, { Component } from 'react';
import Meteor from 'react-native-meteor';
import { StackNavigator, TabNavigator } from 'react-navigation';

import settings from './config/settings';
import Home from './screens/Home';

Meteor.connect(settings.SERVER_URL);

const HomeTab = StackNavigator({
  Home: { screen: Home },
});

// const ProfileTab

const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeTab },
  Home: { screen: HomeTab },
});

export default MainScreenNavigator;
