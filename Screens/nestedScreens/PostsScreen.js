import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.img}></Image>
        <View style={styles.nameEmailWrapper}>
          <Text style={styles.name}>Ім'я</Text>
          <Text style={styles.email}>Електронна пошта</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View style={styles.photosContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.photoName}>Ліс</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Comments');
                }}
              >
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  navigation.navigate('MapScreen');
                }}
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}></Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
  },
  img: {
    marginHorizontal: 16,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 16,
    marginTop: 32,
  },
  name: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
  nameEmailWrapper: {
    marginTop: 48,
    marginLeft: 8,
  },
  photosContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  photo: {
    backgroundColor: 'black',
    height: 240,
  },
  photoName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginTop: 8,
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
});
