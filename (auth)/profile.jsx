import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../component/CustomButton';
import FormField from '../component/formfields';


const Profile = ({ route, navigation }) => {
  
  const { phoneNumber, password, isSignUp } = route.params;
  console.log('Received password in Profile:',password);

  
  const [form, setForm] = useState({
    name: '',
    email: '',
    image: null,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      if (!isSignUp) {
        try {
          const userDoc = await firestore().collection('users').doc(phoneNumber).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setForm({
              name: userData.name || '',
              email: userData.email || '',
              image: null,
            });

            // Fetch the image from Firebase Storage
            try {
              const reference = storage().ref(`profileImages/${phoneNumber}/profilePicture`);
              const imageUrl = await reference.getDownloadURL();
              setForm(prevForm => ({ ...prevForm, image: imageUrl }));
            } catch (error) {
              if (error.code === 'storage/object-not-found') {
                console.log('No profile picture found');
              } else {
                console.error('Failed to fetch profile picture:', error);
              }
            }
          } else {
            Alert.alert('Error', 'No user profile found');
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to retrieve user profile');
        }
      }
    };

    fetchUserProfile();
  }, [isSignUp, phoneNumber]);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        console.log('Selected image URI:', source); 
        setForm(prevForm => ({ ...prevForm, image: source }));
      }
    });
  };

  const handleSaveProfile = async () => {
    const { name, email, image } = form;
    if (!name || !email || !image) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setUploading(true);
    try {
      if (image && !image.startsWith('https://')) {
        const imageName = 'profilePicture';
        const reference = storage().ref(`profileImages/${phoneNumber}/${imageName}`);
        await reference.putFile(image);
        console.log('Image uploaded successfully.');
      } else {
        console.log('No image selected or image already uploaded.');
      }

      console.log('Saving profile data to Firestore...');
      

      const profiledata = {
        name,
        email,
        phoneNumber,
      };
      
      await firestore().collection('users').doc(phoneNumber).update(profiledata);
      
      navigation.navigate('tab'); // Adjust the navigation to your specific tab screen
    } catch (error) {
      console.error('Firestore error: ', error);
      Alert.alert('Error', 'Failed to save profile');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {uploading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF8E01" />
        </View>
      )}
      <Text style={styles.title}>Welcome to your profile</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleChooseImage}>
        {form.image ? (
          <Image source={{ uri: form.image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Choose Profile Picture</Text>
        )}
      </TouchableOpacity>
      <FormField
        title="Name"
        value={form.name}
        placeholder="Name"
        handleChangeText={text => setForm({ ...form, name: text })}
      />
      <FormField
        title="Email"
        value={form.email}
        placeholder="Email"
        handleChangeText={text => setForm({ ...form, email: text })}
        keyboardType="email-address"
      />
      <View style={styles.buttonContainer}>
        <CustomButton title="Save Profile" handlePress={handleSaveProfile} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  imagePicker: {
    width: 150,
    height: 150,
    backgroundColor: '#282828',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#aaa',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems:'center'
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});

export default Profile;
