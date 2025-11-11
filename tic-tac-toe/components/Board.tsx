import React from 'react';
import {
    View,
} from 'react-native';
import { Square } from './Square';
import { styles } from "@/styles/styles";

type NullableSquare = string | null;
type WinnerResult = { winner: NullableSquare; line: number[] | null };

/**
 * componente Board del tres en raya
 * @returns javaScript code
 */
export function Board({
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

/**
 * calcula y comprueba el ganador de la partida
 * Detecta 3 o 4 en línea según tamaño del tablero
 * @param squares 
 * @param size 
 * @returns 
 */
export function calculateWinnerGeneric(squares: NullableSquare[], size: number): WinnerResult {
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
