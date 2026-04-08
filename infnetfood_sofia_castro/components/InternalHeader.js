import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Platform 
} from 'react-native';

const COLORS = {
  wine: '#8B1A1A',
  white: '#FFFFFF',
  mustard: '#C8922A',
};

export default function InternalHeader({ title, navigation }) {
  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar barStyle="light-content" backgroundColor={COLORS.wine} />
      
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>{title}</Text>

     
        <View style={{ width: 40 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.wine,

    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    height: 64, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: COLORS.white,
    fontSize: 32, 
    fontWeight: 'bold',
    marginTop: -4, 
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
});