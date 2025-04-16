import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert
} from 'react-native'
import React, {useState} from 'react'
import colors from "@/constants/colors";
import compose = StyleSheet.compose;
import {Ionicons} from "@expo/vector-icons";
import {addNote} from "@/lib/storage";
import {uuid} from "expo-modules-core";
import {useFocusEffect, useRouter} from "expo-router";
import Category from "@/components/Category";


export default function Create() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories]  = useState<string[]>([])
    const router = useRouter()

    function deleteCategory(categoryToDelete: string) {
        const newCategory = categories.filter(category => category != categoryToDelete);
        setCategories(newCategory);
    }

    const noteCategories = () => {
        return categories.map((category: string, i: number) => {
            return <Category isJustToWatch={false} categoryName={category} deleteFunction={() => deleteCategory(category)} key={i} />
        })
    }

    const noteCategoriesComponent = noteCategories();

    function addCategory(categoryToAdd: string) {
        if(!categories.includes(categoryToAdd)) {
            const newCategory = [...categories, categoryToAdd];
            setCategories(newCategory)

        }
        setCategory("")
    }

    function clearInputs() {
        setTitle("");
        setText("");
        setCategory("");
        setCategories([])
    }

    async function sendForm() {

        if(title.trim()) {
            const newNote = {
                title,
                text,
                endDate: new Date(),
                isCompleted: false,
                categories: categories,
                id: uuid.v4()
            }
            await addNote(newNote);
            router.back();
            clearInputs();
        } else {
            Alert.alert("Please enter at least a title!");
        }



    }

    useFocusEffect(
        React.useCallback(() => {
            clearInputs()
        }, [])
    );

    return (
        <View style={styles.container}>
            <View className="bg-white py-5 px-5 flex-row justify-between">

                <View className="flex flex-row gap-5">
                    <TouchableWithoutFeedback onPress={() => {router.back(); clearInputs()}}>
                        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={30} />
                    </TouchableWithoutFeedback>
                    <Text className="text-3xl font-bold text-primary">Todoosh</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => sendForm()}>
                    <Ionicons name={"checkmark"} color={colors.primary} size={30} />
                </TouchableWithoutFeedback>
            </View>

            <ScrollView  >
                <View style={styles.scrollView} >
                    <View style={styles.label}>
                        <Text style={styles.inputTitle}>Title</Text>
                        <TextInput value={title} onChangeText={(val) => setTitle(val)} placeholder="Enter a Title" style={styles.inputContainer}/>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.inputTitle}>Note</Text>
                        <TextInput value={text} onChangeText={(val) => setText(val)} multiline numberOfLines={5} placeholder="Enter additional info" style={compose(styles.inputContainer, styles.textInput)}/>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.inputTitle}>Categories</Text>
                        <View className="flex flex-row justify-between items-center">
                            <TextInput value={category} className="w-[80%]" onChangeText={(val) => setCategory(val)} placeholder="Enter Category" style={styles.inputContainer}/>
                            <TouchableOpacity onPress={() => addCategory(category)}>
                                <Ionicons className="bg-primary rounded-full p-2" color="white" name="add-outline" size={30} />
                            </TouchableOpacity>
                        </View>
                        <View className="flex flex-wrap flex-row gap-2 p-3">
                            {noteCategoriesComponent}
                        </View>
                    </View>



                </View>
            </ScrollView>
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
        textAlign: "center",
        marginBottom: 10,
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
