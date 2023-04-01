import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const takePhoto = async () => {
    const photos = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log('latitude', location.coords.latitude);
    console.log('longitude', location.coords.longitude);
    setPhoto(photos.uri);
  };
  const sendPhoto = () => {
    navigation.navigate('PostsScreen', { photo } /*{ title }*/);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.photo}>
            <Image source={{ uri: photo }} style={styles.photoImg} />
            <TouchableOpacity style={styles.addPhoto} onPress={takePhoto}>
              <Ionicons name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.addPhoto} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.photoText}>Завантажте фото</Text>
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
        marginTop={32}
      />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
          paddingLeft={28}
        />
        <Ionicons
          name="location-outline"
          size={24}
          color="#BDBDBD"
          style={styles.inputIcon}
        />
      </View>

      <TouchableOpacity
        style={{
          ...styles.buttonCreate,
          backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
        }}
        activeOpacity={0.7}
        onPress={sendPhoto}
      >
        <Text
          style={{
            ...styles.buttonCreateText,
            color: photo ? '#FFFFFF' : '#BDBDBD',
          }}
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  input: {
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    height: 50,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
  },
  inputWrapper: {
    position: 'relative',
    marginTop: 16,
  },
  inputIcon: {
    position: 'absolute',
    top: 13,
    left: 16,
  },
  buttonCreate: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 100,
  },
  buttonCreateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    paddingVertical: 16,
  },
  camera: {
    marginHorizontal: 16,
    marginTop: 32,
    height: 240,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {
    marginHorizontal: 16,
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  addPhoto: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: 90,
    left: 142,
  },
  photo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    right: 0,
    borderColor: '#fff',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
});
