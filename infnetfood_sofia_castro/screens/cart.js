import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import InternalHeader from '../components/InternalHeader';

export default function CartScreen({ navigation }) {
  const { cartItems, totalValue, removeFromCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemMainInfo}>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDetails}>{item.quantity}x - R$ {item.price.toFixed(2)}</Text>
        </View>
        
        
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemSubtotal}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <InternalHeader title="Meu Carrinho" navigation={navigation} />
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Seu carrinho está vazio!!!</Text>}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>R$ {totalValue.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => {
            if (cartItems.length > 0) {
              navigation.navigate('Checkout');
            } else {
              alert("Seu carrinho está vazio!");
            }
          }}
          >
          <Text style={styles.checkoutText}>Ir para o Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3' },
  list: { padding: 16 },
  itemCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 10, elevation: 2 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#8B1A1A' },
  itemDetails: { color: '#7A5C3A', fontSize: 14 },
  itemSubtotal: { textAlign: 'right', fontWeight: 'bold', color: '#C8922A' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#7A5C3A' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  totalLabel: { fontSize: 16, color: '#7A5C3A' },
  totalValue: { fontSize: 28, fontWeight: 'bold', color: '#8B1A1A', marginBottom: 15 },
  checkoutButton: { backgroundColor: '#C8922A', padding: 18, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: '700' },

//ajuste de teste
  itemMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  removeButton: {
    padding: 8,
    backgroundColor: '#FEE2E2', 
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#8B1A1A', 
    fontWeight: 'bold',
    fontSize: 14,
  },
});