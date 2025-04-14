import {View, Text, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
export default function Note({ categories, id, isCompleted, text, title}: {categories: Array<string>, id: string, isCompleted: boolean, text: string, title: string}): JSX.Element {
    return (
        <View>
            <View className="flex flex-row gap-5 items-center bg-white p-5 w-[90%] self-center rounded-xl">
                <TouchableWithoutFeedback onPress={() => {}}>
                    {/*<Ionicons name="checkmark-circle-outline" className="bg-primary rounded-full" color="white" size={30} />*/}
                    <Ionicons name="ellipse-outline" className="rounded-full" color="black" size={30} />
                </TouchableWithoutFeedback>
                <View>
                    <Text className="font-bold">{title}</Text>
                    <Text className="">{text}</Text>
                </View>
            </View>
        </View>
    )
}
