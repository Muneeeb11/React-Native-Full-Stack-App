import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      setLoading(true);
      const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirmation(confirmationResult);
      return confirmationResult;
    } catch (error) {
      console.error('Sign In Error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      setLoading(true);
      if (!confirmation) throw new Error('No confirmation available');
      const result = await confirmation.confirm(otp);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error('OTP Verification Error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveUserData = async (phoneNumber, password) => {
    try {
      setLoading(true);
      await firestore().collection('users').doc(phoneNumber).set({
        phoneNumber,
        password,
      });
    } catch (error) {
      console.error('Save User Data Error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const userDoc = await firestore().collection('users').doc(phoneNumber).get();
      if (userDoc.exists && userDoc.data().password === password) {
        setUser(userDoc.data());
        return userDoc.data();
      } else {
        throw new Error('Invalid phone number or password');
      }
    } catch (error) {
      console.error('Sign In Error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithPhoneNumber, verifyOtp, saveUserData, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
