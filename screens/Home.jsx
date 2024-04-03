import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StatusBar, Platform, Button } from 'react-native';
import { StyleSheet, Text, View, FlatList, RefreshControl, SafeAreaView, TextInput } from 'react-native';
import { useFetchData } from './useFetchData'; // Import the custom hook
import axios from 'axios';

export default function Home({ navigation }) {
  const { data, loading, error } = useFetchData('https://dev.iqrakitab.net/api/books');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRTL, setIsRTL] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (isRTL) {
   
    } else {
      
    }
  }, [isRTL]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Refetch the data
    // await fetchData();
    setRefreshing(false);
  };

  const toggleRTL = () => {
    setIsRTL(!isRTL);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.rowContainer, isRTL && styles.rowContainerRTL]}>
        <View style={[styles.searchContainer, isRTL && styles.searchContainerRTL]}>
          <TextInput
            style={[styles.textInput, isRTL && styles.textInputRTL]} // Align text right in RTL mode
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            // onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.toggleButtonContainer}>
          <Button title={isRTL ? 'LTR' : 'RTL'} onPress={toggleRTL} />
        </View>
      </View>
      <Text style={{ fontWeight: 'bold' }}>New and trending</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}> {item.id} </Text>
            <Text style={styles.itemText}> {item.title} </Text>
            <Text style={styles.itemDescription}> {item.description} </Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  rowContainerRTL: {
    flexDirection: 'row-reverse',
  },
  searchContainer: {
    flex: 1,
    minWidth: 100, // Set a minimum width for the container
  },
  searchContainerRTL: {
    flexDirection: 'row-reverse',
  },
  toggleButtonContainer: {
    marginLeft: 10,
  },
  textInput: {
    flex: 1, // Take up all available space within the container
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    height: 43,
    borderRadius: 20,
    textAlignVertical: 'center',
  },
  textInputRTL: {
    textAlign: 'right',
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
  },
  itemDescription: {
    color: 'grey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
