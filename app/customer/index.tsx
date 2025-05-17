import React, { useState } from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useUser } from '../context/UserContext';

const customersList = [
  {
    id: 'ID-0001',
    name: 'Tired Person #1',
    email: 'tired1@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$69.42',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
    expanded: false
  },
  {
    id: 'ID-0002',
    name: 'Tired Person #2',
    email: 'tired2@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$420.69',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
    expanded: false
  },
  {
    id: 'ID-0003',
    name: 'Tired Person #3',
    email: 'tired3@ineedsomesleep.com',
    phone: '+62 819 1314 1435',
    purchases: '$1',
    orderCount: 10,
    address: '308 Negra Arroyo Lane, Albuquerque, New Mexico 87104',
    expanded: false
  },
]


export default function CustomerListScreen() {
  const [customers, setCustomers] = useState(customersList);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { user } = useUser();

  const toggleExpand = (id) => {
    setCustomers(customers.map(customer => 
      customer.id === id 
        ? { ...customer, expanded: !customer.expanded } 
        : customer
    ));
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerItem}>
      <TouchableOpacity 
        style={styles.customerHeader}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.checkboxContainer}>
          <View style={styles.checkbox} />
        </View>
        <View style={styles.customerBasicInfo}>
          <Text style={styles.customerId}>{item.id}</Text>
          <Text style={styles.customerName}>{item.name}</Text>
        </View>
        <Feather 
          name={item.expanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#8A8A8A" 
        />
      </TouchableOpacity>
      
      {item.expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact</Text>
            <Text style={styles.infoValue}>{item.email}</Text>
          </View>
          <Text style={styles.infoValue}>{item.phone}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Purchases</Text>
            <Text style={styles.infoValue}>{item.purchases}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order</Text>
            <Text style={styles.infoValue}>{item.orderCount} Order</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>{item.address}</Text>
          </View>
          
          <View style={styles.actionRow}>
            <Text style={styles.infoLabel}>Action</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="eye" size={18} color="#8A8A8A" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress = {() => router.push({
                  pathname: "/customer/id",
                  params: {id: item.id, name: item.name}
                })}
              >
                <Feather name="eye" size={18} color="#8A8A8A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={18} color="#8A8A8A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="trash-2" size={18} color="#8A8A8A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfoContainer}>
          {user?.avatar ? (
            <Image source={user.avatar} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>{user?.name || 'Guy Hawkins'}</Text>
            <Text style={styles.userStatus}>Active</Text>
          </View>
        </View>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="menu" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Customers</Text>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Dashboard</Text>
          <Text style={styles.breadcrumbSeparator}>›</Text>
          <Text style={styles.breadcrumbActive}>Customers</Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#8A8A8A" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for id, name, product..."
          placeholderTextColor="#8A8A8A"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={16} color="#FFFFFF" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.exportButton}>
          <Feather name="download" size={16} color="#FFFFFF" />
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={16} color="#FFFFFF" />
          <Text style={styles.addText}>Add Customer</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.listHeaderContainer}>
        <View style={styles.listHeaderRow}>
          <Text style={[styles.listHeaderText, styles.nameColumn]}>Name Customer</Text>
          <TouchableOpacity style={styles.sortIcon}>
            <Feather name="chevron-down" size={16} color="#8A8A8A" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomerItem}
        style={styles.customerList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3A3A3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userStatus: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    color: '#8A8A8A',
    fontSize: 12,
  },
  breadcrumbSeparator: {
    color: '#8A8A8A',
    fontSize: 12,
    marginHorizontal: 4,
  },
  breadcrumbActive: {
    color: '#3D8BFD',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    height: 40,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  filterText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  exportText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D8BFD',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addText: {
    color: '#FFFFFF',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  listHeaderContainer: {
    marginBottom: 8,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nameColumn: {
    flex: 1,
  },
  sortIcon: {
    padding: 4,
  },
  customerList: {
    flex: 1,
  },
  customerItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#8A8A8A',
    borderRadius: 4,
  },
  customerBasicInfo: {
    flex: 1,
  },
  customerId: {
    color: '#3D8BFD',
    fontSize: 14,
  },
  customerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandedContent: {
    padding: 12,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  infoRow: {
    marginTop: 12,
  },
  infoLabel: {
    color: '#8A8A8A',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  actionRow: {
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 4,
  },
  actionButton: {
    marginRight: 16,
  },
});