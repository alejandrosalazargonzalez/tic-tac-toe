import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from '@/styles/styles';
import { createEmptySquares } from '@/components/Square';
import { Board, calculateWinnerGeneric } from '@/components/Board';
import { Controls } from '@/components/Controls';

/**
 * Componente del juego en modo local (dos jugadores en el mismo dispositivo)
 */
export function LocalGame({ onBackToMenu }: { onBackToMenu: () => void }) {
  const [boardSize, setBoardSizeRaw] = useState(3);
  const [history, setHistory] = useState([createEmptySquares(3)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const setBoardSize = (newSize: number) => {
    setBoardSizeRaw(newSize);
    setHistory([createEmptySquares(newSize)]);
    setCurrentMove(0);
    setGameStarted(false);
  };

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const result = useMemo(
    () => calculateWinnerGeneric(currentSquares, boardSize),
    [currentSquares, boardSize]
  );

  const scoredMove = useRef<number | null>(null);

  useEffect(() => {
    if (result.winner || currentSquares.every((s) => s !== null)) {
      setGameStarted(false);
    }

    if (result.winner && scoredMove.current !== currentMove) {
      if (result.winner === 'X') setXWins((x) => x + 1);
      else setOWins((o) => o + 1);
      scoredMove.current = currentMove;
    }
  }, [result, currentSquares, currentMove]);

  const handleSquarePress = (i: number) => {
    if (result.winner || currentSquares[i]) return;
    const next = currentSquares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    if (!gameStarted) setGameStarted(true);
    const nextHistory = [...history.slice(0, currentMove + 1), next];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const restartGame = () => {
    setHistory([createEmptySquares(boardSize)]);
    setCurrentMove(0);
    setGameStarted(false);
    scoredMove.current = null;
  };

  /**
   * Reinicia en mitad de la partida y otorga un punto al oponente
   */
  const restartMidGame = () => {
    const empty = currentSquares.every((s) => s === null);
    if (!empty && !result.winner) {
      const opponent = xIsNext ? 'O' : 'X';
      if (opponent === 'X') setXWins((x) => x + 1);
      else setOWins((o) => o + 1);
    }
    restartGame();
  };

  const resetStats = () => {
    setXWins(0);
    setOWins(0);
  };

  const status = result.winner
    ? `Ganador: ${result.winner}`
    : currentSquares.every((s) => s !== null)
      ? 'Empate'
      : `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBackToMenu} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Volver al menú</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Modo Local</Text>
        </View>

        <View style={styles.mainRow}>
          <View style={styles.leftColumn}>
            <Text style={styles.status}>{status}</Text>

            <Board
              size={boardSize}
              squares={currentSquares}
              onSquarePress={handleSquarePress}
              highlightLine={result.line}
            />

            <View style={styles.infoRow}>
              <TouchableOpacity
                onPress={restartGame}
                style={[styles.smallBtn, gameStarted && { opacity: 0.4 }]}
                disabled={gameStarted}
              >
                <Text style={styles.smallBtnText}>Reiniciar partida</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={restartMidGame} style={styles.smallBtnAlt}>
                <Text style={styles.smallBtnText}>Rendirse</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Controls
            boardSize={boardSize}
            setBoardSize={setBoardSize}
            onRestartGame={restartGame}
            onRestartMidGame={restartMidGame}
            xWins={xWins}
            oWins={oWins}
            onResetStats={resetStats}
            disableSizeChange={gameStarted}
            disableRestart={gameStarted}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}