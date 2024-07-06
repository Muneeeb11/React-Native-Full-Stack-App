import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../component/CustomButton';
import FormField from '../component/formfields';
import PhoneInput from 'react-native-phone-input';
import { useAuth } from './AuthProvider';


const Signin = ({ navigation }) => {
  const { signIn, loading } = useAuth();
  const [form, setForm] = useState({ phoneNumber: '', password: '' });
  const [isValidNumber, setIsValidNumber] = useState(true);
  const phoneRef = useRef(null);
  const [countryCode, setCountryCode] = useState('US');

  const handlePhoneChange = (number) => {
    setForm((prevForm) => ({ ...prevForm, phoneNumber: number }));
    if (phoneRef.current) {
      setIsValidNumber(phoneRef.current.isValidNumber(number));
    }
  };

  const handleSignIn = async () => {
    if (!isValidNumber) {
      Alert.alert('Error', 'Invalid phone number');
      return;
    }
    if (!form.password) {
      Alert.alert('Error', 'Password cannot be empty');
      return;
    }

    try {
      await signIn(form.phoneNumber, form.password);
      navigation.navigate('Profile', { phoneNumber: form.phoneNumber });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF8E01" />
        </View>
      )}
      <Text style={styles.title}>Sign in to Nordstone</Text>
      <View>
        <Text style={styles.phnum}>
          Phone Number
        </Text>
        <View style={styles.phoneContainer}>
          <PhoneInput
            ref={phoneRef}
            initialCountry={countryCode.toLowerCase()}
            textStyle={styles.phoneInputText}
            textProps={{
              placeholder: 'Phone Number',
              keyboardType: 'phone-pad',
            }}
            onChangePhoneNumber={handlePhoneChange}
            flagStyle={styles.flag}
            value={form.phoneNumber}
          />
        </View>
      </View>
      {!isValidNumber && <Text style={styles.errorText}>Invalid phone number</Text>}
      <FormField
        title="Password"
        value={form.password}
        placeholder="Password"
        handleChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
      />
      <View style={styles.buttontop}>
        <CustomButton
          title="Sign In"
          handlePress={handleSignIn}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
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
    alignItems:'center'
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 53,
    borderRadius: 28,
    marginBottom: 10,
  },
  phoneInputText: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  flag: {
    marginLeft: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
    marginEnd: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#B0B0B0',
    fontFamily: 'Poppins-Regular',
  },
  signUpLink: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF8E01',
    marginLeft: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  buttontop: {
    marginTop:10
  },
  phnum: {
    fontSize: 16,
    color: 'white',
    marginLeft:10,
    marginTop: 25,
    marginBottom:1,
    fontFamily:'Poppins-Medium'
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

export default Signin;
