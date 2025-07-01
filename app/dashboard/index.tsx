import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function DashboardScreen() {
  const { user } = useUser();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Dashboard</Text>
      <Text style={styles.welcome}>Welcome, {user?.name || 'User'} 👋</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>📦 Orders Today</Text>
        <Text style={styles.cardValue}>14</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>💰 Total Sales</Text>
        <Text style={styles.cardValue}>₱42,000</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>🕒 Monthly Sales</Text>
        <Text style={styles.cardValue}>₱152,000</Text>
      </View>

      <View style={styles.nav}>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Feather name="user" size={22} color="#aaa" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/dashboard')}>
          <Feather name="home" size={22} color="#3D8BFD" />
          <Text style={[styles.navLabel, { color: '#3D8BFD' }]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/customer')}>
          <Feather name="users" size={22} color="#aaa" />
          <Text style={styles.navLabel}>Customers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  pageTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcome: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  cardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1E1E1E',
    marginTop: 16,
  },
  navLabel: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
