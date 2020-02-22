
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import OnBoardingScreen from './components/onBoardingScreen';
import HomeScreen from './components/homeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryDetailsScreen from './components/categoryDetailsScreen';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from '../src/reducers/reducer';
import ProductDetailsScreen from './components/productDetailsScreen';
import SearchProductsScreen from './components/searchProductsScreen';
import ShoppingCartScreen from './components/shoppingCartScreen';

const store = createStore(reducer);

const Stack = createStackNavigator();
class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="BoardingScreen" component={OnBoardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryDetailsScreen" component={CategoryDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchProductsScreen" component={SearchProductsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
