import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import type { RootStackParamList } from '../_layout';

//screen dimentsions
const {width} = Dimensions.get('window');

const customersData = [
  {
    id: 'ID-0001',
    name: 'Tired Person #1',
    email: 'tired1@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$69.42',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
  },
  {
    id: 'ID-0002',
    name: 'Tired Person #2',
    email: 'tired2@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$420.69',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
  },
  {
    id: 'ID-0003',
    name: 'Tired Person #3',
    email: 'tired3@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$1',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
  },
];

type CustomerDetailRouteProp = RouteProp<RootStackParamList, 'CustomerDetail'>;


export default function CustomerDetailScreen(){
    const route = useRoute<CustomerDetailRouteProp>();
    const { id } = route.params;
    const customer = customersData.find(c => c.id === id);

    //dummy data for chart
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [20,45,28,80,99,43],
                strokeWidth: 2,
            },
        ],
    };
    
    if (!customer) return <Text style = {{color: '#fff'}}>Customer not Found</Text>;

    return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{customer.name}</Text>
      <Text style={styles.label}>Email: <Text style={styles.value}>{customer.email}</Text></Text>
      <Text style={styles.label}>Phone: <Text style={styles.value}>{customer.phone}</Text></Text>
      <Text style={styles.label}>Purchases: <Text style={styles.value}>{customer.purchases}</Text></Text>
      <Text style={styles.label}>Orders: <Text style={styles.value}>{customer.orderCount}</Text></Text>
      <Text style={styles.label}>Address: <Text style={styles.value}>{customer.address}</Text></Text>
      <Text style={styles.chartTitle}>Purchases Over Time</Text>
      <LineChart
        data={chartData}
        width={width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#121212',
          backgroundGradientFrom: '#121212',
          backgroundGradientTo: '#1E1E1E',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(61, 139, 253, ${opacity})`,
          labelColor: () => '#fff',
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { color: '#8A8A8A', fontSize: 14, marginTop: 8 },
  value: { color: '#fff', fontWeight: 'bold' },
  chartTitle: { color: '#fff', fontSize: 18, marginTop: 24, marginBottom: 8 },
  chart: { borderRadius: 8 },
});


