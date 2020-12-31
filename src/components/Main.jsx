import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Route, Switch, Redirect, Link } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
  header: {
    fontSize: 20,
    color: theme.colors.textOnSecondaryBg,
  },
  navBtn: {
    fontSize: 18,
    color: theme.colors.textOnSecondaryBg,
    paddingVertical: 16,
    paddingHorizontal: 8
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.header}>RepoRate</Text>
          <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableWithoutFeedback>
              <Link to="/">
                <Text style={styles.navBtn}>Repos</Text>
              </Link>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Link to="/signin">
                <Text style={styles.navBtn}>Sign in</Text>
              </Link>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>

      </AppBar>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;