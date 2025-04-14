import {View, Text, TouchableWithoutFeedback, FlatList} from 'react-native'
import React, {useEffect} from 'react'
import {Header} from "@react-navigation/elements";
import Note from "@/components/Note";
import {addNote, deleteAllNotes, deleteNote, getAllNotes} from "@/lib/storage";
import {uuid} from "expo-modules-core";


export default function Index() {

    const [notes, setNotes] = React.useState([]);


    useEffect(() => {
        getAllNotes().then(data => setNotes(data));
    }, [])

    return (
        <View>
            <View className="bg-white py-5 pl-5">
                <Text className="text-3xl font-bold text-primary">Todoosh</Text>
            </View>
            {/*<TouchableWithoutFeedback onPress={() => {getAllNotes().then(data => console.log(data))}}>*/}
            {/*    <Text className="py-5 px-10 bg-green-200 rounded-full">Console log all</Text>*/}
            {/*</TouchableWithoutFeedback>*/}
            {/*<TouchableWithoutFeedback onPress={() => {addNote({id: uuid.v4(), title:"Eat Food", text:"I need to do shsdafsdfit", categories:["Laundry", "Exercise"], isCompleted: false })}}>*/}
            {/*    <Text className="py-5 px-10 bg-green-200 rounded-full">Add New</Text>*/}
            {/*</TouchableWithoutFeedback>*/}
            {/*<TouchableWithoutFeedback onPress={() => {deleteAllNotes()}}>*/}
            {/*    <Text className="py-5 px-10 bg-amber-400 rounded-full">Clear Notes</Text>*/}
            {/*</TouchableWithoutFeedback>*/}
            {/*<TouchableWithoutFeedback onPress={() => {deleteNote("2c3654bf-6dde-4998-bd42-56e6b72c9e5f")}}>*/}
            {/*    <Text className="py-5 px-10 bg-red-300 rounded-full">Clear Notes</Text>*/}
            {/*</TouchableWithoutFeedback>*/}


            <View className="pt-5">
                {notes && (<FlatList
                    className="flex gap-3"
                    data={notes}
                    renderItem={({ item }) => {
                        // @ts-ignore
                        return <Note {...item} />
                    }}
                    keyExtractor= {(item: {id: string}) => item.id}
                />)}
            </View>
        </View>
    )
}
