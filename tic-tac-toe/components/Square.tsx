import React from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/styles';

type NullableSquare = string | null;

/**
 * componente square
 * @returns javaScript code
 */
export function Square({
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
 * crea los componentes vacios
 * @param size
 * @returns
 */
export function createEmptySquares(size: number): NullableSquare[] {
  return Array(size * size).fill(null);
}