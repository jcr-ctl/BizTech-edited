import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './context/UserContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="light" />
        <Tabs
          screenOptions={{
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#fff',
            tabBarStyle: { backgroundColor: '#1E1E1E', borderTopColor: '#333' },
            tabBarActiveTintColor: '#3D8BFD',
            tabBarInactiveTintColor: '#8A8A8A',
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="customer"
            options={{
              title: 'Customers',
              tabBarIcon: ({ color, size }) => (
                <Feather name="users" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Feather name="user" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </UserProvider>
    </SafeAreaProvider>
  );
}
