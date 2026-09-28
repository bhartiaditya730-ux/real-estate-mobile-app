import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyListingScreen from '../screens/PropertyListingScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';
import PropertyGalleryScreen from '../screens/PropertyGalleryScreen';
import { RootStackParamList } from './types';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="PropertyListing"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="PropertyListing" component={PropertyListingScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="PropertyGallery" component={PropertyGalleryScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
