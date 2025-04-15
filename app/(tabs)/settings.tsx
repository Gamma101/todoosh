import {View, Text, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import {Header} from "@react-navigation/elements";
import {Ionicons} from "@expo/vector-icons";
import colors from "@/constants/colors";

export default function Settings() {
    return (
        <View>
            <View className="bg-white py-5 px-5 flex-row justify-between">
                <Text className="text-3xl font-bold text-primary">Todoosh</Text>
            </View>


            <Text>Settings</Text>
        </View>
    )
}
