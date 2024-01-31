import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, StatusBar, TextInput, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const temperatureUnits = [
  { label: 'Celsius', value: 'Celsius' },
  { label: 'Kelvin', value: 'Kelvin' },
  { label: 'Fahrenheit', value: 'Fahrenheit' },
];

export default function App() {
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [enteredNumber, setEnteredNumber] = useState('');
  const [resultTemperature, setResultTemperature] = useState('');

  function convertTemperature() {
    if (!fromUnit || !toUnit || !enteredNumber) {
      Alert.alert("Please fill all the input fields.");
      return;
    }
    const inputTemperature = parseFloat(enteredNumber);
    if (isNaN(inputTemperature)) {
      Alert.alert("Please enter a valid number for temperature.");
      return;
    }
    let convertedTemperature;
    if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
      convertedTemperature = ((inputTemperature * 9/5) + 32).toFixed(2) + ' °F';
    }
    else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
      convertedTemperature = (inputTemperature + 273.15).toFixed(2) + ' K';
    }
    else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
      convertedTemperature = ((inputTemperature - 32) * 5/9).toFixed(2) + ' °C';
    }
    else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
      convertedTemperature = (((inputTemperature - 32) * 5/9) + 273.15).toFixed(2) + ' K';
    }
    else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
    convertedTemperature = (((inputTemperature - 273.15) * 9/5) + 32).toFixed(2) + ' °F';
    }
    else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
      convertedTemperature = (inputTemperature - 273.15).toFixed(2) + ' °C';
    }
    else {
      Alert.alert("Invalid conversion. Please select different units.");
      return;
    }
    setResultTemperature(`Temperature: ${convertedTemperature}`);
  }

  const resetResult = () => {
    setResultTemperature('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.container}>
      <View style={styles.parentDiv}>
        <View style={styles.header}>
          <Text style={styles.textStyles}>Temperature Application</Text>
        </View>
        <StatusBar translucent={true} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEnteredNumber(text);
          resetResult();
          }}
          value={enteredNumber}
          placeholder="Input"
          keyboardType="numeric"
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={temperatureUnits}
            placeholder="From"
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={fromUnit}
            onChange={(item) => {
              setFromUnit(item.value);
              resetResult(); 
            }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={temperatureUnits}
            placeholder="To"
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={toUnit}
            onChange={(item) => setToUnit(item.value)}
          />
        </View>
        <View style={styles.buttonContainer} >
          <Button style={styles.textStyles3}  title="CONVERT"  onPress={convertTemperature}  />
        </View>
        {resultTemperature ? (<Text style={styles.textStyles2}>{resultTemperature}</Text>) : null}
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#58287F'
  },
  parentDiv: {
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor:'#DCFFB7',
    borderColor:'#F28585'
  },
  header: {
    borderWidth: 1.5,
    marginBottom: 10,
    width: 180,
    backgroundColor: '#FFA447',
    borderRadius: 5,
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent : 'center',
  },
  textStyles: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  textStyles2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingLeft: 13,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    height: 50,
    alignSelf: 'center',
    alignItems:'center'
  },
  textStyles3 : {
    color :'#FFFFFF',
    fontWeight : 'Bold',
    fontStyle : "italic"
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dropdown: {
    height: 40,
    width: 150,
    margin: 10,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#0008C1',
  },
  input: {
    height: 40,
    width: 80,
    margin: 10,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonContainer: {
    height: 40,
    margin: 12,
    backgroundColor: '#39A7FF',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'black',
  },
});

