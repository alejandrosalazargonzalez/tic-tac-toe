import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from '@/styles/styles';
import { LocalGame } from '@/components/LocalGame';
import { OnlineGame } from '@/components/OnlineGame';

/**
 * Componente principal que permite elegir entre modo local u online
 */
export default function App() {
  const [gameMode, setGameMode] = useState<'menu' | 'local' | 'online'>('menu');

  if (gameMode === 'local') {
    return <LocalGame onBackToMenu={() => setGameMode('menu')} />;
  }

  if (gameMode === 'online') {
    return <OnlineGame onBackToMenu={() => setGameMode('menu')} />;
  }

  /* Menú principal */
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tres o Cuatro en línea</Text>
        <Text style={styles.subtitle}>Selecciona el modo de juego</Text>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setGameMode('local')}
          >
            <Text style={styles.menuButtonText}> Juego Local</Text>
            <Text style={styles.menuButtonSubtext}>
              Juega en el mismo dispositivo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setGameMode('online')}
          >
            <Text style={styles.menuButtonText}> Juego Online</Text>
            <Text style={styles.menuButtonSubtext}>
              Conecta con otro jugador
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}