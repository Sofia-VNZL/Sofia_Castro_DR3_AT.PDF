import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import InternalHeader from '../components/InternalHeader';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity}x ${product.name} adicionado ao carrinho!`);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <InternalHeader title={product.name} navigation={navigation} />
      
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image source={product.imageSource || product.image} style={styles.mainImage} />
        
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => quantity > 1 && setQuantity(q => q - 1)} 
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.qtyNumber}>{quantity}</Text>
            
            <TouchableOpacity 
              onPress={() => setQuantity(q => q + 1)} 
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.cartButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FDF6E3' 
  },
  mainImage: { 
    width: '100%', 
    height: 300 
  },
  content: { 
    padding: 24, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    marginTop: -30, 
    backgroundColor: '#FDF6E3', 
    flex: 1,
    minHeight: 400
  },
  name: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#8B1A1A' 
  },
  description: { 
    fontSize: 16, 
    color: '#7A5C3A', 
    marginVertical: 15, 
    lineHeight: 22 
  },
  price: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#C8922A' 
  },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 30 
  },
  qtyBtn: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#8B1A1A', 
    borderRadius: 22.5, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  qtyText: { 
    color: '#FFF', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  qtyNumber: { 
    marginHorizontal: 20, 
    fontSize: 20, 
    fontWeight: '700',
    color: '#2C1A0E'
  },
  cartButton: { 
    backgroundColor: '#C8922A', 
    padding: 18, 
    borderRadius: 15, 
    alignItems: 'center',
    marginBottom: 40
  },
  cartButtonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: '700' 
  }
});