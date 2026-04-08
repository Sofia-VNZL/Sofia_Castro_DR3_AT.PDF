import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import ProductsScreen from './screens/products';
import ProductDetailScreen from './screens/details';
import { CartProvider } from './context/CartContext';
import CartScreen from './screens/cart';
import ProfileScreen from './screens/profile';
import OrdersScreen from './screens/orders';
import MapScreen from './screens/map';
import RestaurantDetailScreen from './screens/restaurantDetails';
import CheckoutScreen from './screens/checkout';
import { ThemeProvider } from './context/ThemeContext';
import SettingsScreen from './screens/settings';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <ThemeProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen 
                    {...props} 
                    onLogin={(email) => { 
                      setUserEmail(email); 
                      setIsLoggedIn(true); 
                    }} 
                  />
                )}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                
                <Stack.Screen name="Profile">
                  {(props) => (
                    <ProfileScreen 
                      {...props} 
                      userEmail={userEmail} 
                      onLogout={() => {
                        setIsLoggedIn(false);
                        setUserEmail('');
                      }} 
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ThemeProvider>
  );
}