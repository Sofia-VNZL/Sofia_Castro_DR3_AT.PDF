import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import InternalHeader from '../components/InternalHeader';

const MOCK_ORDERS = [
  {
    id: '101',
    date: '07/04/2026',
    items: '2x Arepa Pelúa, 1x Papelón con Limón',
    total: 58.50,
    status: 'Entregue',
  },
  {
    id: '102',
    date: '06/04/2026',
    items: '1x Pabellón Criollo, 1x Malta',
    total: 45.00,
    status: 'Entregue',
  },
  {
    id: '103',
    date: '05/04/2026',
    items: '3x Tequeños, 1x Frescolita',
    total: 32.00,
    status: 'Cancelado',
  },
];

export default function OrdersScreen({ navigation }) {
  
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <Text style={styles.orderItems} numberOfLines={1}>{item.items}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>R$ {item.total.toFixed(2)}</Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: item.status === 'Entregue' ? '#D1FAE5' : '#FEE2E2' }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: item.status === 'Entregue' ? '#065F46' : '#8B1A1A' }
          ]}>
          {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Meus Pedidos" navigation={navigation} />
      
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Você ainda não fez nenhum pedido.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3' },
  listPadding: { padding: 16 },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5ECD0',
    paddingBottom: 4,
  },
  orderId: { fontWeight: 'bold', color: '#8B1A1A', fontSize: 14 },
  orderDate: { color: '#7A5C3A', fontSize: 12 },
  orderItems: { fontSize: 15, color: '#2C1A0E', marginVertical: 8 },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  orderTotal: { fontSize: 16, fontWeight: '700', color: '#C8922A' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#7A5C3A' }
});