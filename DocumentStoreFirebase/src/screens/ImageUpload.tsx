import { Button, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import storage from '@react-native-firebase/storage';

const ImageUpload = () => {
    const [imageData, setimageData] = useState('')
    const [fullPath, setfullPath] = useState('')
    const [imgDownloadUrl, setimgDownloadUrl] = useState('')
    const pickImage = async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images] // we are setting only image types to be uploaded
            })
            setimageData(response)
        } catch (err) {
            console.log(err)
        }
    }
    const uploadImage = async () => {
        try {
            const response = storage().ref(`/profile/${imageData.name}`)
            const put = await response.putFile(imageData.uri)
            console.log(response)
            setfullPath(put.metadata.fullPath)
            const url = await response.getDownloadURL()
            setimgDownloadUrl(url) // Download url 
            Alert.alert("FIle uploaded successfully")
        } catch(err) {
            console.log(err)
        }
    }
    const deleteImage = async () => {
        try {
            const response = await storage().ref(fullPath).delete()
            setfullPath('')
            setimgDownloadUrl('')
        }catch(err) {
            console.log(err)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Firebase file upload</Text>
            {
                imageData ? (
                    <Image
                        source={{
                            uri: imageData.uri
                        }}
                        style={styles.image}
                    />
                ) : (null)
            }
            <View style = {styles.buttonView}>
                <Button
                    title='Select Image'
                    onPress={() => {
                        pickImage()
                    }}
                />
                <Button
                    title='Upload Image'
                    onPress={() => {
                        uploadImage()
                    }}
                />
                <Button
                    title='Delete Image'
                    onPress={() => {
                        deleteImage()
                    }}
                />
            </View>
        <View style = {{marginTop: 20}}>
            {imgDownloadUrl && (<Text style = {{fontSize: 20, color: "#000"}}>URL: {imgDownloadUrl}</Text>)}
        </View>
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 20,
        color: "#000",
        marginTop: 20,
        marginBottom: 150
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    buttonView: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})