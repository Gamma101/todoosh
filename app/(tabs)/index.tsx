import {View, Text, TouchableWithoutFeedback, FlatList, SafeAreaView, TouchableOpacity} from 'react-native'
import React, {useEffect} from 'react'
import {Header} from "@react-navigation/elements";
import Note from "@/components/Note";
import {addNote, deleteAllNotes, deleteNote, getAllNotes} from "@/lib/storage";
import {uuid} from "expo-modules-core";
import {useFocusEffect} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function Index() {

    const [notes, setNotes] = React.useState([]);

    const handleDeleteNote = async (id: string) => {
        await deleteNote(id); // Make sure you have this function in your storage lib
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
            <View style={{flex: 1}}>
                <View className="bg-white py-5 pl-5 flex flex-row justify-between">
                    <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                    <TouchableOpacity onPress={() => {deleteAllNotes(); refreshNotes()}}>
                        <Ionicons name="trash" size={30}/>
                    </TouchableOpacity>
                </View>

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
            </View>

    )
}
