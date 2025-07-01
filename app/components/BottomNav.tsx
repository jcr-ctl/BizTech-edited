import { Feather } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.nav}>
      <NavButton label="Profile" icon="user" route="/profile" pathname={pathname} router={router} />
      <NavButton label="Dashboard" icon="home" route="/dashboard" pathname={pathname} router={router} />
      <NavButton label="Customers" icon="users" route="/customer" pathname={pathname} router={router} />
    </View>
  );
}

function NavButton({ label, icon, route, pathname, router }) {
  const isActive = pathname === route;
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.button}>
      <Feather name={icon} size={22} color={isActive ? '#3D8BFD' : '#8A8A8A'} />
      <Text style={[styles.label, { color: isActive ? '#3D8BFD' : '#8A8A8A' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1E1E1E',
    borderTopColor: '#333',
    borderTopWidth: 1,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
