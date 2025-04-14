import {View, Text} from 'react-native'
import React from 'react'
import {Header} from "@react-navigation/elements";

export default function Settings() {
    return (
        <View>
            <Header headerTintColor={"#0062f2"} title="ToDoosh" headerTitleAlign={"center"}  />


            <Text>Settings</Text>
        </View>
    )
}
