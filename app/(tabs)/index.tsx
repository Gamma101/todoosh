import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Image,
    useColorScheme
} from 'react-native'
import React from 'react'
import Note from "@/components/Note";
import {deleteNote, getAllNotes} from "@/lib/storage";
import {useFocusEffect, useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import colors from "@/constants/colors";

export default function Index() {
    const theme = useColorScheme()

    const [notes, setNotes] = React.useState([]);
    const router = useRouter();

    const handleDeleteNote = async (id: string) => {
        await deleteNote(id);
        const updatedNotes = await getAllNotes();
        setNotes(updatedNotes);
    };

    const refreshNotes = async () => {
        const data = await getAllNotes();
        setNotes(data);
    };

    useFocusEffect(
        React.useCallback(() => {
            refreshNotes();
        }, [])
    );



    return (
            <View style={{flex: 1, backgroundColor: theme === "dark" ? colors.darkBg : colors.whiteBg}}>
                <View style={{backgroundColor: theme === "dark" ? colors.black : colors.white}} className="py-5 px-5 flex flex-row justify-between">
                    <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                    <TouchableOpacity onPress={() => router.push("/(tabs)/create")}>
                        <Ionicons name="add" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                {!notes ? <View className="flex flex-col justify-center items-center mt-32 m-5 p-3 rounded-2xl">
                    <Image source={require("@/assets/images/empty.png")} resizeMode={"cover"} style={{width: 200, height: 200}} />
                    <Text className="text-2xl text-gray-400">Quite empty here...</Text>
                </View> :
                <SafeAreaView style={{flex: 1}} className="pt-3">
                    {notes && (<FlatList style={{flex: 1, gap: 5}}
                                         className="flex gap-5"
                                         data={notes}
                                         renderItem={({ item }) => {
                                             // @ts-ignore
                                             return <Note {...item} onDelete={handleDeleteNote}/>
                                         }}
                                         contentContainerStyle={{paddingBottom: 70}}
                                         keyExtractor= {(item: {id: string}) => item.id}

                    />)}
                </SafeAreaView>
                }
            </View>

    )
}
