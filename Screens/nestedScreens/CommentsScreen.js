import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Text>Comments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
