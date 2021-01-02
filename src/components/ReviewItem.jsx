import { useMutation } from '@apollo/client';
import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from '../theme';
import Text from './Text';

const ReviewItem = ({ item, extended }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const history = useHistory();
  const handleDelete = async () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this Review",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", onPress: async () => {
            try {
              await deleteReview({ variables: { id: item.id } });
              history.push("/reviews");
            } catch (e) {
              console.log(e);
            }
          }
        }
      ],
      { cancelable: false }
    );

  };

  return (<View style={styles.item}>
    <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
      <Text
        style={styles.rating}
      >{item.rating}</Text>
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text style={styles.title}>{extended ? item.repository.fullName : item.user.username}</Text>
        <Text color="textSecondary" style={{ marginBottom: 8 }}>{new Date(item.createdAt).toDateString()}</Text>
        <Text style={{ padding: 4 }}>{item.text}</Text>
      </SafeAreaView>
    </View>
    {extended && <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingVertical: 8 }}>
      <Link to={`/reviews/${item.repository.id}`}>
        <Text fontWeight="bold" style={{
          backgroundColor: theme.colors.primary,
          flexGrow: 1,
          textAlign: "center",
          padding: 16,
          marginTop: 8,
          borderRadius: 3,
          color: "white"
        }}>View Repository</Text>
      </Link>
      <TouchableWithoutFeedback onPress={handleDelete} >
        <Text fontWeight="bold" style={{
          backgroundColor: theme.colors.error,
          textAlign: "center",
          padding: 16,
          marginTop: 8,
          borderRadius: 3,
          color: "white"
        }}>Delete Review</Text>
      </TouchableWithoutFeedback>
    </View>
    }
  </View>
  );
};


const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  rating: {
    width: 48,
    height: 48,
    flexShrink: 0,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 40,
    marginEnd: 8,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: theme.colors.primary
  },
});

export default ReviewItem;