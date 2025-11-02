import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { styles } from '../styles/styles';

/** 
 * Tipos
 */
type NullableSquare = string | null;
type WinnerResult = { winner: NullableSquare; line: number[] | null };

/**
 * Componente Square
 */
function Square({
  value,
  onPress,
  highlighted,
}: {
  value: NullableSquare;
  onPress: () => void;
  highlighted: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.square, highlighted ? styles.squareHighlight : null]}
      activeOpacity={0.7}
    >
      <Text style={styles.squareText}>{value ?? ''}</Text>
    </TouchableOpacity>
  );
}

/**
 * Componente Board
 */
function Board({
  size,
  squares,
  onSquarePress,
  highlightLine,
}: {
  size: number;
  squares: NullableSquare[];
  onSquarePress: (idx: number) => void;
  highlightLine: number[] | null;
}) {
  const rows = [];
  for (let r = 0; r < size; r++) {
    const cols = [];
    for (let c = 0; c < size; c++) {
      const idx = r * size + c;
      const isHighlighted = highlightLine ? highlightLine.includes(idx) : false;
      cols.push(
        <Square
          key={idx}
          value={squares[idx]}
          onPress={() => onSquarePress(idx)}
          highlighted={isHighlighted}
        />
      );
    }
    rows.push(
      <View key={r} style={styles.boardRow}>
        {cols}
      </View>
    );
  }
  return <View style={styles.board}>{rows}</View>;
}

function Controls({
  boardSize,
  setBoardSize,
  onRestartGame,
  onRestartMidGame,
  xWins,
  oWins,
  onResetStats,
  disableSizeChange,
}: {
  boardSize: number;
  setBoardSize: (s: number) => void;
  onRestartGame: () => void;
  onRestartMidGame: () => void;
  xWins: number;
  oWins: number;
  onResetStats: () => void;
  disableSizeChange: boolean;
}) {
  function inc() {
    setBoardSize(Math.min(7, boardSize + 1));
  }
  function dec() {
    setBoardSize(Math.max(3, boardSize - 1));
  }

  return (
    <View style={styles.controls}>
      <Text style={styles.controlsTitle}>Tamaño del tablero</Text>
      <View style={styles.sizeRow}>
        <TouchableOpacity onPress={dec} disabled={disableSizeChange} style={styles.sizeBtn}>
          <Text style={styles.sizeBtnText}>-</Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="number-pad"
          style={styles.sizeInput}
          value={String(boardSize)}
          onChangeText={(t) => {
            const v = parseInt(t || '', 10);
            if (!isNaN(v)) {
              const clamped = Math.max(3, Math.min(7, v));
              setBoardSize(clamped);
            }
          }}
          editable={!disableSizeChange}
        />
        <TouchableOpacity onPress={inc} disabled={disableSizeChange} style={styles.sizeBtn}>
          <Text style={styles.sizeBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity onPress={onRestartGame} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Reiniciar partida</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRestartMidGame} style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>
            Reiniciar (mid-game → punto al oponente)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <Text style={styles.controlsTitle}>Estadísticas</Text>
        <Text style={styles.statText}>Victorias X: {xWins}</Text>
        <Text style={styles.statText}>Victorias O: {oWins}</Text>
        <TouchableOpacity onPress={onResetStats} style={styles.resetStatsBtn}>
          <Text style={styles.resetStatsBtnText}>Reiniciar estadísticas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Lógica del juego
 */
function createEmptySquares(size: number): NullableSquare[] {
  return Array(size * size).fill(null);
}

/**
 * detecta 3 o 4 en línea según tamaño del tablero
 */
function calculateWinnerGeneric(squares: NullableSquare[], size: number): WinnerResult {
  const needed = size >= 5 ? 4 : 3;

  const lines: number[][] = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - needed; c++) {
      const line = Array.from({ length: needed }, (_, k) => r * size + c + k);
      lines.push(line);
    }
  }

  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - needed; r++) {
      const line = Array.from({ length: needed }, (_, k) => (r + k) * size + c);
      lines.push(line);
    }
  }

  for (let r = 0; r <= size - needed; r++) {
    for (let c = 0; c <= size - needed; c++) {
      const line = Array.from({ length: needed }, (_, k) => (r + k) * size + c + k);
      lines.push(line);
    }
  }

  for (let r = 0; r <= size - needed; r++) {
    for (let c = needed - 1; c < size; c++) {
      const line = Array.from({ length: needed }, (_, k) => (r + k) * size + c - k);
      lines.push(line);
    }
  }

  for (const line of lines) {
    const [a] = line;
    const symbol = squares[a];
    if (symbol && line.every((idx) => squares[idx] === symbol)) {
      return { winner: symbol, line };
    }
  }

  return { winner: null, line: null };
}

export default function App() {
  const [boardSize, setBoardSizeRaw] = useState(3);
  const [history, setHistory] = useState([createEmptySquares(3)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const setBoardSize = (newSize: number) => {
    setBoardSizeRaw(newSize);
    setHistory([createEmptySquares(newSize)]);
    setCurrentMove(0);
  };

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const result = useMemo(
    () => calculateWinnerGeneric(currentSquares, boardSize),
    [currentSquares, boardSize]
  );

  const scoredMove = useRef<number | null>(null);

  useEffect(() => {
    if (result.winner && scoredMove.current !== currentMove) {
      if (result.winner === 'X') setXWins((x) => x + 1);
      else setOWins((o) => o + 1);
      scoredMove.current = currentMove;
    }
  }, [result, currentMove]);

  const handleSquarePress = (i: number) => {
    if (result.winner || currentSquares[i]) return;
    const next = currentSquares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    const nextHistory = [...history.slice(0, currentMove + 1), next];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const restartGame = () => {
    setHistory([createEmptySquares(boardSize)]);
    setCurrentMove(0);
    scoredMove.current = null;
  };

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
        <Text style={styles.title}>Tres o Cuatro en línea - Tablero configurable</Text>

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
              <TouchableOpacity onPress={restartGame} style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>Reiniciar partida</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={restartMidGame} style={styles.smallBtnAlt}>
                <Text style={styles.smallBtnText}>Reiniciar mid-game</Text>
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
            disableSizeChange={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
