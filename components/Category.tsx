import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";

export default function Category({categoryName, deleteFunction = () => {}, isJustToWatch = true}: {isJustToWatch?: boolean, categoryName: string, deleteFunction?: () => void}) {


    return (
        <View>
            <TouchableOpacity onPress={deleteFunction} activeOpacity={ isJustToWatch ? 1 : 0.2} className=''>
                <View className={`flex flex-row items-center ${isJustToWatch ? "px-3" : "pr-3 pl-1"} py-2 bg-primary justify-start rounded-md`}>
                    {!isJustToWatch && <Ionicons name="close-outline" size={20} color="#fff"/>}
                    <Text className="text-white">{categoryName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
