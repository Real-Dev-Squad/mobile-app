import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 4, backgroundColor: '#F5F5F5' },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
    margin: 2,
  },
  loaderView: { alignItems: 'center', paddingVertical: 20 },
});
