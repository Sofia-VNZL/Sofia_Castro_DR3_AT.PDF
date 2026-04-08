import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, StatusBar, SafeAreaView, ImageBackground,
  Dimensions, Image
} from 'react-native';
const { width } = Dimensions.get('window');
 import { useTheme } from '../context/ThemeContext';

const bannerImage = require('../media/banner_paisaje.jpg'); 
const desayunoImage = require('../media/desayuno.jpg'); 
const almocoImage = require('../media/almuerzo.jpg'); 
const sobremesaImage = require('../media/sobremesas.jpg'); 
const bebidaImage = require('../media/bebidas.jpg'); 
const meriendaImage = require('../media/merienda.jpg'); 

const COLORS = {
  mustard: '#C8922A',
  wine: '#8B1A1A',
  darkBlue: '#1A2A4A',
  cream: '#FDF6E3',
  creamDark: '#F5ECD0',
  white: '#FFFFFF',
  textDark: '#2C1A0E',
  textMuted: '#7A5C3A',
};
 
const CATEGORIES = [
  {
    id: '1', name: 'Desayunos',
    description: 'Clássicos venezuelanos para iniciar o dia',
    imageSource: desayunoImage, color: '#C8922A', count: 8,
  },
  {
    id: '2', name: 'Almoços',
    description: 'Refeiçoes completas para o meio-dia',
    imageSource: almocoImage, color: '#8B1A1A', count: 6,
  },
  {
    id: '3', name: 'Sobremesas',
    description: 'A tradição doce',
    imageSource: sobremesaImage, color: '#5C3D1E', count: 4,
  },
  {
    id: '4', name: 'Bebidas',
    description: 'Frescos, jugos e mais',
    imageSource: bebidaImage, color: '#1A2A4A', count: 7,
  },
  {
    id: '5', name: 'Meriendas',
    description: 'Algo para se manter em pé',
    imageSource: meriendaImage, color: '#2C1A0E', count: 2,
  },
];
 

export default function HomeScreen({ navigation }) {
  const BannerArt = () => (
    <View style={styles.bannerContainer}>
      <ImageBackground 
        source={bannerImage} 
        style={styles.bannerImage}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Cultura & Sabor</Text>
          <Text style={styles.bannerSubtitle}>Inspirado por Armando Reverón</Text>
        </View>
      </ImageBackground>
    </View>
  );
 
  const renderCategory = ({ item }) => (
  <TouchableOpacity
    style={styles.categoryCard}
    activeOpacity={0.82}
    onPress={() => navigation.navigate('Products', { category: item })}
  >
    <View style={styles.imageContainer}>
      <Image 
        source={item.imageSource} 
        style={styles.categoryImage} 
      />
    </View>

    <View style={styles.categoryInfo}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryDesc}>{item.description}</Text>
      <Text style={styles.categoryCount}>{item.count} itens</Text>
    </View>

    <View style={[styles.arrowBadge, { backgroundColor: item.color }]}>
      <Text style={styles.arrowText}>›</Text>
    </View>
  </TouchableOpacity>
  );

  const { theme } = useTheme();
 
  return (
    <SafeAreaView style={styles.safe}>
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Bem-vindo ao Sabores de Venezuela</Text>
    </View>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.wine} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>¡Bienvenido!</Text>
                <Text style={styles.headerTitle}>InfnetFood</Text>
                <Text style={styles.headerSub}>Sabores de Venezuela</Text>
              </View>
              <TouchableOpacity 
                style={styles.avatarCircle}
                onPress={() => navigation.navigate('Profile')}
                activeOpacity={0.7}
                >
                <Text style={styles.avatarText}>VE</Text>
              </TouchableOpacity>
            </View>

            <BannerArt />
            <TouchableOpacity 
              style={styles.mapShortcut}
              onPress={() => navigation.navigate('Map')}
              >
              <Text style={styles.mapText}> Encontre restaurantes no Rio</Text>
            </TouchableOpacity>
            
            <Text style={styles.sectionTitle}>O que você quer hoje?</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.cream },
  header: {
    backgroundColor: COLORS.wine,
    paddingHorizontal: 20, 
    paddingTop: 40, 
    paddingBottom: 40, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24, 
    borderBottomRightRadius: 24,
  },
  greeting: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: COLORS.white },
  headerSub: { fontSize: 12, color: COLORS.mustard, fontWeight: '600' },
  avatarCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.mustard, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: COLORS.white, fontWeight: '700' },


  bannerContainer: {
    paddingHorizontal: 16,
    marginTop: -25, 
    marginBottom: 20,
  },
  bannerImage: {
    width: width - 32, 
    height: 300,//revisar
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 16, 
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 15,
  },
  bannerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  bannerSubtitle: { color: COLORS.cream, fontSize: 12 },

  
  
  sectionTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.textDark,
    paddingHorizontal: 16, marginBottom: 12,
  },
  listContent: { paddingBottom: 30 },
  
  categoryCard: {
    backgroundColor: COLORS.white, 
    marginHorizontal: 16, 
    marginVertical: 8,
    borderRadius: 16, 
    padding: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    
    
    shadowColor: COLORS.wine,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 65, 
    height: 65, 
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryInfo: { flex: 1 },
  categoryName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  categoryDesc: { fontSize: 12, color: COLORS.textMuted, marginVertical: 2 },
  categoryCount: { fontSize: 11, color: COLORS.mustard, fontWeight: '600' },
  
  arrowBadge: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  arrowText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  mapShortcut: {
  backgroundColor: COLORS.white,
  marginHorizontal: 16,
  padding: 15,
  borderRadius: 12,
  marginBottom: 20,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: COLORS.mustard
  },
  mapText: { color: COLORS.wine, fontWeight: '700' },
  container: { flex: 1 }
});