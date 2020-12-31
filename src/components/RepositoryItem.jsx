import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const RepositoryItem = ({ item }) => {
  console.log(item);
  return (<View style={styles.item}>
    <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
      <Image
        style={styles.avatar}
        source={{ uri: item.ownerAvatarUrl }}
      />
      <View style={{ paddingHorizontal: 8 }}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text color="textSecondary" style={{ marginVertical: 8 }}>{item.description}</Text>
        <Text style={{ backgroundColor: theme.colors.primary, borderRadius: 3, alignSelf: "flex-start", color: "white", padding: 4 }}>{item.language}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingVertical: 8 }}>
      <View style={{ alignItems: "center" }}>
        <Text fontWeight="bold" style={{marginBottom: 4}}>{(item.stargazersCount/1000).toFixed(1)}k</Text>
        <Text>Stars</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text fontWeight="bold" style={{marginBottom: 4}}>{(item.forksCount/1000).toFixed(1)}k</Text>
        <Text>Forks</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text fontWeight="bold" style={{marginBottom: 4}}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text fontWeight="bold" style={{marginBottom: 4}}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    backgroundColor: "white",
    padding: 16
  },
  title: {
    fontSize: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    marginEnd: 8,
    borderRadius: 3
  },
});

export default RepositoryItem;