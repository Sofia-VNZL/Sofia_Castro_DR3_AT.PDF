import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InternalHeader from '../components/InternalHeader';

export default function ProfileScreen({ navigation, userEmail, onLogout }) {

  const email = userEmail || "usuario@infnet.edu.br";
  const userName = email.substring(0, 5);
  
  return (
    <View style={styles.container}>
      <InternalHeader title="Meu Perfil" navigation={navigation} />
      
      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{userName.substring(0, 2).toUpperCase()}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status da Conta</Text>
            <Text style={styles.infoValue}>Ativa</Text>
          </View>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Orders')}
            >
            <Text style={styles.menuText}>Histórico de Pedidos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={onLogout}
          >
          <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.menuText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3' },
  content: { padding: 20, alignItems: 'center' },
  avatarSection: { alignItems: 'center', marginVertical: 40 },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#8B1A1A', alignItems: 'center', justifyContent: 'center',
    elevation: 4, marginBottom: 15
  },
  avatarText: { color: '#FFFFFF', fontSize: 36, fontWeight: '700' },
  userName: { fontSize: 24, fontWeight: '700', color: '#2C1A0E', textTransform: 'capitalize' },
  userEmail: { fontSize: 14, color: '#7A5C3A', marginTop: 4 },
  infoItem: { 
    backgroundColor: '#FFF', padding: 20, borderRadius: 12, 
    flexDirection: 'row', justifyContent: 'space-between', elevation: 1 
  },
  infoLabel: { color: '#7A5C3A', fontWeight: '600' },
  infoValue: { color: '#C8922A', fontWeight: '700' },
  logoutButton: {
    marginTop: 40, padding: 18, borderRadius: 12,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#8B1A1A',
    alignItems: 'center'},
  logoutText: { color: '#8B1A1A', fontWeight: '700', fontSize: 16 },

  infoSection: { 
    width: '100%', 
    marginTop: 20,
    paddingHorizontal: 5 
  },

  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2, 
    shadowColor: '#8B1A1A', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C1A0E',
  },
});