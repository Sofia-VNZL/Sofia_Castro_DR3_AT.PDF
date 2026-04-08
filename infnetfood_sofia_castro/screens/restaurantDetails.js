import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import InternalHeader from '../components/InternalHeader';

const COLORS = {
  wine: '#8B1A1A',
  mustard: '#C8922A',
  textDark: '#2C1A0E',
  textMuted: '#7A5C3A',
  cream: '#FDF6E3',
};

export default function RestaurantDetailScreen({ route, navigation }) {

  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <InternalHeader title="Detalhes do Local" navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
 
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>🍴</Text> //repensar se fica legal ante de subir no git*
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.resName}>{restaurant.name}</Text>
          <Text style={styles.resAddress}> {restaurant.address || "Centro, Rio de Janeiro"}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Destaque do Cardápio</Text>
          
          <View style={styles.menuItemCard}>
            <View style={styles.menuInfo}>
              <Text style={styles.foodName}>Arepa de Pabellón</Text>
              <Text style={styles.foodDesc}>Carne desfiada, feijão preto, fatias de banana da terra frita e queijo.</Text>
              <Text style={styles.foodPrice}>R$ 32,00</Text>
            </View>
            <Text style={styles.foodEmoji}>🫓</Text>
          </View>

          <TouchableOpacity 
            style={styles.orderButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.orderButtonText}>Ver Cardápio Completo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  scrollContent: { paddingBottom: 30 },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.wine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmoji: { fontSize: 80 },
  infoSection: {
    padding: 20,
    marginTop: -20,
    backgroundColor: COLORS.cream,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  resName: { fontSize: 26, fontWeight: '800', color: COLORS.wine },
  resAddress: { fontSize: 14, color: COLORS.textMuted, marginTop: 5 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDark, marginBottom: 15 },
  menuItemCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuInfo: { flex: 1 },
  foodName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  foodDesc: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
  foodPrice: { fontSize: 15, fontWeight: '700', color: COLORS.mustard, marginTop: 8 },
  foodEmoji: { fontSize: 40, marginLeft: 10 },
  orderButton: {
    backgroundColor: COLORS.mustard,
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  orderButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});