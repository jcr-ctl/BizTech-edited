import { StyleSheet, Text, View } from 'react-native';
import { useUser } from './context/UserContext';

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
      </View>
      <Text style={styles.name}>{user?.name || 'Unnamed User'}</Text>
      <Text style={styles.status}>Status: Active</Text>
      <Text style={styles.email}>Email: {user?.email || 'not set'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  avatar: {
    backgroundColor: '#3A3A3A',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    color: '#8A8A8A',
    fontSize: 14,
    marginBottom: 8,
  },
  email: {
    color: '#ccc',
    fontSize: 14,
  },
});
