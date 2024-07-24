import { StyleSheet, Text, View, StatusBar, Pressable, TextInput, FlatList, Image } from 'react-native'
import React, { useState, useRef, PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


type DropdownProps = PropsWithChildren <{
    placeholdertext: string
    codedict: {}
    countrysList: countriesCurrency[]
    dropdownPlaceHolderText: string
    handleCallBack: (text: string) => void
    handlereset: (isOpned: Boolean) => void,
    dropdownopened: Boolean
    handleClicked: () => void
    clicked: Boolean
}>
const CustomDropDown = ({placeholdertext,
    codedict,
    countrysList,
    dropdownPlaceHolderText,
    handleCallBack,
    handlereset,
    dropdownopened,
    handleClicked,
    clicked
    }: DropdownProps) => {
    const [isClicked, setIsClicked] = useState(dropdownopened)
    const [data, setdata] = useState(countrysList)
    const [searchBase, setsearchBase] = useState('')
    const [seacrhConvert, setSearchConvert] = useState('')
    const searchRef = useRef()

    const onSearch = (text) => {
        if (text != '') {
            let tempData = countrysList.filter(item => {
                return item.country.toLowerCase().indexOf(text.toLowerCase()) > -1;
            })
            setdata(tempData)
        } else {
            setdata(countrysList)
        }
    }
    return (
        <View>
            <Pressable onPress={() => {
                handleClicked()
                handlereset(false)
            }}>
                <View style={styles.toDropdownView}>
                  
                    <Text style={styles.toDropdownText}>{dropdownPlaceHolderText}</Text>
                    {(clicked && !dropdownopened) ? (
                        <Icon name='chevron-up' size={30} color="#A4B0BD" style={styles.upArrow} />
                    ) : (
                        <Icon name='chevron-down' size={30} color="#A4B0BD" style={styles.downArrow} />
                    )}
                </View>
            </Pressable>
            {(clicked && !dropdownopened) ? (
               
                <View style={styles.dropDownArea}>
                    <TextInput
                        placeholder= {placeholdertext}
                        placeholderTextColor="#fff"
                        ref={searchRef}
                        value={searchBase}
                        style={styles.searchInput}
                        onChangeText={text => {
                            onSearch(text)
                            setsearchBase(text)
                        }} />
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => {
                                handleCallBack(item.currency_code)
                                handleClicked()
                                onSearch('')
                                setsearchBase('')
                                setdata(countrysList)
                                searchRef.current.clear()
                            }}>
                                <View style={styles.dropdownView}>
                                    <Text style={styles.dropDownAreaText}>{item.currency_code} ({(item.country)})</Text>
                                    <Image
                                        source={{
                                            uri: `https://flagcdn.com/16x12/${codedict.get(item.country.toLowerCase())}.png`
                                        }}
                                        style={styles.countryImage}
                                    />
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            ) : null}
        </View>

    )
}

export default CustomDropDown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: "#fff"
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
        fontSize: 16
    },
    image: {
        // flex: 1,
        width: "100%",
        height: "100%"
    }
})