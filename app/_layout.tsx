import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './context/UserContext';
import CustomerListScreen from './customer';
import CustomerDetailScreen from './customer/id';

export type RootStackParamList = {
  CustomerList: undefined;
  CustomerDetail: { id: string; name?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="light" />
        <Stack.Navigator
          id={undefined} // if required by your types, otherwise remove
          initialRouteName="CustomerList"
          screenOptions={{
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            cardStyle: { backgroundColor: '#121212' }
          }}
        >
          <Stack.Screen 
            name="CustomerList" 
            component={CustomerListScreen} 
            options={{ title: 'Customers' }} 
          />
          <Stack.Screen 
            name="CustomerDetail" 
            component={CustomerDetailScreen}
            options={({ route }) => ({ title: route.params?.name || 'Customer Details' })}
          />
        </Stack.Navigator>
      </UserProvider>
    </SafeAreaProvider>
  );
}