import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';


export const LoadingIndicator = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    padding: 20,
    borderRadius: 10,
  },
});
