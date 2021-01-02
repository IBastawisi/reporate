import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-native';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondaryBg,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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

const AppBar = () => {
  const {data} = useQuery(AUTHORIZED_USER, { fetchPolicy: 'cache-and-network', });
  const signOut = useSignOut();
  const history = useHistory();

  const logout = () => {
    signOut();
    history.push("/");
  };

  return <View style={styles.container}>
    <Text style={styles.header}>RepoRate</Text>
    <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, flexDirection: "row", justifyContent: "flex-end" }}>
      <Link to="/">
        <Text style={styles.navBtn}>Repos</Text>
      </Link>
      {data?.authorizedUser ?
        <>
          <Link to="/create">
            <Text style={styles.navBtn}>Create a Review</Text>
          </Link>
          <Link to="/reviews">
            <Text style={styles.navBtn}>My Reviews</Text>
          </Link>
          <TouchableWithoutFeedback onPress={logout}>
            <Text style={styles.navBtn}>Sign out</Text>
          </TouchableWithoutFeedback>
        </>
        :
        <>
          <Link to="/signin">
            <Text style={styles.navBtn}>Sign in</Text>
          </Link>          
          <Link to="/signup">
            <Text style={styles.navBtn}>Register</Text>
          </Link>          
        </> 
      }
    </ScrollView>
  </View>;
};

export default AppBar;