import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewList = ({ reviews, extended, onEndReach }) => {
  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList style={{marginBottom: 300}}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem {...{ item }} extended={extended} />
      )}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewList;