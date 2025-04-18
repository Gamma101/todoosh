import {View, Text, TouchableOpacity, useColorScheme, TouchableWithoutFeedback, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams, useRouter} from "expo-router";
import {deleteNote, findNoteById} from "@/lib/storage";
import colors from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import Category from "@/components/Category";
import {formatDate, formatTime} from "@/lib/dateHandler";
import {StatusBar} from "expo-status-bar";

export default function Id() {
    const theme = useColorScheme();
    const { id } = useLocalSearchParams()
    const [noteData, setNoteData] = useState({
        title: undefined,
        endDate: undefined,
        endTime: undefined,
        categories: undefined,
        id: undefined,
        isCompleted: undefined,
        text: undefined,
    });

    const router = useRouter();

    const noteCategories = () => {
        if(noteData.categories){
            //@ts-ignore
            return noteData.categories.map((category: string, i: number) => {
                return <Category isJustToWatch={true} categoryName={category} key={i} />
            })
        }
    }
    const noteCategoriesComponent = noteCategories();

    useEffect(() => {
        const getNoteData = async () => {
            const data = await findNoteById(id)
            if(data) {
                setNoteData(data)
            }
        }

        getNoteData()

    },[])
    return (
        <View style={{backgroundColor: theme === "dark" ? colors.darkBg : colors.whiteBg, flex: 1}}>
            <StatusBar  style={theme === "dark" ? "light" : "dark"} backgroundColor={theme === "dark" ? "black" : "white"} translucent={true} />
            <View className="bg-white py-5 px-5 flex flex-row justify-between items-center" style={{backgroundColor: theme === "dark" ? colors.black : colors.white}}>
                <View className="flex flex-row justfy-center gap-5">
                    <TouchableWithoutFeedback onPress={() => {router.back()}}>
                        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={30} />
                    </TouchableWithoutFeedback>
                    <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                </View>
                <View className="flex flex-row justify-center items-center gap-5">
                    <TouchableOpacity onPress={() => router.push("/(tabs)/create")}>
                        <Ionicons name={"pencil-outline"} color={colors.primary} size={27} />
                    </TouchableOpacity>
                {/*@ts-ignore*/}
                <TouchableOpacity onPress={async () => {await deleteNote(noteData.id); router.back()}}>
                        <Ionicons name={"trash-outline"} color={"red"} size={27} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View className="flex justify-center items-center m-5 p-5 rounded-xl gap-5" style={{backgroundColor: theme === "dark" ? colors.black : colors.white}} >
                    <Text className="text-primary text-2xl font-bold text-left">{noteData.title}</Text>
                    {noteData.text && <Text className="text-md" style={{color: theme === "dark" ? colors.white : colors.black}}>{noteData.text}</Text>}
                    {noteData.categories ?
                        <View>
                            <Text className="text-xl text-center pb-4 font-semibold text-primary">Categories</Text>
                            <View className="flex flex-row flex-wrap items-center justify-center gap-1 mb-2">
                                {/*{noteData.categories.map((categ: string, key: number) => {*/}
                                {/*    return <Category categoryName={categ} key={key} isJustToWatch={true} />*/}
                                {/*})}*/}
                                {/*@ts-ignore*/}
                                {noteData.categories.length > 0 &&
                                    <ScrollView style={{borderRadius: 10, margin: 12}} horizontal>
                                        <View className="flex flex-row gap-2">
                                            {noteCategoriesComponent}
                                        </View>
                                    </ScrollView>}
                            </View>
                            <View className="flex flex-row gap-2 justify-between">
                                {
                                    noteData.endTime &&
                                    <View className="flex flex-row gap-2 px-3 items-center">
                                        <Ionicons name="alarm-outline" size={20} color="white" className="bg-primary p-1 rounded-md" />
                                        <Text style={{color: theme === "dark" ? colors.white : colors.black}}>{formatTime(new Date(noteData.endTime)).text}</Text>
                                    </View>
                                }
                                {
                                    noteData.endDate &&
                                    <View className="flex flex-row gap-2 px-3 items-center">
                                        <Ionicons name="calendar-outline" size={20} color="white" className="bg-primary p-1 rounded-md" />
                                        <Text style={{color: theme === "dark" ? colors.white : colors.black}}>{formatDate(new Date(noteData.endDate)).text}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                        :
                        null}
                </View>

            </View>
        </View>
    )
}
