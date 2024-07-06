import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '../constants';

const IntroductionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover Endless Possibilities with</Text>
      <Text style={styles.nord}>Nordstone</Text>
      <Text style={styles.description}>Your trusted partner for innovative solutions. Where creativity meets innovation and embark on a journey of limitless exploration</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <CustomButton
          title="Continue"
          handlePress={() => navigation.navigate('Auth')}
          icon={icons.rightArrow}
        />
        
        

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: 'Poppins-Light',
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 25,
  },
  nord: {
    color: '#FF8E01',
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 28,
    marginBottom: 20,
  },
  icon: {
    color:'black'
  }
});

export default IntroductionScreen;
