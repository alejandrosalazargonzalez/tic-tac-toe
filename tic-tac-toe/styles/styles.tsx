import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    padding: 18,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftColumn: {
    marginRight: 18,
  },
  board: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 8,
  },
  boardRow: {
    flexDirection: 'row',
  },
  square: {
    width: 56,
    height: 56,
    margin: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  squareText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  squareHighlight: {
    backgroundColor: '#c8f3c0',
    borderColor: '#4caf50',
  },
  status: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  controls: {
    width: 220,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sizeBtn: {
    padding: 8,
    backgroundColor: '#4caf50',
    borderRadius: 6,
    marginHorizontal: 6,
  },
  sizeBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  sizeInput: {
    width: 46,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    borderRadius: 6,
    fontSize: 16,
    padding: 0,
  },
  buttonsRow: {
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#1976d2',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: {
    backgroundColor: '#9e9e9e',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  secondaryBtnText: { color: '#fff', fontSize: 12 },
  stats: {
    marginTop: 12,
  },
  statText: {
    fontSize: 14,
    marginBottom: 4,
  },
  resetStatsBtn: {
    marginTop: 8,
    backgroundColor: '#e53935',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetStatsBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  smallBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#4caf50',
    borderRadius: 6,
    marginRight: 6,
  },
  smallBtnAlt: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#f57c00',
    borderRadius: 6,
  },
  smallBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});
