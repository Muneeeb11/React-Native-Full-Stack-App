import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FormField from '../component/formfields';

const Calculator = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState(null);

  const handleOperation = async (operation) => {
    try {
      console.log('Sending request to server...');
      const response = await axios.post(`https://t-cogency-425520-j6.de.r.appspot.com/${operation}`, {
        a: parseFloat(input1),
        b: parseFloat(input2),
      });
      console.log('Server response:', response.data);
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.con}>
        <Text style={styles.title}>Calculator</Text>
        <FormField
          title="Enter 1st Number"
          value={input1}
          placeholder="1st Number"
          handleChangeText={setInput1}
          type="numeric"
        />
        <FormField
          title="Enter 2nd Number"
          value={input2}
          placeholder="2nd Number"
          handleChangeText={setInput2}
          type="numeric"
        />
        {result !== null && <Text style={styles.result}>Result: {result}</Text>}
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleOperation('add')} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperation('subtract')} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperation('multiply')} style={styles.button}>
        <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOperation('divide')} style={styles.button}>
        <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
          
        </View>
        
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
  button:{
      backgroundColor: '#FF8E01',
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      height:65,
      width:65,
      textAlign:'center'
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap:12,
    marginTop:5
  },
  buttonText: {
    color: "black",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 29,
    textAlign:'center',
    alignSelf:'center'
  },
  result: {
    marginTop: 20,
    marginBottom:10,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Calculator;
