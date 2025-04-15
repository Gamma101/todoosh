import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import React, {useState} from 'react'
import colors from "@/constants/colors";
import compose = StyleSheet.compose;
import {Ionicons} from "@expo/vector-icons";
import {addNote} from "@/lib/storage";
import {uuid} from "expo-modules-core";
import {useRouter} from "expo-router";


export default function Create() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const router = useRouter()




    async function sendForm() {
        const newNote = {
            title,
            text,
            endDate: new Date(),
            isCompleted: false,
            categories: [],
            id: uuid.v4()
        }
        await addNote(newNote);
        router.back();
        setTitle("");
        setText("");

    }

    return (
        <View style={styles.container}>
            <View className="bg-white py-5 px-5 flex-row justify-between">
                <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                <TouchableWithoutFeedback onPress={() => sendForm()}>
                    <Ionicons name={"checkmark"} color={colors.primary} size={30} />
                </TouchableWithoutFeedback>
            </View>

            <ScrollView  >
                <View style={styles.scrollView} >
                    <View style={styles.label}>
                        <Text style={styles.inputTitle}>Title</Text>
                        <TextInput value={title} onChangeText={(val) => setTitle(val)} placeholder="Title of your Note" style={styles.inputContainer}/>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.inputTitle}>Note</Text>
                        <TextInput value={text} onChangeText={(val) => setText(val)} multiline numberOfLines={5} placeholder="Title of your Note" style={compose(styles.inputContainer, styles.textInput)}/>
                    </View>




                </View>
            </ScrollView>
            <View className="flex items-center justify-center mb-20">
                <TouchableWithoutFeedback onPress={() => router.back()}>
                    <View style={{width: "50%"}} className="bg-primary rounded-full flex flex-row p-3 justify-center items-center">
                        <Ionicons name={"arrow-back-outline"} color="white" size={30} />
                        <Text className="text-white font-medium text-2xl">Go Back</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    inputContainer: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
    },
    label: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 12,
    },
    textInput: {
        height: 100,
        textAlignVertical: "top"
    }
})
