import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { styles } from '@/styles/styles';

/**
 * componente con los controles del juego
 * @returns javaScript code
 */
export function Controls({
    boardSize,
    setBoardSize,
    onRestartGame,
    onRestartMidGame,
    xWins,
    oWins,
    onResetStats,
    disableSizeChange,
    disableRestart,
}: {
    boardSize: number;
    setBoardSize: (s: number) => void;
    onRestartGame: () => void;
    onRestartMidGame: () => void;
    xWins: number;
    oWins: number;
    onResetStats: () => void;
    disableSizeChange: boolean;
    disableRestart: boolean;
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
                <TouchableOpacity
                    onPress={onRestartGame}
                    style={[styles.primaryBtn, disableRestart && { opacity: 0.4 }]}
                    disabled={disableRestart}
                >
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
