import {View, Text, TouchableOpacity, useColorScheme} from 'react-native'
import React from 'react'
import colors from "@/constants/colors";
import {deleteAllNotes} from "@/lib/storage";

export default function Settings() {

    const theme = useColorScheme()

    return (
        <View style={{flex: 1, backgroundColor: theme === "dark" ? colors.darkBg : colors.whiteBg}}>
            <View style={{backgroundColor: theme === "dark" ? colors.black : colors.white}} className="py-5 px-5 flex flex-row justify-between">
                <Text className="text-3xl font-bold text-primary">Todoosh</Text>
            </View>
            <TouchableOpacity onPress={async () => await deleteAllNotes()}>
                <View className="flex justify-center mx-auto p-5 m-5 rounded-xl items-center bg-red-400 w-[80%]">
                        <Text className="font-bold color-white">Delete All Notes</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
