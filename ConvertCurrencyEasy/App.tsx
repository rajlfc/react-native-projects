/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import { Keyboard } from 'react-native';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { countryByCurrency } from './constants';
import { countryByFlag } from './constants';
import { SvgUri } from 'react-native-svg'

import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import CustomDropDown from './components/CustomDropDown';



function App(): React.JSX.Element {
  const [currencyData, setcurrencyData] = useState(0.0)
  const [isClicked, setIsClicked] = useState(false)
  const [isConvertClicked,setIsConvertClicked] = useState(false)
  const [toText, setToText] = useState('Select Converted Currency')
  const [fromText, setFromText] = useState('Select Base Currency')
  const [amount, setAmount] = useState('')
  const [codeDict, setCodeDict] = useState({})
  const [finalButtonClicked, setFinalButtonClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [data, setdata] = useState(countryByCurrency)
  const [dropdownOpened, setDropDownOpened] = useState(false)
  
  const handleCallBack = (selectedData) => {
    setFromText(selectedData)
    if (selectedData != '') {
      setErrors({})
    }
  }
  const handleCallBackForSecond = (selectedData) => {
    setToText(selectedData)
    if (selectedData != '') {
      setErrors({})
    }
  }
  const handleResetCallBack = (selectedState) => {
    setDropDownOpened(selectedState)
  }
  const handleClickedCallBack = () => {
    setIsClicked(!isClicked)
    setIsConvertClicked(false)
  }
  const handleConvertCallBack = () => {
    setIsConvertClicked(!isConvertClicked)
    setIsClicked(false)
  }
  const validateForm = () => {
    let errors = {}
    if (fromText === "Select Base Currency") errors.fromText = "Please provide base currency"
    if (toText == "Select Converted Currency") errors.toText = "Please provide converted cuurency"
    if (amount == '') errors.amount = "Please provide amount to convert"
    setErrors(errors)
    return Object.keys(errors).length == 0
  }

  const CountryFlagImage = () => {
    const dictOfCode = new Map()
    for (let i = 0; i < countryByFlag.length; i++) {
      let name = countryByFlag[i].name.toLowerCase()
      let code = countryByFlag[i].code.toLowerCase()
      dictOfCode.set(name, code)
    }
    setCodeDict(dictOfCode)
  }

  const checkCurrency = async (to: string, from: string, amount: number) => {
    const response = await fetch(`https://simple-currency-conversion.p.rapidapi.com/api/method/exchangerate?to=${to}&from=${from}&amount=${amount}&format=json&decrease=0&increase=0`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9dca57f7dbmsh740b8886846509bp159dd5jsneac3119a81e5',
        'x-rapidapi-host': 'simple-currency-conversion.p.rapidapi.com'
      }
    })
    const newResponse = await response.json()
    setIsLoading(false)
    setcurrencyData(newResponse.result)
  }

  useEffect(() => {
    CountryFlagImage()
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background_rupee.png')}
        imageStyle={{ opacity: 0.3 }}
        style={styles.image}
      >
        <Text style={styles.text}>Welcome to Currency Conversion</Text>
        <CustomDropDown 
        placeholdertext = {'Search by country'}
        codedict = {codeDict}
        countrysList={countryByCurrency}
        dropdownPlaceHolderText= {fromText}
        handleCallBack={handleCallBack}
        handlereset={handleResetCallBack}
        dropdownopened={dropdownOpened}
        handleClicked={handleClickedCallBack}
        clicked={isClicked}
        />
        {errors.fromText ? <Text style={styles.errorText}>{errors.fromText}</Text> : null}
        <CustomDropDown 
        placeholdertext = {'Search by country'}
        codedict = {codeDict}
        countrysList={countryByCurrency}
        dropdownPlaceHolderText= {toText}
        handleCallBack={handleCallBackForSecond}
        handlereset={handleResetCallBack}
        dropdownopened={dropdownOpened}
        handleClicked={handleConvertCallBack}
        clicked={isConvertClicked}
        />
              {errors.toText ? <Text style={styles.errorText}>{errors.toText}</Text> : null}
              <View style={styles.texinputView}>
                <Text style={styles.textInputText}>Convert :</Text>
                <TextInput
                  placeholder='Enter Amount'
                  placeholderTextColor="#99AAAB"
                  keyboardType='numeric'
                  value={amount}
                  onChangeText={setAmount}
                  style={styles.formText}
                  
                />
              </View>
              {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}
              <TouchableOpacity
                style={styles.buttonCalculate}
                onPress={() => {
                  if (validateForm()) {
                    Keyboard.dismiss()
                    setErrors({})
                    checkCurrency(toText, fromText, parseFloat(amount))
                    setFinalButtonClicked(true)
                  }
                }}>
                <Text style={styles.buttonText}>Calculate Conversion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetview}
                onPress={() => {
                  setcurrencyData(0.0)
                  setIsClicked(false)
                  setIsConvertClicked(false)
                  setToText('Select Converted Currency')
                  setFromText('Select Base Currency')
                  setErrors({})
                  setAmount('')
                  setFinalButtonClicked(false)
                  setDropDownOpened(true)
                  setIsLoading(true)
                  setdata(countryByCurrency)
                }}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
              {(finalButtonClicked && !isLoading) ? (
                <View style={styles.finalView}>
                  <Text style={styles.finalText}>{amount} {fromText} = {toText} {currencyData.toLocaleString()}</Text>
                  <Text style={styles.finalText}>Current Rate: 1 {fromText} = {toText} {(currencyData/parseFloat(amount)).toLocaleString()}</Text>
                </View>
              ) : (finalButtonClicked && <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="0000ff" />
                <Text style={styles.loadingTextColor}>Calculating Please wait..</Text>
              </View>)}
            </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    alignSelf: 'center'
  },
  toDropdownView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 50,
    width: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 30
  },
  toDropdownText: {
    fontSize: 16,
    color: "#A4B0BD",
    padding: 10
  },
  downArrow: {
    marginTop: 7
  },
  upArrow: {
    marginTop: 7
  },
  dropDownArea: {
    width: 300,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 0,
    alignSelf: 'center'
  },
  searchInput: {
    width: 270,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    alignSelf: "center",
    margin: 20,
    paddingHorizontal: 20,
    color: "#fff"
  },
  dropDownAreaText: {
    fontSize: 16,
    color: "#fff",
    margin: 10,
    width: 100
  },
  dropdownView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countryImage: {
    width: 30,
    height: 30,
    margin: 10
  },
  texinputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40
  },
  textInputText: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 50,
  },
  formText: {
    height: 40,
    width: 150,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    color: "#fff"
  },
  buttonCalculate: {
    marginTop: 80,
    backgroundColor: "#DDDDDD",
    height: 60,
    alignItems: 'center'
  },
  buttonText: {
    color: "#000",
    padding: 20
  },
  finalView: {
    marginTop: 30,
    alignItems: 'center'
  },
  finalText: {
    fontSize: 16,
    color: "#fff"
  },
  resetview: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    height: 60,
  },
  loadingContainer: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingTextColor: {
    color: "#fff"
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
    marginLeft: 40
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default App;
