import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import {Header} from "@react-navigation/elements";

export default function Create() {
    return (
        <View style={styles.container}>
            <View className=" bg-white py-5 pl-5">
                <Text className="text-3xl font-bold text-primary">Todoosh</Text>
            </View>

            <ScrollView >
                <Text className="font-bold text-5xl">Title</Text>
                <TextInput placeholder="Title of your Note" style={styles.inputContainer}/>
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 100,
        padding: 10,
        fontWeight: "bold"
    }
})
