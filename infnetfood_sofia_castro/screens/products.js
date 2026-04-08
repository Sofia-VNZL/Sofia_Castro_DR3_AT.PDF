import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InternalHeader from '../components/InternalHeader';

const ALL_PRODUCTS = [
  { 
    id: 'p1', 
    categoryId: '1', 
    name: 'Arepa', 
    price: 28.00, 
    description: 'Diferentes opções de recheio',
    image: require('../media/arepas-4.jpg') 
  },
  { 
    id: 'p2', 
    categoryId: '2', 
    name: 'Sancocho', 
    price: 12.00, 
    description: 'Sopa para acabar o resfriado e a ressaca',
    image: require('../media/sancocho.jpg') 
  },
  { 
    id: 'p3', 
    categoryId: '3', 
    name: 'Majarete', 
    price: 12.00, 
    description: 'Doce de coco parecido ao pudim',
    image: require('../media/majarete.jpg') 
  },
  { 
    id: 'p4', 
    categoryId: '4', 
    name: 'Chicha', 
    price: 12.00, 
    description: 'bebida a base de arroz com canela',
    image: require('../media/chicha.jpg') 
  },
  { 
    id: 'p5', 
    categoryId: '4', 
    name: 'Papelón con Limón', 
    price: 12.00, 
    description: 'Refresco tradicional de cana-de-açúcar e limão',
    image: require('../media/papelon.jpg') 
  },
  { 
    id: 'p6', 
    categoryId: '5', 
    name: 'Pasta seca', 
    price: 12.00, 
    description: 'biscoitos perfeitos para o café da tarde',
    image: require('../media/pastaseca.jpg') 
  },
];

export default function ProductsScreen({ route, navigation }) {
  const { category } = route.params;

  const filteredProducts = ALL_PRODUCTS.filter(p => p.categoryId === category.id);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.addIcon}>+</Text>
    </TouchableOpacity>
  );
  return (
    
    <View style={styles.container}>
    <InternalHeader title={category.name} navigation={navigation} />
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#8B1A1A', marginBottom: 16, marginTop: 40 },
  productCard: { 
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, 
    padding: 12, marginBottom: 12, alignItems: 'center', elevation: 2 
  },
  productImage: { width: 70, height: 70, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 15 },
  productName: { fontSize: 16, fontWeight: '600', color: '#2C1A0E' },
  productPrice: { fontSize: 14, color: '#C8922A', fontWeight: 'bold', marginTop: 4 },
  addIcon: { fontSize: 24, color: '#8B1A1A', fontWeight: 'bold' }
});

