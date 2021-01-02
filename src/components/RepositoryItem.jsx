import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Anchor from './Anchor';
import Text from './Text';

const RepositoryItem = ({ item, extended }) => {
  return (<View style={styles.item}>
    <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
      <Image
        style={styles.avatar}
        source={{ uri: item.ownerAvatarUrl }}
      />
      <View style={{ paddingHorizontal: 8 }}>
        <Text testID="name" style={styles.title}>{item.fullName}</Text>
        <Text testID="description" color="textSecondary" style={{ marginVertical: 8 }}>{item.description}</Text>
        <Text testID="language" style={{ backgroundColor: theme.colors.primary, borderRadius: 3, alignSelf: "flex-start", color: "white", padding: 4 }}>{item.language}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingVertical: 8 }}>
      <View style={{ alignItems: "center" }}>
        <Text testID="stars" fontWeight="bold" style={{ marginBottom: 4 }}>{(item.stargazersCount / 1000).toFixed(1)}k</Text>
        <Text>Stars</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text testID="forks" fontWeight="bold" style={{ marginBottom: 4 }}>{(item.forksCount / 1000).toFixed(1)}k</Text>
        <Text>Forks</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text testID="reviews" fontWeight="bold" style={{ marginBottom: 4 }}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text testID="rating" fontWeight="bold" style={{ marginBottom: 4 }}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
    {extended && <Anchor href={item.url}>
      <Text fontWeight="bold" style={{
        backgroundColor: theme.colors.primary,
        flexGrow: 1,
        textAlign: "center",
        padding: 16,
        marginTop: 8,
        borderRadius: 3,
        color: "white"
      }}>Open in GitHub</Text>
    </Anchor>}
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