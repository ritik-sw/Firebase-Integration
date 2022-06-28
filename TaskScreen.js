import React, { useState } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Data } from './data/db';

const TaskScreen = () => {

    const [listData, setListData] = useState([]);

    const listDataRender = ({ item }) => {
        return (
            <View style={styles.list}>

                <Text>{item.name}</Text>
            </View>
        )
    }


    const addHandler = (name) => {
        setListData(currentGoals => [
            ...currentGoals,
            { id: Math.random(), name: name }
        ]);

    };





    return (
        <View>
            <View style={styles.searchContainer}>
                <SearchableDropdown

                    textInputProps={
                        {
                            placeholder: 'Search',


                            style: {
                                padding: 10,
                                borderWidth: 1,
                                borderColor: '#ccc',

                                color: 'black',
                                height: 40,
                                width: 300
                            },
                        }
                    }
                    containerStyle={{ padding: 5 }}

                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={Data}
                    onItemSelect={(item) => {
                        addHandler(item.name)

                    }}
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }

                />
                <TouchableOpacity

                    onPress={() => {
                     let index= Math.floor(Math.random() * Data.length);
                        let name= Data[index].name;
                        addHandler(name);
                    }
                    }

                    style={styles.addButton}>
                    <Text style={{ textAlign: 'center' }}>+</Text>
                </TouchableOpacity>
            </View>

            {listData.length == 0 ? <Text style={{ textAlign: 'center' }}>
                Please add some Items
            </Text> :
                <FlatList
                    keyExtractor={item => item.id}
                    data={listData}
                    renderItem={listDataRender}
                />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    addButton: {

        justifyContent: 'center',
        height: 40,
        backgroundColor: 'orange',
        width: 35,
        textAlign: 'center',
        marginTop: 5


    },
    searchContainer: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between'
    },
    list: {
        margin: 10,
        borderBottomWidth: 1
    }
})

export default TaskScreen