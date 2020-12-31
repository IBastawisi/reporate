import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  },
  header: {
    fontSize: 24,
    marginTop: Constants.statusBarHeight,
    marginBottom: 16,
    color: theme.colors.textOnSecondaryBg,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar>
        <TouchableWithoutFeedback>
          <Text style={styles.header}>Rate Repository Application</Text>
        </TouchableWithoutFeedback></AppBar>
      <RepositoryList />
    </View>
  );
};

export default Main;