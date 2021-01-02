import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ order, setOrder }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => setOrder(value)}
      items={[
        { label: 'Latest repositories', value: 'CREATED_AT:DESC' },
        { label: 'Highest rated repositories', value: 'RATING_AVERAGE:DESC' },
        { label: 'Lowest rated repositories', value: 'RATING_AVERAGE:ASC' },
      ]}
      value={order}
    />
  );
};

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity>
      <Link to={`/reviews/${item.id}`}>
        <RepositoryItem {...{ item }} />
      </Link>
    </TouchableOpacity>
  );
};

export const RepositoryListContainer = ({ repositories, order, setOrder, searchQuery, setSearchQuery, onEndReach }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={<>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <OrderPicker order={order} setOrder={setOrder} />
      </>}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrder] = useState("CREATED_AT:DESC");
  const [searchQuery, setSearchQuery] = React.useState('');

  const [searchKeyword] = useDebounce(searchQuery, 500);
  const { repositories, fetchMore } = useRepositories({ order: orderBy, searchKeyword, first: 5 });

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer {...{ repositories, order: orderBy, setOrder, searchQuery, setSearchQuery, onEndReach }} />;
};

export default RepositoryList;