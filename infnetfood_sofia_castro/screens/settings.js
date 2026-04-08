import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView } from 'react-native';
import InternalHeader from '../components/InternalHeader';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1A1A1A' : '#FDF6E3',
    },
    text: {
      color: isDarkMode ? '#FDF6E3' : '#2C1A0E',
    },
    card: {
      backgroundColor: isDarkMode ? '#333' : '#FFF',
    }
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <InternalHeader title="Configurações" navigation={navigation} />
      
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, themeStyles.text]}>Aparência</Text>
        
        <View style={[styles.settingRow, themeStyles.card]}>
          <View>
            <Text style={[styles.settingLabel, themeStyles.text]}>Modo Escuro</Text>
            <Text style={styles.settingSubLabel}>Alterar as cores do aplicativo</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#8B1A1A' }}
            thumbColor={isDarkMode ? '#C8922A' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isDarkMode}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoText, themeStyles.text]}>
            O Modo Escuro ajuda a economizar bateria e reduz o cansaço visual em ambientes escuros! e é mais estiloso...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingSubLabel: {
    fontSize: 14,
    color: '#7A5C3A',
    marginTop: 2,
  },
  infoBox: {
    marginTop: 30,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#C8922A',
  },
  infoText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  }
});