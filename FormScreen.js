import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Keyboard,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import { RadioButton, Button } from 'react-native-paper';

import database from '@react-native-firebase/database';

let addItem = (name,address,gender,phone) => {
    database().ref('/items').push({
      name: name,
      address:address,
      gender:gender,
      phone:phone
    });
  };

const FormScreen = () => {


    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState();
    const [gender, setGender] = React.useState('');
    const [phone, setPhone] = React.useState(null)

    const submitForm = () => {

        if (!name.trim() || name.length < 3) {
            alert('Please Enter atleast three character Name');
            return;
        }
        if (!address.trim() || address.length < 10) {
            alert('Please Enter  atleast 10 characters address');
            return;
        }

        if (!phone.trim()) {
            alert('Please Enter Contact');
            return;
        }
        if (phone.length < 10) {
            alert('Please Enter 10 Digit Phone No.');
            return;
        }

        addItem(name,address,gender,phone);
        Alert.alert('Item saved successfully');
        alert(name+" "+address+" "+gender+" "+phone)
    }





    return (
        <ScrollView style={styles.detailContainer}>
            <Text style={styles.headingText}>Basic Form </Text>

            <View style={styles.fieldsContainer}>

                <Text style={styles.labelText}>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Enter Name"
                    color="#4B4A4F"
                    placeholderTextColor="#C1C1C1"
                />

                <Text style={styles.labelText}>Contact No.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={newText => {
                        newText.length > 10
                            ? alert('Please enter 10 digit only')
                            : setPhone(newText);
                    }}
                    value={phone}
                    keyboardType="numeric"
                    placeholder="Enter Contact Number"
                    color="#4B4A4F"
                    placeholderTextColor="#C1C1C1"
                />

                <Text style={styles.labelText}>Address</Text>
                <TextInput
                    style={styles.inputAddress}
                    onChangeText={setAddress}
                    value={address}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Enter Address"
                    color="#4B4A4F"
                    placeholderTextColor="#C1C1C1"
                />


                <Text style={styles.labelText}>Gender</Text>
                <View style={styles.genderWrap}>
                    <RadioButton
                        value="Male"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Male')}
                        color="#4B4A4F"
                        placeholderTextColor="#4B4A4F"
                    />
                    <Text style={styles.genderText}>Male</Text>
                    <RadioButton
                        value="Female"
                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Female')}
                        color="#4B4A4F"
                        placeholderTextColor="#C1C1C1"
                    />

                    <Text style={styles.genderText}>Other</Text>

                    <RadioButton
                        value="Female"
                        status={gender === 'Other' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Other')}
                        color="#4B4A4F"
                        placeholderTextColor="#C1C1C1"
                    />

                    <Text style={styles.genderText}>Other</Text>
                </View>




                <TouchableOpacity
                    style={styles.submitBtnContainer}
                    onPress={submitForm}
                    activeOpacity={0.8}>
                    <Text style={{color:'white',fontSize:23,fontWeight:'bold'}}>Submit</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#C1C1C1',
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    inputAddress: {
        
        margin: 12,
        borderWidth: 1,
        paddingBottom:0,
        paddingTop:0,
        borderColor: '#C1C1C1',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        justifyContent:'flex-start',
        
    },
    headingText: {
        color: '#4B4A4F',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 20,
    },
    submitBtnContainer: {
        marginTop: 20,
        alignItems: "center",
        marginRight: 10,
        justifyContent: 'center',
        alignSelf:'center',
        backgroundColor:'orange',
        width:120,
        height:40,
        borderRadius:10
    },
   
    labelText: {
        color: '#4B4A4F',
        fontSize: 15,
        fontWeight: '500',
        paddingHorizontal: 12,
        marginTop: 12
    },
    labelTextChild: {
        color: '#4B4A4F',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 12,

    },
    imgWrap: {
        alignItems: 'center',
        alignSelf: 'center',

        borderRadius: 100,
        width: 150,
        overflow: 'hidden',
        height: 150,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    genderText: {
        color: '#4B4A4F',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 5,
    },
    genderWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        marginHorizontal: 7,
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#EBF1F8',
    },
});

export default FormScreen