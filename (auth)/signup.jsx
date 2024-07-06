import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from 'react-native-phone-input';
import { useAuth } from './AuthProvider';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import CustomButton from '../component/CustomButton';
import FormField from '../component/formfields';

const Signup = ({ navigation }) => {
  const { signInWithPhoneNumber, verifyOtp, saveUserData, loading } = useAuth();
  const [form, setForm] = useState({ phoneNumber: '', password: '', otp: '' });
  const [isValidNumber, setIsValidNumber] = useState(true);
  const phoneRef = useRef(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [countryCode, setCountryCode] = useState('US');

  const handlePhoneChange = (number) => {
    setForm((prevForm) => ({ ...prevForm, phoneNumber: number }));
    if (phoneRef.current) {
      setIsValidNumber(phoneRef.current.isValidNumber(number));
    }
  };

  const checkIfUserExists = async (phoneNumber) => {
    const userSnapshot = await firestore()
      .collection('users')
      .where('phoneNumber', '==', phoneNumber)
      .get();

    return !userSnapshot.empty;
  };

  const handleSignUp = async () => {
    if (!form.phoneNumber || !isValidNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    if (!form.password) {
      Alert.alert('Error', 'Password cannot be empty');
      return;
    }

    try {
      const userExists = await checkIfUserExists(form.phoneNumber);
      if (userExists) {
        Alert.alert('Error', 'This phone number is already registered');
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(`+${form.phoneNumber}`);
      setConfirmation(confirmationResult);
      setShowOtpField(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmation) {
      Alert.alert('Error', 'No confirmation available. Please try again.');
      return;
    }

    try {
      const user = await verifyOtp(form.otp);
      await saveUserData(form.phoneNumber, form.password);
      setShowOtpField(false);
      navigation.navigate('Profile', {
        phoneNumber: form.phoneNumber,
        password: form.password,
        isSignUp: true,
      });
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
      <Text style={styles.title}>Sign up to Nordstone</Text>
      <View>
        <Text style={styles.phnum}>Phone Number</Text>
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
      {showOtpField && (
        <FormField
          title="OTP"
          value={form.otp}
          placeholder="Enter OTP"
          type='numeric'
          handleChangeText={(text) => setForm({ ...form, otp: text })}
        />
      )}
      <View style={styles.buttontop}>
        <CustomButton
          title={showOtpField ? "Verify OTP" : "Sign Up"}
          handlePress={showOtpField ? handleVerifyOtp : handleSignUp}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signInLink}>Sign In</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: 'black',
    height: 52,
    borderRadius: 28,
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
  signInText: {
    fontSize: 14,
    color: '#B0B0B0',
    fontFamily: 'Poppins-Regular',
  },
  signInLink: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF8E01',
    marginLeft: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttontop: {
    marginTop: 10,
  },
  phnum: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 1,
    fontFamily: 'Poppins-Medium',
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

export default Signup;
