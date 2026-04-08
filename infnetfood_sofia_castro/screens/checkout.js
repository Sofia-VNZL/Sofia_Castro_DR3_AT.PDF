import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { useCart } from '../context/CartContext';
import InternalHeader from '../components/InternalHeader';
import * as Notifications from 'expo-notifications'; 

export default function CheckoutScreen({ navigation }) {
  const { totalValue, clearCart } = useCart(); 
  
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false); 

  const buscarCEP = async (valor) => {

    const cepLimpo = valor.replace(/\D/g, '');
    setCep(cepLimpo);

    if (cepLimpo.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          const enderecoCompleto = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
          setAddress(enderecoCompleto);
        } else {
          Alert.alert("CEP Inválido", "Não encontramos esse CEP. Digite manualmente.");
        }
      } catch (error) {
        Alert.alert("Erro de Conexão", "Não foi possível consultar o CEP agora.");
      } finally {
        setLoading(false);
      }
    }
  };

  const enviarNotificacao = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Pedido Confirmado!",
        body: "Seus Sabores de Venezuela já estão sendo preparados!",
        data: { data: 'goes here' },
      },
      trigger: null, 
    });
  };

  const handleFinishOrder = async () => {
    if (!address.trim() || !paymentMethod.trim()) {
      Alert.alert("Erro", "Por favor, preencha o endereço e o método de pagamento");
      return;
    }

    setLoading(true);
    
    setTimeout(async () => {
      setLoading(false);
      await enviarNotificacao();

      Alert.alert(
        "Sucesso!", 
        "Pedido realizado com sucesso!",
        [{ text: "OK", onPress: () => {
            clearCart(); 
            navigation.navigate('Home'); 
        }}]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <InternalHeader title="Checkout" navigation={navigation} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Resumo do Valor</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total a pagar:</Text>
          <Text style={styles.totalAmount}>R$ {totalValue.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Dados de Entrega</Text>

        <TextInput 
          style={styles.input}
          placeholder="Digite seu CEP (ex: 20020010)"
          value={cep}
          onChangeText={(texto) => buscarCEP(texto)} 
          keyboardType="numeric"
          maxLength={8}
        />

        {loading && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <ActivityIndicator size="small" color="#8B1A1A" />
            <Text style={{ marginLeft: 10, color: '#7A5C3A' }}>Buscando endereço...</Text>
          </View>
        )}

        <TextInput 
          style={[styles.input, { marginTop: 10, height: 80 }]}
          placeholder="Endereço completo (Rua, Número, Complemento)"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleFinishOrder}
          disabled={loading}
        >
          <Text style={styles.confirmText}>
            {loading ? "Processando..." : "Confirmar e Finalizar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6E3' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#8B1A1A', marginTop: 20, marginBottom: 10 },
  totalCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, elevation: 2, alignItems: 'center' },
  totalLabel: { color: '#7A5C3A', fontSize: 16 },
  totalAmount: { fontSize: 32, fontWeight: 'bold', color: '#C8922A' },
  input: { 
    backgroundColor: '#FFF', padding: 15, borderRadius: 12, 
    borderWidth: 1, borderColor: '#F5ECD0', fontSize: 16 
  },

  confirmButton: { 
    backgroundColor: '#C8922A', padding: 20, borderRadius: 12, 
    alignItems: 'center', marginTop: 30, marginBottom: 50 
  },
  confirmText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});