import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView,
  Platform, ScrollView, StatusBar,
} from 'react-native';
 
 {/*Gosto bastante de trabalhar com layout e por isso gosto de manter as cores constantes ;)*/}
const COLORS = {
  mustard: '#C8922A',
  wine: '#8B1A1A',
  darkBlue: '#1A2A4A',
  cream: '#FDF6E3',
  creamDark: '#F5ECD0',
  white: '#FFFFFF',
  error: '#C0392B',
  textDark: '#2C1A0E',
  textMuted: '#7A5C3A',
};
 
export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 
 
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório!'; 
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Informe um e-mail válido!!!';
    }
    if (!password.trim()) {
      newErrors.password = 'A senha é obrigatória!!!'; 
    } else if (password.length < 4) {
      newErrors.password = 'A senha deve ter pelo menos 4 caracteres';
    }
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0;
  };
 
  const handleLogin = () => {
    if (validate()) onLogin(email); 
  };
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.cream }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} /> 
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      > 
        
        <View style={styles.header}> 
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🫓</Text>{/*Tem pessoas que não sabem, mas isso aqui é uma arepa, comida muito popular da venezuela*/}
          </View>

          <Text style={styles.appTitle}>InfnetFood</Text>
          <Text style={styles.appSubtitle}>Sabores de Venezuela</Text>
          <View style={styles.flagStrip}>
            <View style={[styles.flagBar, { backgroundColor: '#CF142B' }]} />
            <View style={[styles.flagBar, { backgroundColor: '#FFD700' }]} />
            <View style={[styles.flagBar, { backgroundColor: '#002D62' }]} />
          </View>
        </View>
 

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.cardSubtitle}>Faça login para continuar</Text>
 
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="seu@email.com"
            placeholderTextColor={COLORS.textMuted}
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: null })); }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
 

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Sua senha"
            placeholderTextColor={COLORS.textMuted}
            value={password}
            onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: null })); }}
            secureTextEntry
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
 
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
 
          <Text style={styles.hintText}>
            Qualquer e-mail válido e senha com 4+ caracteres funciona!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.mustard,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },

  logoEmoji: { fontSize: 36 },
  appTitle: { fontSize: 30, fontWeight: '700', color: COLORS.wine, letterSpacing: 0.5 },
  appSubtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 2, marginBottom: 10 },
  flagStrip: { flexDirection: 'row', width: 60, height: 5, borderRadius: 3, overflow: 'hidden' },
  flagBar: { flex: 1 },
  card: {
    width: '100%', backgroundColor: COLORS.white, borderRadius: 16, padding: 24,
    shadowColor: COLORS.wine, shadowOffset: { width: 0, height: 4 },

    shadowOpacity: 0.1, shadowRadius: 12, elevation: 4,
  },

  cardTitle: { fontSize: 20, fontWeight: '700', color: COLORS.wine, marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textDark, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.creamDark, borderWidth: 1.5, borderColor: COLORS.creamDark,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,

    fontSize: 15, color: COLORS.textDark, marginBottom: 4,
  },

  inputError: { borderColor: COLORS.error, backgroundColor: '#FFF0EE' },
  errorText: { fontSize: 12, color: COLORS.error, marginBottom: 10, marginLeft: 2 },
  loginButton: {
    paddingVertical: 15, alignItems: 'center', marginTop: 12,
    backgroundColor: COLORS.mustard, borderRadius: 12,
    
  },

  loginButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  hintText: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center', marginTop: 14 },
});